from app.models import db, Topic
from datetime import date

def seed_topics():

    topics = [
        Topic(
            key_name='Test',
            description='A topic created purely to test with',
            created_at=date.today(),
            updated_at=date.today(),
            ),
        Topic(
            key_name='Jean Calvin on Redemption',
            description='A topic created to test with works by the theologian',
            created_at=date.today(),
            updated_at=date.today(),
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
