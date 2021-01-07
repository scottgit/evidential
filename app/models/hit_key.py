from .db import db
from sqlalchemy.orm import relationship
from .association_claim_hit_key import claim_hit_key_association

class HitKey(db.Model):
  __tablename__ = 'hit_keys'

  id = db.Column(db.Integer, primary_key = True)
  key = db.Column(db.String(30), nullable = False, unique=True)

  claims = relationship(
    'Claim',
    secondary=claim_hit_key_association, back_populates='hit_keys',
    order_by='asc(Claim.assertion)'
    )

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
    }
