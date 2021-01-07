from .db import db

claim_hit_key_association = db.Table('claim_hit_keys', db.Model.metadata,
    db.Column('claim_id', db.Integer, db.ForeignKey('claims.id'), primary_key=True),
    db.Column('key_id', db.Integer, db.ForeignKey('hit_keys.id'), primary_key=True)
)
