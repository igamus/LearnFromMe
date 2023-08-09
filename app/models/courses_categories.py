from .db import db,environment, SCHEMA, add_prefix_for_prod


courses_categories = db.Table(
    'courses_categories',
    db.Model.metadata,
    db.Column("id", db.Integer, primary_key=True),
    db.Column("courses", db.Integer, db.ForeignKey(add_prefix_for_prod("courses.id")), primary_key=True),
    db.Column('categories', db.Integer, db.ForeignKey(add_prefix_for_prod('categories.id')), primary_key=True)
)


if environment == "production":
    courses_categories.schema = SCHEMA
