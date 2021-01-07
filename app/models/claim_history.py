from .db import db
from sqlalchemy.orm import relationship

class Claim_History(db.Model):
  __tablename__ = 'claim_histories'

  id = db.Column(db.Integer, primary_key = True)
  updated_by = db.Column(db.ForeignKey('users.id'), nullable = False)
  claim_id = db.Column(db.ForeignKey('claims.id'), nullable = False)
  assertion = db.Column(db.String(30), nullable = False)
  notes = db.Column(db.Text, nullable = False)
  created_at = db.Column(db.DateTime, nullable = False)

  user = relationship('User', back_populates='claim_changes')
  claim = relationship('Claim', back_populates='history')

  def to_dict(self):
    return {
      "id": self.id,
      "updated_by": self.updated_by,
      "claimId": self.claim_id,
      "assertion": self.assertion,
      "notes": self.notes,
      "created": self.created_at,
    }

  def full_to_dict(self):
    return {
      "id": self.id,
      "updated_by": self.updated_by,
      "claimId": self.claim_id,
      "assertion": self.assertion,
      "notes": self.notes,
      "created": self.created_at,
      "user": self.user.public_to_dict(),
      "claim": self.claim.to_dict(),
    }
