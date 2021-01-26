from api.includes.validation_messages import validation_messages
from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, FormField, FieldList, Form
from wtforms.validators import DataRequired, Length, NumberRange, ValidationError

# Inheriting from Form as CSRF is handled in main form, so FlaskForm not needed
class ArgumentSettings(Form):
    statement = StringField('statement', validators=[DataRequired(), Length(max=250)])
    argumentNotes = StringField('argumentNotes')
    supports = IntegerField('supports', validators=[NumberRange(0,1, "Argument needs support or rebut in relation to claim set.")])


# class ArgumentData(FlaskForm):
#     id = IntegerField('id')
#     settings = FieldList(FormField(ArgumentSettings))
def argument_list_length_check(form, field):
    if len(field.data) < 3:
        raise ValidationError('Must have at least 2 arguments defined')

class CreateClaimForm(FlaskForm):
    assertion = StringField('assertion', validators=[DataRequired(), Length(max=200)])
    claimNotes = StringField('claimNotes')
    createdByUserId = IntegerField('createdByUserId', validators=[DataRequired()])
    arguments = FieldList(FormField(ArgumentSettings), validators=[argument_list_length_check])
