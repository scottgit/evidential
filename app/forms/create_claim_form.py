from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, FormField, FieldList, Form
from wtforms.validators import DataRequired, Length, NumberRange, ValidationError

# Inheriting from Form as CSRF is handled in main form, so FlaskForm not needed
class NewArgumentSettings(Form):
    statement = StringField('statement', validators=[DataRequired(), Length(max=250)])
    argumentNotes = StringField('argumentNotes')
    supports = IntegerField('supports', validators=[NumberRange(0,1, "Argument needs support or rebut in relation to claim set.")])


class ExistingArgumentData(Form):
    id = IntegerField('id')
    supports = IntegerField('supports', validators=[NumberRange(0,1, "Argument needs support or rebut in relation to claim set.")])



def argument_list_length_check(form, field):
    existing = len(form['existingArguments'].data)
    print('***LENGTH CHECK***', len(field.data), '+', existing)
    if (len(field.data) + existing) < 2:
        raise ValidationError('Must have at least 2 arguments defined for the claim.')

class CreateClaimForm(FlaskForm):
    assertion = StringField('assertion', validators=[DataRequired(), Length(max=200)])
    claimNotes = StringField('claimNotes')
    createdByUserId = IntegerField('createdByUserId', validators=[DataRequired()])
    newArguments = FieldList(FormField(NewArgumentSettings), validators=[argument_list_length_check])
    existingArguments = FieldList(FormField(ExistingArgumentData))
