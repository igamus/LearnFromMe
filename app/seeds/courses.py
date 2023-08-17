from app.models import db, Course, environment, SCHEMA
from sqlalchemy.sql import text
from .categories import development, business, finance, it, productivity, personal_development, design, marketing, health, music
from .users import demo, marnie, bobbie, buying_andy, dr_octopus


def seed_courses():
    for course in [
        {
            "name": "Learn React in 50 seconds",
            "description": "In 50 seconds learn enough to get a 7 figure career",
            "course_image": "https://s3.us-east-2.amazonaws.com/lfm.photo/4290ac1b99b748b8a6a35d06174c35c0.jpg",
            "price": 19.99,
            "instructor_id": 4,
            "level": "Beginner",
            "what_youll_learn": "React|Redux|React Router",
            "course_video": "https://s3.us-east-2.amazonaws.com/lfm.video/7bfb479722ab4dc2bbbcbb34fa3011cc.mp4",
            "users_with_course_in_cart": [buying_andy],
            "categories_for_course": [development],
            "people_who_purchased": [demo, marnie]
        },
        {
            "name": "How to eat an entire jar of pickles in one sitting",
            "description": "Impress your friends at parties! Receive expert instruction from classically-trained and internationally-recognized talent.",
            "course_image": "https://s3.us-east-2.amazonaws.com/lfm.photo/204cdb9957bc4216b44612322b4110c4.jpg",
            "price": 14.99,
            "instructor_id": 6,
            "level": "Intermediate",
            "what_youll_learn": "Opening Jars by the third try|Spearing|How to drink pickle juice without being weird about it",
            "course_video": "https://s3.us-east-2.amazonaws.com/lfm.video/6e4f0819e3ff430b9fdd42cc2f336f84.mp4",
            "users_with_course_in_cart": [buying_andy],
            "categories_for_course": [personal_development],
            "people_who_purchased": [demo, marnie, bobbie]
        },
        {
            "name": "Touch type like a pro!",
            "description": "Learn to type without poking and pecking",
            "course_image": "https://s3.us-east-2.amazonaws.com/lfm.photo/236e2bf8b4ad40f68ada55073c0e4eac.jpg",
            "price": 14.99,
            "instructor_id": 7,
            "level": "Beginner",
            "what_youll_learn": "How to boost your WPM|All about the home row",
            "course_video": "https://s3.us-east-2.amazonaws.com/lfm.video/0de32354b6c7456aac4fc998180885c8.mp4",
            "users_with_course_in_cart": [demo]
        },
        {
            "name": "Video Editing Pro Series-- Color Correction",
            "description": "Continue to master vital skills to make your videos pop. Dominate the digital landscape with high-quality, stunning media",
            "course_image": "https://s3.us-east-2.amazonaws.com/lfm.photo/3382fff5103840f082243bede6faf418.jpg",
            "price": 22.99,
            "instructor_id": 7,
            "level": "Intermediate",
            "what_youll_learn": "Color correction",
            "course_video", "https://s3.us-east-2.amazonaws.com/lfm.video/8442a783790d45ff8418b36baa51817b.mp4"
        },
        {
            "name": "Public Speaking",
            "description": "Can't deliver your presentations? Take my course, and learn to speak like a politician--comfortable anywhere with anyone!",
            "course_image": "https://s3.us-east-2.amazonaws.com/lfm.photo/38e39e68fbe24fd9953ca06c4a142c91.jpg",
            "price": 29.99,
            "instructor_id": 3,
            "level": "Beginner",
            "what_youll_learn": "Articulation|Gesticulation|Mastication",
            "course_video", "https://s3.us-east-2.amazonaws.com/lfm.video/26709abcb6224d37af3099d930480fa4.mp4"
        },
        {
            "name": "SEO like a pro",
            "description": "Everything's on Google these days. You should be, too!",
            "course_image": "https://s3.us-east-2.amazonaws.com/lfm.photo/64f2a148c7954e9abcabc9ef4672efba.jpg",
            "price": 24.99,
            "instructor_id": 4,
            "level": "Beginner",
            "what_youll_learn": "Clicking|Bing|Safe Search",
            "course_video", "https://s3.us-east-2.amazonaws.com/lfm.video/b4bad8b917a944f48d54a150d239b604.mp4"
        },
        {
            "name": "Robotics",
            "description": "Software's cool, but hardware is also advancing like crazy. Stay ahead of the curve!",
            "course_image": "https://s3.us-east-2.amazonaws.com/lfm.photo/d8e9a800a4564666abfdfb0f7a003f05.jpg",
            "price": 17.99,
            "instructor_id": 5,
            "level": "Intermediate",
            "what_youll_learn": "How to identify and subdue Spider-Man",
            "course_video", "https://s3.us-east-2.amazonaws.com/lfm.video/8ebf57c2cbc34fe881b1d7357cd90784.mp4"
        },
        {
            "name": "Advanced Drumming",
            "description": "",
            "course_image": "https://s3.us-east-2.amazonaws.com/lfm.photo/6970e321f0f34f4d87f164025513cdee.jpg",
            "price": 19.99,
            "instructor_id": 7,
            "level": "Advanced",
            "what_youll_learn": "Fills",
            "course_video", "https://s3.us-east-2.amazonaws.com/lfm.video/b3d7b41d25b043c3b04b5a81fc58fba1.mp4"
        },
        {
            "name": "Step 'n' Flex",
            "description": "Dance like a beast",
            "course_image": "https://s3.us-east-2.amazonaws.com/lfm.photo/b5152ccaf1e64c74b7cdbf713f3b03b0.jpg",
            "price": 19.99,
            "instructor_id": 4,
            "level": "Advanced",
            "what_youll_learn": "Step|Flip|Not Trip",
            "course_video", "https://s3.us-east-2.amazonaws.com/lfm.video/dd935c2283d7467fbe5765c2a4c1de9d.mp4"
        },
        {
            "name": "Dress for Success",
            "description": "How you look can really set you apart",
            "course_image": "https://s3.us-east-2.amazonaws.com/lfm.photo/8995cabd6a8b44b6960b96c43382a5dc.jpg",
            "price": 22.99,
            "instructor_id": 4,
            "level": "Intermediate",
            "what_youll_learn": "Find clothes that fit|Determine your face and body shape|Color coordinating",
            "course_video", "https://s3.us-east-2.amazonaws.com/lfm.video/8abb1826d1a64e02ac9d129817c7f5ae.mp4"
        },
        {
            "name": "Cloud Computing: An Overview",
            "description": "Buzzwords are so useless. Get an overview on what people mean when they say them.",
            "course_image": "https://s3.us-east-2.amazonaws.com/lfm.photo/de9debc4ade64918904f00346f2bf199.jpg",
            "price": 24.99,
            "instructor_id": 2,
            "level": "Beginner",
            "what_youll_learn": "Storage|Management|Security",
            "course_video", "https://s3.us-east-2.amazonaws.com/lfm.video/9025dd212e1b40b5a4ca50097fefa4b3.mp4"
        },
        {
            "name": "Work(out) Smarter not Harder",
            "description": "Learn fast, efficient exercises to keep you in shape",
            "course_image": "https://s3.us-east-2.amazonaws.com/lfm.photo/50f749a577eb4367acf78fba05e45389.jpg",
            "price": 24.99,
            "instructor_id": 3,
            "level": "Beginner",
            "what_youll_learn": "Drop weight without having to wait|All gain, no pain",
            "course_video", "https://s3.us-east-2.amazonaws.com/lfm.video/e0ddd9415e8a40c6a1812c00fd15dce1.mp4"
        },
        {
            "name": "Ethical Hacking",
            "description": "Look at this lady. She looks happy. That could be you if you give us money and digitally trespass against the right people",
            "course_image": "https://s3.us-east-2.amazonaws.com/lfm.photo/323dc4788b1845458886d4ae0a7bffdf.jpg",
            "price": 22.99,
            "instructor_id": 2,
            "level": "Beginner",
            "what_youll_learn": "How to use two monitors|What sweats cost $200|What certs to get to fast-track into cyber",
            "course_video", "https://s3.us-east-2.amazonaws.com/lfm.video/d5f386c9fa8f43718a26d28447e68e59.mp4"
        },
        {
            "name": "Hack the Full Stack",
            "description": "Get your career on track",
            "course_image": "https://s3.us-east-2.amazonaws.com/lfm.photo/273bcb63dd7640cba50754c2cbf21c0a.jpg",
            "price": 39.99,
            "instructor_id": 2,
            "level": "Beginner",
            "what_youll_learn": "Vanilla JS|Node.js|React.js",
            "course_video", "https://s3.us-east-2.amazonaws.com/lfm.video/db62da734829482c84633e9ba6d3425b.mp4"
        },
        {
            "name": "Computers",
            "description": "Be a computer-y good person",
            "course_image": "https://s3.us-east-2.amazonaws.com/lfm.photo/ded2e9f81b89487f98c3bb4a13b51b92.jpg",
            "price": 23.99,
            "instructor_id": 1,
            "level": "Intermediate",
            "what_youll_learn": "Writing emails|Sending emails|Receiving emails",
            "course_video", "https://s3.us-east-2.amazonaws.com/lfm.video/dacb66183ba5481fbcc23de01ca13280.mp4"
        },
        {
            "name": "Intro to Quantum Physics",
            "description": "It's not so bad, just try",
            "course_image": "https://s3.us-east-2.amazonaws.com/lfm.photo/93ac15e64a30496a84e2feac0443df79.jpg",
            "price": 23.99,
            "instructor_id": 1,
            "level": "Intermediate",
            "what_youll_learn": "Why this meme is funny|What quantum has to do with electronics|How to solve wave equations",
            "course_video", "https://s3.us-east-2.amazonaws.com/lfm.video/69412c5cc53f48e294ee192186539587.mp4"
        }
    ]:
        db.session.add(Course(**course))
    db.session.commit()


def undo_courses():
    if environment=='production':
        db.session.execute(f"TRUNCATE table {SCHEMA}.courses RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM courses"))

    db.session.commit()
