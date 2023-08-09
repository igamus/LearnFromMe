from .db import db, environment, SCHEMA, add_prefix_for_prod
from .shopping_cart import shopping_cart
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}


    # columns
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)
    name = db.Column(db.String(100), nullable=False)
    user_image = db.Column(db.String(255)) # make not nullable later...
    user_bio = db.Column(db.String(255)) # optional
    expertises = db.Column(db.String(255)) # optional


    # relationship attributes
    courses = db.relationship("Course", backpopulates="user", cascade="delete-orphan, all")
    courses_in_cart = db.relationship(
        "Course",
        secondary=shopping_cart,
        back_populates="users_with_course_in_cart"
    )

    # methods
    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email
        }
