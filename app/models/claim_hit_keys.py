from .db import db
from sqlalchemy.orm import relationship
from .mixins.track_updates import TrackUpdates
from .mixins.common_columns import CommonColumns


class ClaimHitKeys(db.Model, CommonColumns, TrackUpdates):
  __tablename__ = 'claim_hit_keys'

  claim_id = db.Column(db.ForeignKey('claims.id'))
  key_id = db.Column(db.ForeignKey('hit_keys.id'))

  # for to_history() keys are for python, and must match attribute key names of the model, so snake-case
  def to_history(self):
    return {
      "claim_id": self.claim_id,
      "key_id": self.key_id,
    }

  # to_dict functions are for javascript, so camel-case keys
  def to_dict(self):
    return {
      "claimId": self.claim_id,
      "keyId": self.key_id,
    }
