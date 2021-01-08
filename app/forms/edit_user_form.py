from typing import Optional
from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import Optional, DataRequired, Email, ValidationError, EqualTo, Length, Regexp
from app.models import User
from .includes import user_exists

class EditUserForm(FlaskForm):
    first_name = StringField('firstName', validators=[Optional()])
    last_name = StringField('lastName', validators=[Optional()])
    email = StringField('email', validators=[Optional(), Email(), user_exists])
    confirm_password = StringField('confirmPassword')
    password = StringField('password', validators=[
        Optional(),
        Length(min=8, message='Password must be 8 or more characters'), EqualTo('confirmPassword', message='Confirmed password must match password'),
        Regexp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])$", message='Password must contain 1 lower & 1 upper case letter, 1 number, and 1 special character of @$!%*?&')
        ])