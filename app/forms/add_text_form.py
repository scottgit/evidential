from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, Length


class AddTextForm(FlaskForm):
    title = StringField('title', validators=[DataRequired(), Length(max=200)]),
    content = StringField('content', validators=[DataRequired()])
    wordCount = IntegerField('wordCount', validators=[DataRequired()])
    source = StringField('source', validators=[Length(max=500)])
    createdByUserId = IntegerField('createdByUserId', validators=[DataRequired()])
