from flask_wtf import FlaskForm
from wtforms import StringField, FormField, FieldList, Form, IntegerField
from wtforms.validators import DataRequired, Length

class NewHitKey(Form):
    key = StringField('key', validators=[DataRequired(), Length(max=30)])

class NewHitKeys(FlaskForm):
    createdByUserId = IntegerField('createdByUserId', validators=[DataRequired()])
    hitKeys = FieldList(FormField(NewHitKey))
