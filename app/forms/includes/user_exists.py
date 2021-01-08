from app.models import User
from wtforms.validators import ValidationError

def user_exists(form, field):
    print("Checking if user exits", field.data)
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user and user.deleted:
        raise ValidationError("Account for that email was deactivated.")
    if user:
        raise ValidationError("User with this email is already registered.")
