from .db import db,environment, SCHEMA, add_prefix_for_prod


shopping_cart = db.Table(
    'shopping_cart',
    db.Model.metadata,
    db.Column("id", db.Integer, primary_key=True),
    db.Column("users", db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), primary_key=True),
    db.Column('courses', db.Integer, db.ForeignKey(add_prefix_for_prod('courses.id')), primary_key=True)
)


if environment == "production":
    shopping_cart.schema = SCHEMA
