from .db import db

class Topic_History(db.Model):
  __tablename__ = 'topic_histories'

  id = db.Column(db.Integer, primary_key = True)
  updated_by = db.Column(db.Integer, nullable = False)
  topic_id = db.Column(db.Integer, nullable = False)
  key_name = db.Column(db.String(30), nullable = False)
  description = db.Column(db.Text, nullable = False)
  created_at = db.Column(db.DateTime, nullable = False)


  def to_dict(self):
    return {
      "id": self.id,
      "updated_by": self.updated_by,
      "topicId": self.topic_id,
      "keyName": self.key_name,
      "description": self.description,
      "created": self.created_at,
    }
