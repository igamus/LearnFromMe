from flask import Blueprint, jsonify, request
from flask_login import current_user, login_required
# from app.models import Course


cart_routes = Blueprint("cart", __name__)


@cart_routes.route("/")
@login_required
def get_items_in_cart():
    """
    Returns all items in cart
    """

    cart = current_user.courses_in_cart
