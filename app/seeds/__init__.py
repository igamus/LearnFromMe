from flask.cli import AppGroup
from .users import seed_users, undo_users
from .courses import seed_courses, undo_courses
from .categories import seed_categories, undo_categories
from app.models.db import db, environment, SCHEMA


seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    if environment == 'production':
        undo_courses()
        undo_users()
        undo_categories()
    seed_categories()
    seed_users()
    seed_courses()


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_courses()
    undo_users()
    undo_categories()
