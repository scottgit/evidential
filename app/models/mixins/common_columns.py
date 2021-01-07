from ..db import db

class CommonColumns():
    id = db.Column(db.Integer, primary_key = True)
    created_at = db.Column(db.DateTime, nullable = False)
    created_by = db.Column(db.Integer)
