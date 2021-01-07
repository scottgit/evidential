from app.models import db, Change_History
from datetime import datetime

def seed_change_histories():

    change_histories = [
        Change_History(
            updated_by=2,
            change_id=2,
            assertion='Salvation',
            notes='A test Change',
            created_at=datetime(2020, 1, 5, 8),
            ),
    ]

    db.session.bulk_save_objects(change_histories)
    db.session.commit()

# Uses a raw SQL query to TRUNCATE the Change_histories table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and resets
# the auto incrementing primary key
def undo_change_histories():
    db.session.execute('TRUNCATE change_histories;')
    db.session.execute('DROP TYPE tracked_tables;')
    db.session.commit()
