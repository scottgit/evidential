from .db import db
from sqlalchemy.orm import relationship
from .association_claim_hit_key import claim_hit_key_association
from .mixins.track_updates import TrackUpdates

class HitKey(db.Model, TrackUpdates):
  __tablename__ = 'hit_keys'

  id = db.Column(db.Integer, primary_key = True)
  key = db.Column(db.String(30), nullable = False, unique=True)
  created_at = db.Column(db.DateTime, nullable = False)

  claims = relationship(
    'Claim',
    secondary=claim_hit_key_association, back_populates='hit_keys',
    order_by='Claim.assertion'
    )
  hits = relationship('Hit', back_populates='hit_key', order_by='Hit.text_id')

  # for to_history() keys are for python, and must match attribute key names of the model, so snake-case
  def to_history(self):
    return {
      "key": self.key,
    }

  # to_dict functions are for javascript, so camel-case keys
  def to_dict(self):
    return {
      "id": self.id,
      "key": self.key,
    }

  def full_to_dict(self):
    return {
      "id": self.id,
      "key": self.key,
      "usedBy": [claim.to_dict() for claim in self.claims],
      "foundIn": [hit.to_dict() for hit in self.hits]
    }
