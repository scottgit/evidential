from app.models import db, Text
from datetime import date
import requests

def seed_texts():

    c1 = 'Just some short plain text test content to work with.'
    c1wc = len(c1.split())

    c2source = 'https://www.gutenberg.org/files/45001/45001-h/45001-h.html'
    c2file = requests.get(c2source)
    c2 = c2file.text
    c2wc = len(c2.split())

    texts = [
        Text(
            title='Test title 1',
            content=c1,
            word_count=c1wc,
            source="test/1/no/real/url.html",
            locked=True,
            added_by=1,
            created_at=date.today(),
            updated_at=date.today(),
            ),
        Text(
            title='Institutes of the Christian Religion, Vol. 1',
            content=c2,
            word_count=c2wc,
            source=c2source,
            locked=True,
            added_by=2,
            created_at=date.today(),
            updated_at=date.today(),
            ),
    ]

    db.session.bulk_save_objects(texts)
    db.session.commit()

# Uses a raw SQL query to TRUNCATE the texts table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and resets
# the auto incrementing primary key
def undo_texts():
    db.session.execute('TRUNCATE texts;')
    db.session.commit()
