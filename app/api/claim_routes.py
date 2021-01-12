from flask import Blueprint, request
from flask_login import login_required
from app.models import Claim, SupportRebut, Argument, db
from app.forms import CreateClaimForm
from .includes import validation_messages

claim_routes = Blueprint('claims', __name__)


@claim_routes.route('')
def claims():
    claims = Claim.query.all()

    return {"claims": [claim.full_to_dict() for claim in claims]}


@claim_routes.route('/<int:id>')
def claim(id):
    claim = Claim.query.get(id)

    return claim.full_to_dict()


@claim_routes.route('/create', methods=['POST'])
@login_required
def create():
    """
    Creates a claim to use for analysis; claims require at least two arguments (can be more),
    one in support, one in rebut relationships; if hit_keys were provided, then
    """
    form = CreateClaimForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        user_id = form.data['createdByUserId']
        # First: Create Claim (but don't commit)
        claim = Claim(
            assertion=form.data['assertion'],
            notes=form.data['claimNotes'],
            created_by=user_id
            # defaults done for id, created_at
        )
        db.session.add(claim)
        db.session.flush()
        '''
        NOTE: Arguments are coming in as a list of paired lists,
        the pair being the "id" of an existing Argument (or null if needing creation),
        and a "settings" dict for the data being set (null if the "id" was provided); e.g.
        [
            [id, settings], # representative names shown
            [7, None],      # expecting to pull an existing argument
            [None, {"statement": "Blah!", "argumentNotes": "Blah, blah.", "supports": True}]
        ]
        '''
        # Second: Check for and create if needed Arguments (with two other steps within that)
        arguments = form.data['arguments']
        errors = create_arguments(claim.id, user_id, arguments, check_support_and_rebut_exist=True)

        if (not "errors" in errors):
            db.session.commit()
            return claim.full_to_dict()
        else:
            return errors

    return {'errors': validation_messages(form.errors)}

def create_arguments(claim_id, user_id, arguments, check_support_and_rebut_exist=False):
    errors = {}
    found_support = None
    found_rebut = None
    for arg in arguments:
        arg_id = arg[0]
        arg_settings = arg[1]
        valid_statement = lambda arg_settings : (
            ("statement" in arg_settings) and len(arg_settings.statement) <= 200
        )
        valid_support = lambda arg_settings : "supports" in arg_settings

        if (arg_id):
            exists = Argument.query.get(arg_id)
            if (not exists): # An invalid id was given, abort all operations
                raise_error = {f"missing argument id {arg_id}": f"Argument with id {arg_id} was not found in the database. Cannot link to Claim (Argument and any Claim creation aborted). Contact site administrator for help, as invalid id should not have been passed."}
                errors.update(raise_error)
        elif (valid_statement and valid_support):
            argument = Argument(
                statement=arg_settings['statement'],
                notes=arg_settings['argumentNotes'],
                created_by=user_id
                # defaults done for id, created_at
            )
            db.session.add(argument)
            db.session.flush()
            arg[0] = argument.id # store new id back in list for use in just a bit
        else: # An invalid settings object was given
            invalid_statement = {"invalid argument statement":"Argument statement was missing or beyond 200 character limit. Cannot create Argument; please correct and resubmit."}
            errors.update(invalid_statement)
            invalid_support = {"missing argument relation":"Support or Rebut relation not given. Cannot create Support/Rebut relation; please correct and resubmit."}
            errors.update(invalid_support)
        # Link Arguments to Claim via SupportRebut
        if (len(errors) == 0):
            s_r = SupportRebut(
                claim_id=claim_id,
                argument_id=arg[0], # Using list as this number is what is "accurate" based off either existance or creation of argument
                supports=bool(valid_support),
                created_by=user_id
            )
            db.session.add(s_r)
            db.session.flush()
        else:
            break
        # Track if both a support and rebut argument has processed
        if (check_support_and_rebut_exist):
            if (found_support == None and bool(s_r.supports) == True):
                found_support = True
            if (found_rebut == None and bool(s_r.supports) == False):
                found_rebut = True
            if (not (found_support and found_rebut)):
                errors.update({"argument balance": "At least one support and one rebut argument were not set. Please add the missing needed Argument type and resubmit."})

        if (errors):
            db.session.rollback()
            return {'errors': validation_messages(errors)}
        else:
            return {"success": "Arguments added."}


# def add_hit_keys(claim_id, user_id, hit_keys):
