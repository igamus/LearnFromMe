from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text


demo = User(
    name='Demo',
    email='demo@aa.io',
    password='password'
)
marnie = User(
    name='Marnie Zucker',
    email='marnie@aa.io',
    password='password'
)
bobbie = User(
    name='Dr. Bobbie Vaile',
    email='robertavaile@westernsydney.edu.au',
    password='password'
)
buying_andy = User(
    name='Andy Minhaj',
    email='andy@aa.io',
    password='password'
)
dr_octopus = User(
    name='Dr. Otto Octavius',
    email='ooctavius@horizon.edu',
    password='password'
)
puppy = User(
    name='Peaches',
    email='peaches@mit.edu',
    password='password'
)
beacon = User(
    name='Mavis Beacon',
    email='mavis@asu.edu',
    password='password'
)
mario = User(
    name='Mario Mario',
    email='ihatebowser@nintendo.jp',
    password='password'
)
daniel = User(
    name='Daniel Weltman',
    email='palpatinedidnothingwrong@lucasfilms.disney',
    password='password'
)

def seed_users():
    db.session.add(demo) # 1
    db.session.add(marnie) # 2
    db.session.add(bobbie) # 3
    db.session.add(buying_andy) # 4
    db.session.add(dr_octopus) # 5
    db.session.add(puppy) # 6
    db.session.add(beacon) # 7
    db.session.add(mario) # 8
    db.session.add(daniel) # 9
    db.session.commit()


def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM users"))

    db.session.commit()
