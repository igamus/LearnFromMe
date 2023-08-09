from app.models import db, Category, environment, SCHEMA
from sqlalchemy.sql import text


development = Category(name='Development')
business = Category(name="Business")
finance = Category(name="Finance & Accounting")
it = Category(name="IT & Software")
productivity = Category(name="Office Productivity")
personal_development = Category(name="Personal Development")
design = Category(name="Design")
marketing = Category(name="Marketing")
health = Category(name="Health & Fitness")
music = Category(name="Music")


def seed_categories():
    db.session.add(development) # 1
    db.session.add(business) # 2
    db.session.add(finance) # 3
    db.session.add(it) # 4
    db.session.add(productivity) # 5
    db.session.add(personal_development) # 6
    db.session.add(design)  # 7
    db.session.add(marketing) # 8
    db.session.add(health) # 9
    db.session.add(music)  # 10
    db.session.commit()


def undo_categories():
    if environment=='production':
        db.session.execute(f"TRUNCATE table {SCHEMA}.categories RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM categories"))
    db.session.commit()
