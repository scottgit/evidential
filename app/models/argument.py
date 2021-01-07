from .db import db
from sqlalchemy.orm import relationship

class Argument(db.Model):
  __tablename__ = 'arguments'

  id = db.Column(db.Integer, primary_key = True)
  statement = db.Column(db.String(250), nullable = False, unique=True)
  notes = db.Column(db.Text)

  relations = relationship('SupportRebut', back_populates='arguments', order_by='asc(SupportRebut.id)')

  def to_dict(self):
    return {
      "id": self.id,
      "statement": self.statement,
      "notes": self.notes
    }

  def full_to_dict(self):
    return {
      "id": self.id,
      "statement": self.statement,
      "notes": self.notes,
      "supports": [relation.get_claims() for relation in self.relations if relation.supports == True],
      "rebuts": [relation.get_claims() for relation in self.relations if relation.supports == False]
    }
