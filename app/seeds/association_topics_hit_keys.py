from app.models import db, topic_hit_key_association


def seed_association_topics_hit_keys():

    associations = [
      {
        "topic_id": 1,
        "key_id": 1
      },
      {
        "topic_id": 1,
        "key_id": 2
      },
      {
        "topic_id": 2,
        "key_id": 3
      },
      {
        "topic_id": 2,
        "key_id": 4
      },
    ]

    db.session.execute(topic_hit_key_association.insert(), associations)
    db.session.commit()

# Uses a raw SQL query to TRUNCATE the hit_keys table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and resets
# the auto incrementing primary key
def undo_association_topics_hit_keys():
    db.session.execute('TRUNCATE seed_association_topics_hit_keys;')
    db.session.commit()
