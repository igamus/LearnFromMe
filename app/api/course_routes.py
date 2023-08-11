from flask import Blueprint, jsonify, request
from flask_login import current_user, login_required
from app.models import Course, Category, db
from ..forms.course_form import CourseForm
from .auth_routes import validation_errors_to_error_messages
from .aws_helpers import upload_photo_file_to_s3, upload_video_file_to_s3, get_unique_filename, remove_image_file_from_s3, remove_video_file_from_s3


course_routes = Blueprint("course", __name__)


@course_routes.route("/course/<int:course_id>", methods=["PUT"])
@login_required
def update_course(course_id): # need to update the edit of this
    """
    Updates the course of the specified id
    """
    course = Course.query.get(course_id)

    if course is None:
        return jsonify({"message": "Course does not exist"}), 404

    if course.instructor_id != current_user.id:
        return jsonify({"message": "Not authorized (only instructors may edit their courses)"}), 403

    form = CourseForm()
    form["csrf_token"].data = request.cookies["csrf_token"]
    if form.validate_on_submit():
        course.name = form.data["name"]
        course.description = form.data["description"]
        course.course_image = form.data["course_image"] # update image file?
        course.price = form.data["price"]
        course.level = form.data["level"]
        course.what_youll_learn = form.data["what_youll_learn"]
        course.course_video = form.data["course_video"]

        try:
            db.session.commit()
            return jsonify({"message":"Course updated successfully"}), 200
        except Exception as error:
            db.session.rollback()
            return jsonify({"error":"An error occurred while updating the server"}), 500

    return {"errors": validation_errors_to_error_messages(form.errors)}, 400


@course_routes.route("/course/<int:course_id>", methods=["DELETE"])
@login_required
def delete_course(course_id):
    """
    Deletes the course of the specified id
    """
    course = Course.query.get(course_id)

    if course is None:
        return jsonify({"message": "Course does not exist"}), 404
    if course.instructor_id != current_user.id:
        return jsonify({"message": "Not authorized (only instructors may delete their courses)"}), 403

    db.session.delete(course)
    db.session.commit()

    return jsonify({"message": f"Successfully deleted {course.name} (course #{course.id})"}), 200


@course_routes.route("/course/<int:course_id>")
def get_course(course_id):
    """
    Returns the details of the provided course
    """
    course = Course.query.get(course_id)
    course_d = course.to_dict()
    course_d["instructor"] = course.user.to_dict()
    course_d.pop("instructorId")
    return jsonify(course_d), 200


# horribly inefficient?
@course_routes.route("/all")
def get_all_courses_organized():
    """
    Returns a list of all courses, organized into categories
    """
    courses = Course.query.all()
    categories = Category.query.all()
    organized_courses = {category.to_dict()["name"]: [] for category in categories}
    organized_courses["Other"] = []
    for course in courses:
        course_d = course.to_dict()
        course_d["instructor"] = course.user.to_dict()
        course_d.pop("instructorId")
        categories = course.categories_for_course
        if categories:
            for category in categories:
                cat_key = category.to_dict()
                organized_courses[cat_key["name"]].append(course_d)
        else:
            organized_courses["Other"].append(course_d)

    return organized_courses



@course_routes.route("/<int:category_id>")
def get_all_courses_of_category(category_id):
    """
    Returns a list of all courses in a given category
    """
    category = Category.query.get(category_id)
    # courses = [course.to_dict() for course in category.courses_of_category]
    courses = []
    for course in category.courses_of_category:
        course_d = course.to_dict()
        course_d["instructor"] = course.user.to_dict()
        course_d.pop("instructorId")
        courses.append(course_d)
    return jsonify(courses), 200


@course_routes.route("/", methods=["POST"])
@login_required
def create_course():
    """
    Creates a new course
    """
    current_user_id = current_user.id
    form = CourseForm()
    form["csrf_token"].data = request.cookies["csrf_token"]
    if form.validate_on_submit():
        course_image = form.data["course_image"]
        course_image.filename = get_unique_filename(course_image.filename)
        image_upload = upload_photo_file_to_s3(course_image)
        print(image_upload)

        if "url" not in image_upload:
            # if the dictionary has no url key, there was an error
            return {"errors": validation_errors_to_error_messages(image_upload)} # need to test

        course_image_url = image_upload["url"]


        course_video = form.data["course_video"]
        course_video.filename = get_unique_filename(course_video.filename)
        video_upload = upload_video_file_to_s3(course_video)
        print(video_upload)

        if "url" not in video_upload:
            # if the dictionary has no url key, there was an error
            return {"errors": validation_errors_to_error_messages(video_upload)} # need to test

        course_video_url = video_upload["url"]


        course = Course(
            name=form.data["name"],
            description=form.data["description"],
            course_image=course_image_url,
            price=form.data["price"],
            instructor_id=current_user_id,
            level=form.data["level"],
            what_youll_learn=form.data["what_youll_learn"],
            course_video=course_video_url
        )

        db.session.add(course)
        db.session.commit()
        return course.to_dict()
    return {"errors": validation_errors_to_error_messages(form.errors)}, 400


@course_routes.route("/") # won't need this
def get_all_courses():
    """
    Returns a list of all courses
    """
    courses = Course.query.all()
    # course_list = [course.to_dict() for course in courses]
    course_list = []
    for course in courses:
        course_d = course.to_dict()
        course_d["instructor"] = course.user.to_dict()
        course_d.pop("instructorId")
        course_list.append(course_d)

    return jsonify(course_list), 200
