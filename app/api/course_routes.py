from flask import Blueprint, jsonify # session, request
from app.models import Course, Category, db # User db, Reaction
# from ..forms import CreateChannelForm

course_routes = Blueprint("course", __name__)

@course_routes.route("/course/<int:courseId>")
def course(courseId):
    """
    Returns the details of the provided course
    """
    course = Course.query.filter(Course.id == courseId).first()
    course = course.to_dict()
    return jsonify(course), 200


@course_routes.route("/<int:categoryId>")
def all_courses_of_category(categoryId):
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
    pass


@course_routes.route("/")
def all_courses():
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
