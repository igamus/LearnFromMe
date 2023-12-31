from app.models import db, Course, environment, SCHEMA
from sqlalchemy.sql import text
from .categories import development, business, finance, it, productivity, personal_development, design, marketing, health, music
from .users import demo, marnie, bobbie, buying_andy, dr_octopus, mario, daniel


def seed_courses():
    for course in [
        {
            "name": "Python for Beginners",
            "description": "Learn Python programming from scratch with hands-on examples.",
            "course_image": "https://s3.us-east-2.amazonaws.com/lfm.photo/pexels-photo-1181373.jpeg",
            "price": 19.99,
            "instructor_id": 2,
            "level": "Beginner",
            "what_youll_learn": "Basic Python syntax|Working with data types|Conditional statements",
            "course_video": "https://s3.us-east-2.amazonaws.com/lfm.video/pexels-koolshooters-8986521+(Original).mp4",
            "categories_for_course": [development]
        },
        {
            "name": "Video Editing Pro Series -- Color Correction",
            "description": "Continue to master vital skills to make your videos pop. Dominate the digital landscape with high-quality, stunning media",
            "course_image": "https://s3.us-east-2.amazonaws.com/lfm.photo/3382fff5103840f082243bede6faf418.jpg",
            "price": 22.99,
            "instructor_id": 5,
            "level": "Intermediate",
            "what_youll_learn": "Color correction",
            "course_video": "https://s3.us-east-2.amazonaws.com/lfm.video/8442a783790d45ff8418b36baa51817b.mp4",
            "categories_for_course": [design, marketing],
        },
        {
            "name": "Public Speaking",
            "description": "Can't deliver your presentations? Take my course, and learn to speak like a politician--comfortable anywhere with anyone!",
            "course_image": "https://s3.us-east-2.amazonaws.com/lfm.photo/38e39e68fbe24fd9953ca06c4a142c91.jpg",
            "price": 29.99,
            "instructor_id": 3,
            "level": "Beginner",
            "what_youll_learn": "Articulation|Gesticulation|Mastication",
            "course_video": "https://s3.us-east-2.amazonaws.com/lfm.video/26709abcb6224d37af3099d930480fa4.mp4",
            "categories_for_course": [business, marketing],
        },
        {
            "name": "SEO like a pro",
            "description": "Everything's on Google these days. You should be, too!",
            "course_image": "https://s3.us-east-2.amazonaws.com/lfm.photo/64f2a148c7954e9abcabc9ef4672efba.jpg",
            "price": 24.99,
            "instructor_id": 4,
            "level": "Beginner",
            "what_youll_learn": "Clicking|Bing|Safe Search",
            "course_video": "https://s3.us-east-2.amazonaws.com/lfm.video/b4bad8b917a944f48d54a150d239b604.mp4",
            "categories_for_course": [business, marketing],
        },
        {
            "name": "Advanced Drumming",
            "description": "",
            "course_image": "https://s3.us-east-2.amazonaws.com/lfm.photo/6970e321f0f34f4d87f164025513cdee.jpg",
            "price": 19.99,
            "instructor_id": 7,
            "level": "Advanced",
            "what_youll_learn": "Fills",
            "course_video": "https://s3.us-east-2.amazonaws.com/lfm.video/b3d7b41d25b043c3b04b5a81fc58fba1.mp4",
            "categories_for_course": [music],
        },
        {
            "name": "Step 'n' Flex",
            "description": "Dance like a beast",
            "course_image": "https://s3.us-east-2.amazonaws.com/lfm.photo/b5152ccaf1e64c74b7cdbf713f3b03b0.jpg",
            "price": 19.99,
            "instructor_id": 4,
            "level": "Advanced",
            "what_youll_learn": "Step|Flip|Not Trip",
            "course_video": "https://s3.us-east-2.amazonaws.com/lfm.video/dd935c2283d7467fbe5765c2a4c1de9d.mp4",
            "categories_for_course": [health, music],
        },
        {
            "name": "Dress for Success",
            "description": "How you look can really set you apart",
            "course_image": "https://s3.us-east-2.amazonaws.com/lfm.photo/8995cabd6a8b44b6960b96c43382a5dc.jpg",
            "price": 22.99,
            "instructor_id": 4,
            "level": "Intermediate",
            "what_youll_learn": "Find clothes that fit|Determine your face and body shape|Color coordinating",
            "course_video": "https://s3.us-east-2.amazonaws.com/lfm.video/8abb1826d1a64e02ac9d129817c7f5ae.mp4",
            "categories_for_course": [personal_development],
        },
        {
            "name": "Cloud Computing: An Overview",
            "description": "Buzzwords are so useless. Get an overview on what people mean when they say them.",
            "course_image": "https://s3.us-east-2.amazonaws.com/lfm.photo/de9debc4ade64918904f00346f2bf199.jpg",
            "price": 24.99,
            "instructor_id": 2,
            "level": "Beginner",
            "what_youll_learn": "Storage|Management|Security",
            "course_video": "https://s3.us-east-2.amazonaws.com/lfm.video/9025dd212e1b40b5a4ca50097fefa4b3.mp4",
            "categories_for_course": [development, it],
        },
        {
            "name": "Work(out) Smarter not Harder",
            "description": "Learn fast, efficient exercises to keep you in shape",
            "course_image": "https://s3.us-east-2.amazonaws.com/lfm.photo/50f749a577eb4367acf78fba05e45389.jpg",
            "price": 24.99,
            "instructor_id": 3,
            "level": "Beginner",
            "what_youll_learn": "Drop weight without having to wait|All gain, no pain",
            "course_video": "https://s3.us-east-2.amazonaws.com/lfm.video/e0ddd9415e8a40c6a1812c00fd15dce1.mp4",
            "categories_for_course": [health],
        },
        {
            "name": "Ethical Hacking",
            "description": "Look at this lady. She looks happy. That could be you if you give us money and digitally trespass against the right people",
            "course_image": "https://s3.us-east-2.amazonaws.com/lfm.photo/323dc4788b1845458886d4ae0a7bffdf.jpg",
            "price": 22.99,
            "instructor_id": 2,
            "level": "Beginner",
            "what_youll_learn": "How to use two monitors|What sweats cost $200|What certs to get to fast-track into cyber",
            "course_video": "https://s3.us-east-2.amazonaws.com/lfm.video/d5f386c9fa8f43718a26d28447e68e59.mp4",
            "categories_for_course": [development, it],
        },
        {
            "name": "Hack the Full Stack",
            "description": "Get your career on track",
            "course_image": "https://s3.us-east-2.amazonaws.com/lfm.photo/273bcb63dd7640cba50754c2cbf21c0a.jpg",
            "price": 39.99,
            "instructor_id": 2,
            "level": "Beginner",
            "what_youll_learn": "Vanilla JS|Node.js|React.js",
            "course_video": "https://s3.us-east-2.amazonaws.com/lfm.video/db62da734829482c84633e9ba6d3425b.mp4",
            "categories_for_course": [development],
        },
        {
            "name": "Mastering Business Communication",
            "description": "Enhance your business communication skills to excel in your career.",
            "course_image": "https://s3.us-east-2.amazonaws.com/lfm.photo/bc-pexels-fauxels-3184433.jpg",
            "price": 29.99,
            "instructor_id": 3,
            "level": "Intermediate",
            "what_youll_learn": "Effective email writing|Presentation skills|Negotiation techniques",
            "course_video": "https://s3.us-east-2.amazonaws.com/lfm.video/mb-3video+(2160p)+(1).mp4",
            "categories_for_course": [business]
        },
        {
            "name": "Machine Learning Fundamentals",
            "description": "Gain a deep understanding of machine learning concepts and algorithms.",
            "course_image": "https://s3.us-east-2.amazonaws.com/lfm.photo/ml-pexels-kindel-media-9028869.jpg",
            "price": 49.99,
            "instructor_id": 5,
            "level": "Advanced",
            "what_youll_learn": "Supervised and unsupervised learning|Deep learning|Model evaluation",
            "course_video": "https://s3.us-east-2.amazonaws.com/lfm.video/ml-pexels-diva-plavalaguna-6985519+(2160p).mp4",
            "categories_for_course": [development, it]
        },
        {
            "name": "Introduction to Personal Finance",
            "description": "Learn the basics of personal finance and budgeting for financial success.",
            "course_image": "https://s3.us-east-2.amazonaws.com/lfm.photo/pf-pexels-karolina-grabowska-4386395.jpg",
            "price": 14.99,
            "instructor_id": 6,
            "level": "Beginner",
            "what_youll_learn": "Budgeting techniques|Saving and investing|Debt management",
            "course_video": "https://s3.us-east-2.amazonaws.com/lfm.video/pf-pexels-gabby-k-6282378+(1080p).mp4",
            "categories_for_course": [finance, personal_development]
        },
        {
            "name": "Underwater Basket Weaving",
            "description": "Learn to weave baskets -- underwater",
            "course_image": "https://s3.us-east-2.amazonaws.com/lfm.photo/ubw-pexels-kindel-media-8849950.jpg",
            "price": 27.93,
            "instructor_id": 9,
            "level": "Advanced",
            "what_youll_learn": "Weaving techniques|SCUBA diving|Develop a yearning for the sea",
            "course_video": "https://s3.us-east-2.amazonaws.com/lfm.video/ubw-pexels_videos_1457024+(1080p).mp4",
            "categories_for_course": [design, health],
        },
        {
            "name": "Bartitsu: The Gentleman's Martial Art",
            "description": "Learn to fight like Sherlock Holmes. It's elementary, dear Watson.",
            "course_image": "https://s3.us-east-2.amazonaws.com/lfm.photo/bart-pexels-cojanu-alexandru-8815711.jpg",
            "price": 22.11,
            "instructor_id": 9,
            "level": "Beginner",
            "what_youll_learn": "Gumption|Moxie|A roguish smile",
            "course_video": "https://s3.us-east-2.amazonaws.com/lfm.video/bart-pexels-ivan-samkov-9645545+(1080p).mp4",
            "categories_for_course": [health],
        },
        {
            "name": "Graphic Design Fundamentals",
            "description": "Explore the principles of graphic design and create stunning visuals.",
            "course_image": "https://s3.us-east-2.amazonaws.com/lfm.photo/gd-pexels-antoni-shkraba-4348403.jpg",
            "price": 29.99,
            "instructor_id": 9,
            "level": "Intermediate",
            "what_youll_learn": "Typography|Color theory|Logo design",
            "course_video": "https://s3.us-east-2.amazonaws.com/lfm.video/gd-pexels_videos_1086533+(720p).mp4",
            "categories_for_course": [design]
        },
        {
            "name": "Digital Marketing Strategy",
            "description": "Learn effective digital marketing strategies to grow your business online.",
            "course_image": "https://s3.us-east-2.amazonaws.com/lfm.photo/dm-pexels-fauxels-3184455.jpg",
            "price": 39.99,
            "instructor_id": 3,
            "level": "Advanced",
            "what_youll_learn": "SEO optimization|Social media advertising|Content marketing",
            "course_video": "https://s3.us-east-2.amazonaws.com/lfm.video/dm-pexels-mikael-blomkvist-6558144+(2160p).mp4",
            "categories_for_course": [marketing]
        },
        {
            "name": "Healthy Living and Nutrition",
            "description": "Discover the secrets to a healthy lifestyle through proper nutrition.",
            "course_image": "https://s3.us-east-2.amazonaws.com/lfm.photo/nut-pexels-jellybee-8940753.jpg",
            "price": 19.99,
            "instructor_id": 3,
            "level": "Intermediate",
            "what_youll_learn": "Balanced diet planning|Meal preparation|Nutritional science",
            "course_video": "https://s3.us-east-2.amazonaws.com/lfm.video/nut-pexels-eva-elijas-8085633+(1080p).mp4",
            "categories_for_course": [health]
        },
        {
            "name": "Music Theory Essentials",
            "description": "Unlock the world of music theory and become a skilled musician.",
            "course_image": "https://s3.us-east-2.amazonaws.com/lfm.photo/mt-pexels-andrea-piacquadio-3831645.jpg",
            "price": 24.99,
            "instructor_id": 4,
            "level": "Intermediate",
            "what_youll_learn": "Note reading|Chord progressions|Composition techniques",
            "course_video": "https://s3.us-east-2.amazonaws.com/lfm.video/mt-pexels_videos_946146+(1080p).mp4",
            "categories_for_course": [music]
        },
        {
            "name": "Advanced Data Analysis with Python",
            "description": "Dive deep into data analysis using Python and pandas.",
            "course_image": "https://s3.us-east-2.amazonaws.com/lfm.photo/da-pexels-tima-miroshnichenko-7567426.jpg",
            "price": 49.99,
            "instructor_id": 5,
            "level": "Advanced",
            "what_youll_learn": "Data visualization|Statistical analysis|Machine learning for data analysis",
            "course_video": "https://s3.us-east-2.amazonaws.com/lfm.video/da-pexels-tima-miroshnichenko-7579953+(Original).mp4",
            "categories_for_course": [development, it]
        },
        {
            "name": "Time Management Mastery",
            "description": "Boost your productivity and achieve more with effective time management techniques.",
            "course_image": "https://s3.us-east-2.amazonaws.com/lfm.photo/timem-pexels-michaela-295826.jpg",
            "price": 29.99,
            "instructor_id": 3,
            "level": "Intermediate",
            "what_youll_learn": "Prioritization strategies|Time blocking|Overcoming procrastination",
            "course_video": "https://s3.us-east-2.amazonaws.com/lfm.video/timem-pexels-polina-kovaleva-5546843+(1080p).mp4",
            "categories_for_course": [productivity]
        },
        {
            "name": "Goal Setting and Achievement",
            "description": "Learn how to set clear goals and take actionable steps to achieve them.",
            "course_image": "https://s3.us-east-2.amazonaws.com/lfm.photo/goal-pexels-engin-akyurt-1552617.jpg",
            "price": 19.99,
            "instructor_id": 3,
            "level": "Beginner",
            "what_youll_learn": "Setting SMART goals|Creating an action plan|Tracking progress",
            "course_video": "https://s3.us-east-2.amazonaws.com/lfm.video/goal-pexels-tima-miroshnichenko-6078261+(1080p).mp4",
            "categories_for_course": [productivity, personal_development]
        },
        {
            "name": "Effective Remote Work Strategies",
            "description": "Master the art of remote work and stay productive from anywhere.",
            "course_image": "https://s3.us-east-2.amazonaws.com/lfm.photo/remote-pexels-rdne-stock-project-8489364.jpg",
            "price": 34.99,
            "instructor_id": 4,
            "level": "Intermediate",
            "what_youll_learn": "Remote communication|Time zone management|Staying motivated",
            "course_video": "https://s3.us-east-2.amazonaws.com/lfm.video/remote-video+(1080p).mp4",
            "categories_for_course": [productivity, business]
        },
        {
            "name": "Mindfulness and Productivity",
            "description": "Harness the power of mindfulness to increase focus and productivity.",
            "course_image": "https://s3.us-east-2.amazonaws.com/lfm.photo/mind-pexels-pixabay-33282.jpg",
            "price": 24.99,
            "instructor_id": 2,
            "level": "Intermediate",
            "what_youll_learn": "Mindfulness meditation|Stress reduction|Enhanced concentration",
            "course_video": "https://s3.us-east-2.amazonaws.com/lfm.video/mind-pexels-shvets-production-7213055+(2160p).mp4",
            "categories_for_course": [productivity, personal_development]
        },
        {
            "name": "Effective Email Management",
            "description": "Learn strategies to manage your email inbox efficiently and reduce digital clutter.",
            "course_image": "https://s3.us-east-2.amazonaws.com/lfm.photo/email-pexels-torsten-dettlaff-193003.jpg",
            "price": 14.99,
            "instructor_id": 7,
            "level": "Beginner",
            "what_youll_learn": "Email organization|Inbox zero techniques|Automated responses",
            "course_video": "https://s3.us-east-2.amazonaws.com/lfm.video/email-production_id_5075222+(2160p).mp4",
            "categories_for_course": [productivity, business]
        },
        {
            "name": "Investing for Beginners",
            "description": "Start your journey in the world of investing and build a secure financial future.",
            "course_image": "https://s3.us-east-2.amazonaws.com/lfm.photo/invest-pexels-pixabay-534216.jpg",
            "price": 19.99,
            "instructor_id": 6,
            "level": "Beginner",
            "what_youll_learn": "Stock market basics|Diversification|Portfolio management",
            "course_video": "https://s3.us-east-2.amazonaws.com/lfm.video/invest-video+(2160p).mp4",
            "categories_for_course": [finance]
        },
        {
            "name": "Financial Planning for Retirement",
            "description": "Learn how to plan for a comfortable retirement and make your money work for you.",
            "course_image": "https://s3.us-east-2.amazonaws.com/lfm.photo/retire-pexels-mikhail-nilov-6972761.jpg",
            "price": 29.99,
            "instructor_id": 4,
            "level": "Intermediate",
            "what_youll_learn": "Retirement savings strategies|401(k) and IRAs|Estate planning",
            "course_video": "https://s3.us-east-2.amazonaws.com/lfm.video/retire-pexels-karolina-grabowska-5981203+(2160p).mp4",
            "categories_for_course": [finance, personal_development]
        },
        {
            "name": "Advanced Photoshop Techniques",
            "description": "Take your Photoshop skills to the next level with advanced photo editing and manipulation.",
            "course_image": "https://s3.us-east-2.amazonaws.com/lfm.photo/ps-pexels-caio-56759.jpg",
            "price": 34.99,
            "instructor_id": 4,
            "level": "Advanced",
            "what_youll_learn": "Mastering layers|Advanced selection techniques|Photo retouching",
            "course_video": "https://s3.us-east-2.amazonaws.com/lfm.video/ps-pexels-olya-kobruseva-7610989+(1080p).mp4",
            "categories_for_course": [design]
        },
        {
            "name": "User Interface (UI) Design Fundamentals",
            "description": "Learn the basics of creating user-friendly and visually appealing user interfaces.",
            "course_image": "https://s3.us-east-2.amazonaws.com/lfm.photo/ui-pexels-cottonbro-studio-5077054.jpg",
            "price": 24.99,
            "instructor_id": 5,
            "level": "Intermediate",
            "what_youll_learn": "UI design principles|Wireframing|Prototyping tools",
            "course_video": "https://s3.us-east-2.amazonaws.com/lfm.video/ui-production_id_4884244+(2160p).mp4",
            "categories_for_course": [design, it]
        },
        {
            "name": "Spotting Distinct Architectural Styles to Impress People on Walks Together",
            "description": 'You can tell your sweetie, "That one is Victorian" or a potential employer, "Those sure are Ionian columns," and finally get the approval of your father when you tell him, "Papa, I, too, feel blobitecture is overrated."',
            "course_image": "https://s3.us-east-2.amazonaws.com/lfm.photo/dd63cc2a63414f82b732a99caa04300c.jpg",
            "price": 42.99,
            "instructor_id": 5,
            "level": "Beginner",
            "what_youll_learn": "To identify buildings by facades|To see past facades|To identify how likely it is that Spider-Man has recently swung by the buidling",
            "course_video": "https://s3.us-east-2.amazonaws.com/lfm.video/d7a60dc845bd442f9cb4526e60dfff8b.mp4",
        },
                {
            "name": "Robotics",
            "description": "Software's cool, but hardware is also advancing like crazy. Stay ahead of the curve!",
            "course_image": "https://s3.us-east-2.amazonaws.com/lfm.photo/d8e9a800a4564666abfdfb0f7a003f05.jpg",
            "price": 17.99,
            "instructor_id": 5,
            "level": "Intermediate",
            "what_youll_learn": "How to identify and subdue Spider-Man",
            "course_video": "https://s3.us-east-2.amazonaws.com/lfm.video/8ebf57c2cbc34fe881b1d7357cd90784.mp4",
            "categories_for_course": [development],
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
            "users_with_course_in_cart": [demo],
            "categories_for_course": [productivity],
        },
        {
            "name": "More touch typing skills!",
            "description": "We're back to give you my patented insights",
            "course_image": "https://s3.us-east-2.amazonaws.com/lfm.photo/mb-2.jpg",
            "price": 14.99,
            "instructor_id": 7,
            "level": "Intermediate",
            "what_youll_learn": "The power of your pinky|Number pad typing",
            "course_video": "https://s3.us-east-2.amazonaws.com/lfm.video/mb-2pexels_videos_1584821+(1080p).mp4",
            "categories_for_course": [productivity],
        },
        {
            "name": "Advanced touch typing skills!",
            "description": "The culmination of our efforts together will have you typing as fast as you think!",
            "course_image": "https://s3.us-east-2.amazonaws.com/lfm.photo/mb-3.jpg",
            "price": 14.99,
            "instructor_id": 7,
            "level": "Advanced",
            "what_youll_learn": "Special characters|Tips on foreign keyboards",
            "course_video": "https://s3.us-east-2.amazonaws.com/lfm.video/mb-3video+(2160p)+(1).mp4",
            "categories_for_course": [productivity],
        },
        {
            "name": "Touch type like a pro!",
            "description": "Don't type like a Goomba! Learn to type without poking and pecking with-a me, Mario!",
            "course_image": "https://s3.us-east-2.amazonaws.com/lfm.photo/mt-pexels-shvets-production-7545262.jpg",
            "price": 14.99,
            "instructor_id": 8,
            "level": "Beginner",
            "what_youll_learn": "Type really fast|Type accurately|Type with very few errors",
            "course_video": "https://s3.us-east-2.amazonaws.com/lfm.video/mt-pexels-cottonbro-6853337+(2160p).mp4",
            "users_with_course_in_cart": [demo],
            "categories_for_course": [productivity],
        },
        {
            "name": "Touch type like a plubmer!",
            "description": "Don't type like a Goomba! Learn to type without poking and pecking with-a me, Mario! (part 2/3)",
            "course_image": "https://s3.us-east-2.amazonaws.com/lfm.photo/mt-2-pexels-thirdman-7265362.jpg",
            "price": 14.99,
            "instructor_id": 8,
            "level": "Advanced",
            "what_youll_learn": "Type really fast|Type accurately|Type with very few errors",
            "course_video": "https://s3.us-east-2.amazonaws.com/lfm.video/mt-pexels-cottonbro-6853337+(2160p).mp4",
            "categories_for_course": [productivity],
        },
        {
            "name": "Touch type like a Mario!",
            "description": "Luigi Mario. Mario Mario. What do we have in common? Our blazing-fast WPM! (part 3/3)",
            "course_image": "https://s3.us-east-2.amazonaws.com/lfm.photo/mt-3-pexels-sora-shimazaki-5926382.jpg",
            "price": 14.99,
            "instructor_id": 8,
            "level": "Advanced",
            "what_youll_learn": "Type really fast|Type accurately|Type with very few errors",
            "course_video": "https://s3.us-east-2.amazonaws.com/lfm.video/mt-pexels-cottonbro-6853337+(2160p).mp4",
            "categories_for_course": [productivity],
        },
        {
            "name": "Introduction to Plumbing",
            "description": "Learn the basics of personal finance and budgeting for financial success.",
            "course_image": "https://s3.us-east-2.amazonaws.com/lfm.photo/ip-pexels-toni-canaj-15587702.jpg",
            "price": 14.99,
            "instructor_id": 8,
            "level": "Beginner",
            "what_youll_learn": "Which mushrooms are edible|Which mushrooms you stomp|Dinosaur taming",
            "course_video": "https://s3.us-east-2.amazonaws.com/lfm.video/ip-pexels-stepan-steblinkamensky-7584762+(Original).mp4",
            "categories_for_course": [business]
        },
        {
            "name": "Computers",
            "description": "Be a computer-y good person",
            "course_image": "https://s3.us-east-2.amazonaws.com/lfm.photo/ded2e9f81b89487f98c3bb4a13b51b92.jpg",
            "price": 23.99,
            "instructor_id": 1,
            "level": "Intermediate",
            "what_youll_learn": "Writing emails|Sending emails|Receiving emails",
            "course_video": "https://s3.us-east-2.amazonaws.com/lfm.video/dacb66183ba5481fbcc23de01ca13280.mp4",
            "categories_for_course": [development, it],
        },
        {
            "name": "Intro to Quantum Physics",
            "description": "It's not so bad, just try",
            "course_image": "https://s3.us-east-2.amazonaws.com/lfm.photo/93ac15e64a30496a84e2feac0443df79.jpg",
            "price": 23.99,
            "instructor_id": 1,
            "level": "Intermediate",
            "what_youll_learn": "Why this meme is funny|What quantum has to do with electronics|How to solve wave equations",
            "course_video": "https://s3.us-east-2.amazonaws.com/lfm.video/69412c5cc53f48e294ee192186539587.mp4",
        },
        {
            "name": "Reading Shakespeare to trees",
            "description": "Give your garden a boost through the esoteric powers of the Bard",
            "course_image": "https://s3.us-east-2.amazonaws.com/lfm.photo/st-pexels-nappy-936133.jpg",
            "price": 16.16,
            "instructor_id": 9,
            "level": "Beginner",
            "what_youll_learn": "Botany|Acting|Proper pronounciation",
            "course_video": "https://s3.zus-east-2.amazonaws.com/lfm.video/st-pexels-creativ-medium-5657579+(2160p).mp4",
            "categories_for_course": [marketing, health],
        },
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
    ]:
        db.session.add(Course(**course))
    db.session.commit()


def undo_courses():
    if environment=='production':
        db.session.execute(f"TRUNCATE table {SCHEMA}.courses RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM courses"))

    db.session.commit()
