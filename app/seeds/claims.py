from app.models import db, Claim
from datetime import datetime

def seed_claims():

    claims = [
        Claim(
            assertion='Test',
            notes='A claim created purely to test with',
            created_at=datetime.now(),
            updated_at=datetime.now(),
            ),
        Claim(
            assertion='Salvation is by faith',
            notes='A claim created to test with some various works',
            created_at=datetime(2020, 1, 4, 13),
            updated_at=datetime(2020, 1, 5, 8),
            ),
    ]

    db.session.bulk_save_objects(claims)
    db.session.commit()

# Uses a raw SQL query to TRUNCATE the claims table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and resets
# the auto incrementing primary key
def undo_claims():
    db.session.execute('TRUNCATE claims;')
    db.session.commit()
