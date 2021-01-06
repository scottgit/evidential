from app.models import db, claim_hit_key_association


def seed_association_claims_hit_keys():

    associations = [
      {
        "claim_id": 1,
        "key_id": 1
      },
      {
        "claim_id": 1,
        "key_id": 2
      },
      {
        "claim_id": 2,
        "key_id": 3
      },
      {
        "claim_id": 2,
        "key_id": 4
      },
    ]

    db.session.execute(claim_hit_key_association.insert(), associations)
    db.session.commit()

# Uses a raw SQL query to TRUNCATE the hit_keys table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and resets
# the auto incrementing primary key
def undo_association_claims_hit_keys():
    db.session.execute('TRUNCATE seed_association_claims_hit_keys;')
    db.session.commit()
