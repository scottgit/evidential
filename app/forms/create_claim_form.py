from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, FormField, FieldList
from wtforms.validators import DataRequired, Length, NumberRange

class ArgumentSettings(FlaskForm):
    statment = StringField('statement', validators=[DataRequired(), Length(max=250)])
    argumentNotes = StringField('argumentNotes')
    supports = IntegerField('supports', validators=[DataRequired(), NumberRange(0,1, "Argument needs support or rebut in relation to claim set.")])


class ArgumentData(FlaskForm):
    id = IntegerField('id')
    settings = FieldList(FormField(ArgumentSettings))


class CreateClaimForm(FlaskForm):
    assertion = StringField('assertion', validators=[DataRequired(), Length(max=200)])
    claimNotes = StringField('claimNotes')
    createdByUserId = IntegerField('createdByUserId', validators=[DataRequired()])
    arguments = FieldList(FormField(ArgumentData))
