from .db import db
from sqlalchemy.orm import relationship

class Hit(db.Model):
  __tablename__ = 'hits'

  id = db.Column(db.Integer, primary_key = True)
  text_id = db.Column(db.ForeignKey('texts.id'), nullable = False)
  key_id = db.Column(db.ForeignKey('hit_keys.id'), nullable = False)
  claim_id = db.Column(db.ForeignKey('claims.id'), nullable = False)
  location = db.Column(db.Integer, nullable = False)
  word_count = db.Column(db.Integer, nullable = False)
  custom_key = db.Column(db.String(500), default='')
  grouped_id = db.Column(db.Integer, default=None)
  created_at = db.Column(db.DateTime, nullable = False)
  updated_at = db.Column(db.DateTime, nullable = False)

  def to_dict(self):
    return {
      "id": self.id,
      "title": self.title,
      "content": self.content,
      "wordCount": self.word_count,
      "source": self.source,
      "locked": self.locked,
      "addedBy": self.added_by,
      "created": self.created_at,
      "updated": self.updated_at
    }
