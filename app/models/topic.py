from .db import db

class Topic(db.Model):
  __tablename__ = 'topics'

  id = db.Column(db.Integer, primary_key = True)
  key_name = db.Column(db.String(30), nullable = False)
  description = db.Column(db.Text, nullable = False)
  created_at = db.Column(db.DateTime, nullable = False)
  updated_at = db.Column(db.DateTime, nullable = False)

  def to_dict(self):
    return {
      "id": self.id,
      "keyName": self.key_name,
      "description": self.description,
      "created": self.created_at,
      "updated": self.updated_at
    }
