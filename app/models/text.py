from .db import db

class Text(db.Model):
  __tablename__ = 'texts'

  id = db.Column(db.Integer, primary_key = True)
  title = db.Column(db.String(200), nullable = False)
  content = db.Column(db.Text, nullable = False)
  word_count = db.Column(db.Integer, nullable = False, default=False)
  source = db.Column(db.String(500))
  locked = db.Column(db.Boolean, nullable = False, default=False)
  added_by = db.Column(db.Integer, nullable = False)
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
