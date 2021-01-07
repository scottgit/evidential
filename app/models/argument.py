from .db import db
from sqlalchemy.orm import relationship
from .mixins.track_updates import TrackUpdates

class Argument(db.Model, TrackUpdates):
  __tablename__ = 'arguments'

  id = db.Column(db.Integer, primary_key = True)
  statement = db.Column(db.String(250), nullable = False, unique=True)
  notes = db.Column(db.Text)
  created_at = db.Column(db.DateTime, nullable = False)

  claim_relations = relationship('SupportRebut', back_populates='arguments', order_by='SupportRebut.id')

  # for to_history() keys are for python, and must match attribute key names of the model, so snake-case
  def to_history(self):
    return {
      "statement": self.statement,
      "notes": self.notes,
    }

  # to_dict functions are for javascript, so camel-case keys
  def to_dict(self):
    return {
      "id": self.id,
      "statement": self.statement,
      "notes": self.notes,
      "created": self.created_at,
    }

  def full_to_dict(self):
    return {
      "id": self.id,
      "statement": self.statement,
      "notes": self.notes,
      "created": self.created_at,
      "supports": [relation.get_claims() for relation in self.claim_relations if relation.supports == True],
      "rebuts": [relation.get_claims() for relation in self.claim_relations if relation.supports == False]
    }
