from .db import db
from sqlalchemy.orm import relationship

class Text(db.Model):
  __tablename__ = 'texts'

  id = db.Column(db.Integer, primary_key = True)
  title = db.Column(db.String(200), nullable = False)
  content = db.Column(db.Text, nullable = False)
  word_count = db.Column(db.Integer, nullable = False)
  source = db.Column(db.String(500))
  locked = db.Column(db.Boolean, nullable = False, default=False)
  added_by = db.Column(db.ForeignKey('user.id'))
  created_at = db.Column(db.DateTime, nullable = False)
  locked_at = db.Column(db.DateTime, nullable = False)

  hits = relationship('Hit', back_populates='text', order_by='Hit.location')
  user = relationship('User', back_populates='texts_added', order_by='desc(Claim_History.id)')

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
      "locked_at": self.locked_at
    }

  def full_to_dict(self):
    return {
      "id": self.id,
      "title": self.title,
      "content": self.content,
      "wordCount": self.word_count,
      "source": self.source,
      "locked": self.locked,
      "addedBy": self.added_by,
      "created": self.created_at,
      "locked_at": self.locked_at,
      "hits": [hit.to_dict() for hit in self.hits]
    }
