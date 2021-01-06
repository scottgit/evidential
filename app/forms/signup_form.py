from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError, EqualTo, Length, Regexp
from app.models import User


def user_exists(form, field):
    print("Checking if user exits", field.data)
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError("User with this email is already registered.")


class SignUpForm(FlaskForm):
    first_name = StringField('firstName', validators=[DataRequired()])
    last_name = StringField('lastName', validators=[DataRequired()])
    email = StringField('email', validators=[DataRequired(), Email(), user_exists])
    confirm_password = StringField('confirmPassword')
    password = StringField('password', validators=[
        DataRequired(),
        Length(min=8, message='Password must be 8 or more characters'), EqualTo('confirmPassword', message='Confirmed password must match password'),
        Regexp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]$", message='Password must contain 1 lower & 1 upper case letter, 1 number, and 1 special character of @$!%*?&')
        ])
