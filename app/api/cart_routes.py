from flask import Blueprint, jsonify, request
from flask_login import current_user, login_required
from app.models import db, Course


cart_routes = Blueprint("cart", __name__)


@cart_routes.route('/remove/<int:course_id>')
@login_required
def remove_course_from_cart(course_id):
    """
    Remove course of specified id from cart
    """
    course = Course.query.get(course_id)
    # make sure it's in cart first
    try:
        course.users_with_course_in_cart.remove(current_user)
        db.session.commit()
        # return updated cart...
        return jsonify({"message": "Successfully removed course from cart"}), 200
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
    # see if already in cart
    try:
        course.users_with_course_in_cart.append(current_user)
        db.session.commit()
        # return the updated cart...
        return jsonify({"addedCourse": course.to_dict()}), 200
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
