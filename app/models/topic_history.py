from .db import db
from sqlalchemy.orm import relationship

class Topic_History(db.Model):
  __tablename__ = 'topic_histories'

  id = db.Column(db.Integer, primary_key = True)
  updated_by = db.Column(db.ForeignKey('users.id'), nullable = False)
  topic_id = db.Column(db.ForeignKey('topics.id'), nullable = False)
  label = db.Column(db.String(30), nullable = False)
  description = db.Column(db.Text, nullable = False)
  created_at = db.Column(db.DateTime, nullable = False)

  user = relationship('User', back_populates='topic_changes')
  topic = relationship('Topic', back_populates='history')

  def to_dict(self):
    return {
      "id": self.id,
      "updated_by": self.updated_by,
      "topicId": self.topic_id,
      "label": self.label,
      "description": self.description,
      "created": self.created_at,
    }
