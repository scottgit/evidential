from models.mixins.track_updates import TrackUpdates
from .db import db
from sqlalchemy.orm import relationship
from sqlalchemy.orm.session import object_session
from .mixins.track_updates import TrackUpdates

class SupportRebut(db.Model, TrackUpdates):
  __tablename__ = 'supports_rebuts'

  id = db.Column(db.Integer, primary_key = True)
  claim_id = db.Column(db.ForeignKey('claims.id'), nullable = False)
  argument_id = db.Column(db.ForeignKey('arguments.id'), nullable = False)
  # NOTE: A rebut is indicated by setting "supports" to False
  supports = db.Column(db.Boolean(), nullable = False)
  created_at = db.Column(db.DateTime, nullable = False)

  arguments = relationship('Argument', back_populates='claim_relations', order_by='Argument.statement')
  claims = relationship('Claim', back_populates='argument_relations', order_by='Claim.assertion')

  def get_claims(self):
    return [claim.to_dict() for claim in self.claims]

  def get_arguments(self):
    return [argument.to_dict() for argument in self.arguments]

  # for to_history() keys are for python, and must match attribute key names of the model, so snake-case
  def to_history(self):
    return {
      "claim_id": self.claim_id,
      "argument_id": self.argument_id,
      "supports": self.supports,
    }

  # to_dict functions are for javascript, so camel-case keys
  def to_dict(self):
    return {
      "id": self.id,
      "claimId": self.claim_id,
      "argumentId": self.argument_id,
      "supports": self.supports,
      "created": self.created_at,
    }

  def full_to_dict(self):
    return {
      "id": self.id,
      "claimId": self.claim_id,
      "argumentId": self.argument_id,
      "supports": self.supports,
      "created": self.created_at,
      "claimArguments": self.get_arguments(),
      "argumentClaims": self.get_claims(),
    }
