from .db import db, add_prefix_for_prod, environment, SCHEMA
from .shopping_cart import shopping_cart
from .courses_categories import courses_categories
from .purchases import purchases


class Course(db.Model):
    __tablename__ = "courses"

    if environment == "production":
        __table_args__ = {"schema": SCHEMA}


    # columns
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    description = db.Column(db.String(255)) # optional
    course_image = db.Column(db.String(255)) # optional, maybe make not optional later
    price = db.Column(db.Float(none, decimal_return_scale=2), nullable=False)
    instructor_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False) # relates to user.id
    level = db.Column(db.String(50), nullable=False)
    what_youll_learn = db.Column(db.String(255), nullable=False)
    course_video = db.Column(db.String(255), nullable=False)


    # relationship attributes
    user = db.relationship("User", back_populates="courses")
    users_with_course_in_cart = db.relationship(
        "User",
        secondary=shopping_cart,
        back_populates="courses_in_cart"
    )
    categories_for_course = db.relationship(
        "Category",
        secondary=courses_categories,
        back_populates="courses_of_category"
    )
    people_who_purchased = db.relationship(
        "User",
        secondary=purchases,
        back_populates="purchased_courses"
    )


    # methods
    def to_dict(self): # test with/without optional options
        return {
            "id": self.id,
            "name": self.name,
            "description": self.description,
            "courseImage": self.course_image,
            "price": self.price,
            "instructorId": self.instructor_id,
            "level": self.level,
            "whatYoullLearn": self.what_youll_learn
        }
