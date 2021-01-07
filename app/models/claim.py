from .db import db
from sqlalchemy.orm import relationship
from .association_claim_hit_key import claim_hit_key_association

class Claim(db.Model):
  __tablename__ = 'claims'

  id = db.Column(db.Integer, primary_key = True)
  assertion = db.Column(db.String(200), nullable = False, unique=True)
  notes = db.Column(db.Text)
  created_at = db.Column(db.DateTime, nullable = False)
  updated_at = db.Column(db.DateTime, nullable = False)

  history = relationship('Claim_History', back_populates='claim', order_by='desc(Claim_History.id)')

  hit_keys = relationship(
    'HitKey',
    secondary=claim_hit_key_association,
    back_populates='claims',
    order_by='asc(HitKey.key)',
    )

  relations = relationship('SupportRebut', back_populates='claims', order_by='asc(SupportRebut.id)')

  def to_dict(self):
    return {
      "id": self.id,
      "assertion": self.assertion,
      "notes": self.notes,
      "created": self.created_at,
      "updated": self.updated_at,
    }

  def full_to_dict(self):
    return {
      "id": self.id,
      "assertion": self.assertion,
      "notes": self.notes,
      "created": self.created_at,
      "updated": self.updated_at,
      "changeHistory": [update.to_dict() for update in self.history],
      "hitKeys": [key.to_dict() for key in self.hit_keys],
      "supportingArguments": [relation.get_arguments() for relation in self.relations if relation.supports == True],
      "rebutingArguments": [relation.get_arguments() for relation in self.relations if relation.supports == False],
    }
