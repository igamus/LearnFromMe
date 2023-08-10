from flask import Blueprint, jsonify, request
from flask_login import current_user
from app.models import Course, Category, db
from ..forms.course_form import CourseForm
from .auth_routes import validation_errors_to_error_messages


course_routes = Blueprint("course", __name__)


@course_routes.route("/course/<int:course_id>", methods=["PUT"])
def update_course(course_id):
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
        course.course_image = form.data["course_image"]
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
    course = course.to_dict()
    return jsonify(course), 200


@course_routes.route("/<int:category_id>")
def get_all_courses_of_category(category_id):
    """
    Returns a list of all courses in a given category
    """
    category = Category.query.get(category_id)
    courses = [course.to_dict() for course in category.courses_of_category]
    return jsonify(courses), 200


@course_routes.route("/", methods=["POST"])
def create_course():
    """
    Creates a new course
    """
    current_user_id = current_user.id
    form = CourseForm()
    form["csrf_token"].data = request.cookies["csrf_token"]
    if form.validate_on_submit():
        course = Course(
            name=form.data["name"],
            description=form.data["description"],
            course_image=form.data["course_image"],
            price=form.data["price"],
            instructor_id=current_user_id,
            level=form.data["level"],
            what_youll_learn=form.data["what_youll_learn"],
            course_video=form.data["course_video"]
        )
        db.session.add(course)
        db.session.commit()
        return course.to_dict()
    return {"errors": validation_errors_to_error_messages(form.errors)}, 400


@course_routes.route("/")
def get_all_courses():
    """
    Returns a list of all courses
    """
    courses = Course.query.all()
    course_list = [course.to_dict() for course in courses]
    return jsonify(course_list), 200
