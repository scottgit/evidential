from app.models import db, Claim, HitKey, Argument
from datetime import datetime

def seed_change_histories():

    claim = Claim.query.get(3)
    claim.update_data(2, {"assertion": "Ian Bentley is the best programmer", "notes": "A totally accurate claim"})

    hit_key = HitKey.query.get(3)
    hit_key.update_data(1, {"key": "salvation"})

    argument = Argument.query.get(5)
    argument.update_data(1, {"statement": 'Ian knows the answers to most of my questions'})
    db.session.commit()

# Uses a raw SQL query to TRUNCATE the Change_histories table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and resets
# the auto incrementing primary key
def undo_change_histories():
    db.session.execute('TRUNCATE change_histories;')
    db.session.execute('DROP TYPE tracked_tables;')
    db.session.commit()
