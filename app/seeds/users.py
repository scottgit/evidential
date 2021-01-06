from werkzeug.security import generate_password_hash
from app.models import db, User

# Adds a demo user, you can add other users here if you want
def seed_users():

    users = [
        User(
            first_name='Demo',
            last_name='Persona',
            email='demo@demo.demo',
            verified=True,
            password='hj8n%9Gw'
            ),
        User(
            first_name='Scott',
            last_name='Smith',
            email='scott@scott.com',
            verified=True,
            password='ss2DevT$'
        )
    ]

    db.session.bulk_save_objects(objects)
    db.session.commit()

# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and resets
# the auto incrementing primary key
def undo_users():
    db.session.execute('TRUNCATE users;')
    db.session.commit()
