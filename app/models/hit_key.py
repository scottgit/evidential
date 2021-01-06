from .db import db
from sqlalchemy.orm import relationship
from .association_topic_hit_key import topic_hit_key_association

class HitKey(db.Model):
  __tablename__ = 'hit_keys'

  id = db.Column(db.Integer, primary_key = True)
  key = db.Column(db.String(30), nullable = False, unique=True)

  topics = relationship(
    'Topic',
    secondary=topic_hit_key_association, back_populates='hit_keys',
    order_by='asc(Topic.label)'
    )

  def to_dict(self):
    return {
      "id": self.id,
      "key": self.key,
      "usedBy": self.topics,
    }
