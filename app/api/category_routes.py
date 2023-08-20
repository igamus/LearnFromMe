from flask import Blueprint, jsonify, request
from flask_login import current_user, login_required
from app.models import Course, Category, db
from ..forms.course_form import CourseForm
from ..forms.update_course_form import UpdateCourseForm
from .auth_routes import validation_errors_to_error_messages
from .aws_helpers import upload_photo_file_to_s3, upload_video_file_to_s3, get_unique_filename, remove_image_file_from_s3, remove_video_file_from_s3


category_routes = Blueprint("category", __name__)


@category_routes.route("/other")
def get_uncategorised_courses():
    """
    Returns a list of all courses without categories
    """
    courses = Course.query.all()
    uncategorized_courses = [course.to_dict() for course in courses if not course.categories_for_course]

    return uncategorized_courses


@category_routes.route("/<int:category_id>")
def get_all_courses_in_a_category(category_id):
    """
    Returns a list of all courses for a given category
    """
    category = Category.query.get(category_id)
    courses = [course.to_dict() for course in category]
    return jsonify(courses), 200


@category_routes.route("/")
def get_all_categories():
    """
    Returns a list of all categories (excluding "Other")
    """
    categories = Category.query.all()
    categories_list = [category.to_dict() for category in categories]
    return jsonify(categories_list), 200
