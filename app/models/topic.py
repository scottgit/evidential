from .db import db
from sqlalchemy.orm import relationship
from .association_topic_hit_key import topic_hit_key_association

class Topic(db.Model):
  __tablename__ = 'topics'

  id = db.Column(db.Integer, primary_key = True)
  label = db.Column(db.String(30), nullable = False)
  description = db.Column(db.Text, nullable = False)
  created_at = db.Column(db.DateTime, nullable = False)
  updated_at = db.Column(db.DateTime, nullable = False)

  history = relationship('Topic_History', back_populates='topic', order_by='desc(Topic_History.id)')

  hit_keys = relationship(
    'HitKey',
    secondary=topic_hit_key_association,
    back_populates='topics',
    order_by='asc(HitKey.key)')

  def to_dict(self):
    return {
      "id": self.id,
      "label": self.label,
      "description": self.description,
      "created": self.created_at,
      "updated": self.updated_at,
      "changeHistory": self.history,
      "hitKeys": self.hit_keys,
    }
