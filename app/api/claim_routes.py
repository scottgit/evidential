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
    one in support, one in rebut relationships
    """
    form = CreateClaimForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        use_id = form.data['createdByUserId']
        # First: Create Claim (but don't commit)
        claim = Claim(
            assertion=form.data['assertion'],
            notes=form.data['claimNotes'],
            created_by=use_id
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
            [None, {"statement": "Blah!", "notes": "Blah, blah.", "support": True}]
        ]
        '''
        # Second: Check for and create if needed Arguments
        arguments = form.data['arguments']

        for arg in arguments:
            arg_id = arg[0]
            arg_settings = arg[1]
            valid_statement = lambda (arg_settings) : (
                ("statement" in arg_settings) and len(arg_settings.statement) <= 200
            )
            valid_support = lambda (arg_settings) : "support" in arg_settings

            if (arg_id):
                exists = Argument.query.get(arg_id)
                if (not exists): # An invalid id was given, abort all operations
                    db.session.rollback()
                    return {"errors": f"Argument with id {arg_id} was not found in the database. Cannot link to new claim. Check front end for proper passing of id."}
            elif (valid_statement and valid_support):
                argument = Argument(
                    statement=arg[]['statement'],
                    notes=form.data['argumentNotes'],
                    created_by=use_id
                    # defaults done for id, created_at
                )
                db.session.add(argument)
                db.session.flush()
                arg[0] = argument.id # store new id back in list for use in just a bit
            else: # An invalid settings object was given
                invalid_statement = 'Argument statement was missing or beyond 200 character limit. Cannot create Argument.'
                invalid_support = 'Support or Rebut relation not given. Cannot create Support/Rebut relation.'
                error_msg = f"{(valid_statement or invalid_statement) and (valid_support or invalid_support)} Cannot create new Claim."
                db.session.rollback()
                return {"errors": error_msg}
            # Third (within step 2): Link Arguments to Claim via SupportRebut
            s_r = SupportRebut(
                claim_id=claim.id,
                argument_id=arg[0], # Using list as this number is what is "accurate" based off either existance or creation of argument
                supports=bool(valid_support),
                created_by=use_id
            )
            db.session.add(s_r)

        db.session.commit()
        return claim.full_to_dict()
    return {'errors': validation_messages(form.errors)}
