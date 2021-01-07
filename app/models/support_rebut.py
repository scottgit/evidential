from .db import db
from sqlalchemy.orm import relationship

class SupportRebut(db.Model):
  __tablename__ = 'supports_rebuts'

  id = db.Column(db.Integer, primary_key = True)
  claim_id = db.Column(db.ForeignKey('claims.id'), nullable = False)
  argument_id = db.Column(db.ForeignKey('arguments.id'), nullable = False)
  # NOTE: A rebut is indicated by setting "supports" to False
  supports = db.Column(db.Boolean(), nullable = False)

  arguments = relationship('Argument', back_populates='relations', order_by='asc(Argument.statement)')
  claims = relationship('Claim', back_populates='relations', order_by='asc(Claim.assertion)')

  def to_dict(self):
    return {
      "id": self.id,
      "claim_id": self.claim_id,
      "argument_id": self.argument_id,
      "supports": self.supports,
    }

  def full_to_dict(self):
    return {
      "id": self.id,
      "claim_id": self.claim_id,
      "argument_id": self.argument_id,
      "supports": self.supports,
      "claimArguments": self.get_arguments(),
      "argumentClaims": self.get_claims(),
    }

  def get_claims(self):
    return [claim.to_dict() for claim in self.claims]

  def get_arguments(self):
    return [argument.to_dict() for argument in self.arguments]
