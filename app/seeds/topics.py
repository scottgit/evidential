from app.models import db, Topic
from datetime import datetime

def seed_topics():

    topics = [
        Topic(
            label='Test',
            description='A topic created purely to test with',
            created_at=datetime.now(),
            updated_at=datetime.now(),
            ),
        Topic(
            label='Salvation is by faith',
            description='A topic created to test with some various works',
            created_at=datetime(2020, 1, 4, 13),
            updated_at=datetime(2020, 1, 5, 8),
            ),
    ]

    db.session.bulk_save_objects(topics)
    db.session.commit()

# Uses a raw SQL query to TRUNCATE the topics table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and resets
# the auto incrementing primary key
def undo_topics():
    db.session.execute('TRUNCATE topics;')
    db.session.commit()
