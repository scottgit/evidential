from .db import db
from sqlalchemy.orm import relationship

class Argument(db.Model):
  __tablename__ = 'arguments'

  id = db.Column(db.Integer, primary_key = True)
  statement = db.Column(db.String(250), nullable = False, unique=True)
  notes = db.Column(db.Text)
  created_at = db.Column(db.DateTime, nullable = False)
  updated_at = db.Column(db.DateTime, nullable = False)

  relations = relationship('SupportRebut', back_populates='arguments', order_by='asc(SupportRebut.id)')

  def to_dict(self):
    return {
      "id": self.id,
      "statement": self.statement,
      "notes": self.notes,
      "created": self.created_at,
      "updated": self.updated_at,
    }

  def full_to_dict(self):
    return {
      "id": self.id,
      "statement": self.statement,
      "notes": self.notes,
      "created": self.created_at,
      "updated": self.updated_at,
      "supports": [relation.get_claims() for relation in self.relations if relation.supports == True],
      "rebuts": [relation.get_claims() for relation in self.relations if relation.supports == False]
    }
