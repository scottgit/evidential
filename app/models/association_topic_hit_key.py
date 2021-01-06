from .db import db

topic_hit_key_association = db.Table('topic_hit_keys', db.Model.metadata,
    db.Column('topic_id', db.Integer, db.ForeignKey('topics.id')),
    db.Column('key_id', db.Integer, db.ForeignKey('hit_keys.id'))
)
