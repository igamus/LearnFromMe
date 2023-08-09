from app.models import db, Course, environment, SCHEMA
from sqlalchemy.sql import text
from .categories import development, business, finance, it, productivity, personal_development, design, marketing, health, music
from .users import demo, marnie, bobbie, buying_andy, dr_octopus


def seed_courses():
    for course in [
        {
            "name": "Learn React in 50 seconds",
            "description": "In 50 seconds learn enough to get a 7 figure career",
            "course_image": "https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg",
            "price": 19.99,
            "instructor_id": 5,
            "level": "Beginner",
            "what_youll_learn": "React|Redux|React Router|Hooks|React Native|",
            "course_video": "https://www.youtube.com/watch?v=YDIaMcSKOuo",
            "users_with_course_in_cart": [buying_andy],
            "categories_for_course": [development],
            "people_who_purchased": [demo, marnie]
        },
        {
            "name": "How to eat an entire jar of pickles in one sitting",
            "description": "Impress your friends at parties!",
            "course_image": "https://images.pexels.com/photos/8599630/pexels-photo-8599630.jpeg",
            "price": 9.99,
            "instructor_id": 5,
            "level": "Intermediate",
            "what_youll_learn": "Opening Jars|Swallowing|How to drink pickle juice",
            "course_video": "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
            "users_with_course_in_cart": [buying_andy],
            "categories_for_course": [personal_development],
            "people_who_purchased": [demo, marnie, bobbie]
        },
    ]:
        db.session.add(Course(**course))
    db.session.commit()


def undo_courses():
    if environment=='production':
        db.session.execute(f"TRUNCATE table {SCHEMA}.courses RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM courses"))

    db.session.commit()
