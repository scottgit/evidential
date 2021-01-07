from .db import db
from sqlalchemy.orm import relationship
from .mixins.track_updates import TrackUpdates

class Rating(db.Model, TrackUpdates):
  __tablename__ = 'ratings'

  id = db.Column(db.Integer, primary_key = True)
  hit_id = db.Column(db.ForeignKey('hit.id'))
  # TODO Finish
  created_at = db.Column(db.DateTime, nullable = False)

  # claim_relations = relationship('SupportRebut', back_populates='arguments', order_by='SupportRebut.id')

  # def to_history(self):

  # def to_dict(self):
  #   return {
  #     "id": self.id,
  #     "statement": self.statement,
  #     "notes": self.notes,
  #     "created": self.created_at,
  #     "updated": self.updated_at,
  #   }

  # def full_to_dict(self):
  #   return {
  #     "id": self.id,
  #     "statement": self.statement,
  #     "notes": self.notes,
  #     "created": self.created_at,
  #     "updated": self.updated_at,
  #     "supports": [relation.get_claims() for relation in self.claim_relations if relation.supports == True],
  #     "rebuts": [relation.get_claims() for relation in self.claim_relations if relation.supports == False]
  #   }
