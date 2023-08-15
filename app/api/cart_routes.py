from flask import Blueprint, jsonify, request
from flask_login import current_user, login_required
from app.models import db, Course, shopping_cart


cart_routes = Blueprint("cart", __name__)


@cart_routes.route('/clear')
@login_required
def clear_cart():
    """
    Clear current user's cart of courses
    """
    current_user.courses_in_cart = []
    db.session.commit()
    return jsonify({"message": "Cart is empty"}), 200


@cart_routes.route('/remove/<int:course_id>')
@login_required
def remove_course_from_cart(course_id):
    """
    Remove course of specified id from cart
    """
    course = Course.query.get(course_id)

    if course is None:
        return jsonify({"message": "Course does not exist"}), 404

    if not course in current_user.courses_in_cart:
        return jsonify({"message": "Target course not in cart"}), 400

    try:
        current_user.courses_in_cart.remove(course)
        db.session.commit()
        return jsonify({"message": "Successfully removed course from cart"}), 200 # maybe return updated cart
    except Exception as error:
        db.session.rollback()
        return jsonify({"error":"An error occurred while updating the server"}), 500


@cart_routes.route("/add/<int:course_id>")
@login_required
def add_course_to_cart(course_id):
    """
    Add course of specified id to cart
    """
    course = Course.query.get(course_id)

    if course is None:
        return jsonify({"message": "Course does not exist"}), 404

    if course.user.id == current_user.id:
        return jsonify({"message": "You teach this course"}), 400

    if course in current_user.courses_in_cart:
        return jsonify({"message": "Course already in cart"}), 400

    try:
        current_user.courses_in_cart.append(course)
        db.session.commit()
        return jsonify({"addedCourse": course.to_dict()}), 200 # maybe return updated cart
    except Exception as error:
        db.session.rollback()
        return jsonify({"error":"An error occurred while updating the server"}), 500


@cart_routes.route("/")
@login_required
def get_courses_in_cart():
    """
    Returns all courses in cart
    """
    cart = [course.to_dict() for course in current_user.courses_in_cart]
    return jsonify(cart), 200
