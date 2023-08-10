from flask import Blueprint, jsonify, request # session
from flask_login import current_user
from app.models import Course, Category, db # User db, Reaction
from ..forms.create_course_form import CreateCourse
from .auth_routes import validation_errors_to_error_messages

course_routes = Blueprint("course", __name__)


@course_routes.route("/course/<int:courseId>", methods=["DELETE"])
def delete_course(courseId):
    pass


@course_routes.route("/course/<int:courseId>")
def get_course(courseId):
    """
    Returns the details of the provided course
    """
    course = Course.query.filter(Course.id == courseId).first()
    course = course.to_dict()
    return jsonify(course), 200


@course_routes.route("/<int:categoryId>")
def get_all_courses_of_category(categoryId):
    """
    Returns a list of all courses in a given category
    """

    category = Category.query.filter(Category.id == categoryId).first()
    courses = [course.to_dict() for course in category.courses_of_category]
    return jsonify(courses), 200


# alt that allows courses to route like /:department/:courseId
        # check that no match/null doesn't throw off the query
        # conversion for underscores

# @course_routes.route("/<string:category>")
# def all_courses_of_category(category):
#     """
#     Returns a list of all courses in a given category
#     """

#     category = Category.query.filter(Category.name == category.capitalize()).first()
#     print(category)
#     courses = [course.to_dict() for course in category.courses_of_category]
#     return jsonify(courses), 200


@course_routes.route("/", methods=["POST"])
def create_course():
    """
    Creates a new course
    """
    current_user_id = current_user.id
    print("current_user_id:")
    print(current_user_id)
    form = CreateCourse()
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

# Get
# All courses [x]

# Department courses [x] - didn't test multiple yet = this is a name

# Single courses = this is int [x]

# Owned by user - purchased

# Taught by user - owned

# Post
# Create a course

# Update

# Delete
