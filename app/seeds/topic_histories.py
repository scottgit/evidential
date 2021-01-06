from app.models import db, Topic_History
from datetime import datetime

def seed_topic_histories():

    topic_histories = [
        Topic_History(
            updated_by=2,
            topic_id=2,
            label='Salvation',
            description='A test topic',
            created_at=datetime(2020, 1, 5, 8),
            ),
    ]

    db.session.bulk_save_objects(topic_histories)
    db.session.commit()

# Uses a raw SQL query to TRUNCATE the topic_histories table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and resets
# the auto incrementing primary key
def undo_topic_histories():
    db.session.execute('TRUNCATE topic_histories;')
    db.session.commit()
