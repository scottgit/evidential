from .db import db
from sqlalchemy.orm import relationship
from .association_claim_hit_key import claim_hit_key_association
from .mixins.track_updates import TrackUpdates

class Claim(db.Model, TrackUpdates):
  __tablename__ = 'claims'

  id = db.Column(db.Integer, primary_key = True)
  assertion = db.Column(db.String(200), nullable = False, unique=True)
  notes = db.Column(db.Text)
  created_at = db.Column(db.DateTime, nullable = False)

  hit_keys = relationship(
    'HitKey',
    secondary=claim_hit_key_association,
    back_populates='claims',
    order_by='HitKey.key',
    )

  argument_relations = relationship('SupportRebut', back_populates='claims', order_by='SupportRebut.id')
  hits = relationship('Hit', back_populates='claim', order_by='Hit.text_id')

  # for to_history() keys are for python, and must match attribute key names of the model, so snake-case
  def to_history(self):
    return {
      "assertion": self.assertion,
      "notes": self.notes,
    }

  # to_dict functions are for javascript, so camel-case keys
  def to_dict(self):
    return {
      "id": self.id,
      "assertion": self.assertion,
      "notes": self.notes,
      "created": self.created_at,
    }

  def full_to_dict(self):
    return {
      "id": self.id,
      "assertion": self.assertion,
      "notes": self.notes,
      "created": self.created_at,
      "hitKeys": [key.to_dict() for key in self.hit_keys],
      "supportingArguments": [relation.get_arguments() for relation in self.argument_relations if relation.supports == True],
      "rebutingArguments": [relation.get_arguments() for relation in self.argument_relations if relation.supports == False],
    }
