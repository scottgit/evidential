from app.models import db, Claim_History
from datetime import datetime

def seed_claim_histories():

    claim_histories = [
        Claim_History(
            updated_by=2,
            claim_id=2,
            assertion='Salvation',
            notes='A test claim',
            created_at=datetime(2020, 1, 5, 8),
            ),
    ]

    db.session.bulk_save_objects(claim_histories)
    db.session.commit()

# Uses a raw SQL query to TRUNCATE the claim_histories table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and resets
# the auto incrementing primary key
def undo_claim_histories():
    db.session.execute('TRUNCATE claim_histories;')
    db.session.commit()
