from .db import db,environment, SCHEMA, add_prefix_for_prod


purchases = db.Table(
    'purchases',
    db.Model.metadata,
    # db.Column("id", db.Integer, primary_key=True),
    db.Column("user_id", db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), primary_key=True),
    db.Column('course_id', db.Integer, db.ForeignKey(add_prefix_for_prod('courses.id')), primary_key=True)
)


if environment == "production":
    purchases.schema = SCHEMA
