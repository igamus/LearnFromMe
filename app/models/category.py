from .db import db, add_prefix_for_prod, environment, SCHEMA
import .courses_categories from courses_categories


class Category(db.Model):
    __tablename__ = "categories"

    if environment == "production":
        __table_args__ = {"schema": SCHEMA}


    # columns
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)


    # relationship attributes
    user = db.relationship("User", back_populates="categories")
    courses_of_category = db.relationship(
        "Category",
        secondary=courses_categories,
        back_populates="categories_for_course"
    )


    # methods
    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name
        }
