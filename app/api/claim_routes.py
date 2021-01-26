from flask import Blueprint, request
from flask_login import login_required
from app.models import Claim, SupportRebut, Argument, db
from app.forms import CreateClaimForm
from .includes.validation_messages import validation_messages

claim_routes = Blueprint('claims', __name__)


@claim_routes.route('')
def get_claims():
    claims = Claim.query.all()

    return {"claims": [claim.full_to_dict() for claim in claims]}


@claim_routes.route('/<int:id>')
def get_claim(id):
    claim = Claim.query.get(id)

    return claim.full_to_dict()

'''
@claim_routes.route('/<int:claimId>/add_hit_keys')
def add_key(claimId):
    claim = Claim.query.get(claimId)
'''


@claim_routes.route('/create', methods=['POST'])
@login_required
def create():
    """
    Creates a claim to use for analysis; claims require at least two arguments (can be more),
    one in support, one in rebut relationships; if hit_keys were provided, then
    """
    arg_list = request.json['arguments']


    form = CreateClaimForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    # form['arguments'].pop_entry()
    for arg in arg_list:
        form['arguments'].append_entry(arg)
    # form['arguments'].data = arg_list
    # setattr(form,'arguments',arg_list)
    print("*****FORM ARGS****", list(form['arguments'].entries))
    for entry in form['arguments'].entries:
        print('***ARGS***', entry.data)
    # form.data["arguments"] = arg_list
    # print("*****FORM ARGS SET****", form.data['arguments[]'])

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
        NOTE: The "arguments" should be coming in as an array of integers and/or objects,
            an integer being the "id" of an existing Argument,
            and a object for the data being set on a new Argument.
            So if argument data is new, it should be sending this object:

                {
                    statement: "Blah!",
                    argumentNotes: "Blah, blah.",
                    supports: 1   // See further explanation
                }

            The "supports" needs to come as a digit 0/1 for false/true so that that wtforms can process it within the array (as apparently Booleans are not supported within a FieldSet). It will be converted to a boolean on DB save.

            So a final example of what an "arguments" array might look like:
            [
                7,      // expecting to pull an existing argument
                { "statement": "Blah!",
                    "argumentNotes": "Blah, blah.",
                    "supports": 1
                },      // setting up a new argument
                3,      // expecting to pull an existing argument
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


'''
Helper functions for routes
'''
def create_arguments(claim_id, user_id, arguments, check_support_and_rebut_exist=False):
    errors = {}
    found_support = None
    found_rebut = None
    print('*****arguments*****', arguments)
    for arg in arguments:
        arg_id = arg.id if 'id' in arg else False
        # valid_statement = lambda arg_settings : (
        #     ("statement" in arg_settings) and len(arg_settings.statement) <= 200
        # )
        # valid_support = lambda arg_settings : "supports" in arg_settings

        if (arg_id):
            argument = Argument.query.get(arg_id)
            if (not argument): # An invalid id was given, abort all operations
                raise_error = {f"missing argument id {arg_id}": [f"Argument with id {arg_id} was not found in the database. Cannot link to Claim (Argument and any Claim creation aborted). Contact site administrator for help, as invalid id should not have been passed."]}
                errors.update(raise_error)
        else:
            argument = Argument(
                statement=arg['statement'],
                notes=arg['argumentNotes'],
                created_by=user_id
                # defaults done for primary key id and created_at
            )
            db.session.add(argument)
            db.session.flush()
            arg_id = argument.id # store new id back in list for use in just a bit

        # Link Arguments to Claim via SupportRebut
        if (len(errors) == 0):
            s_r = SupportRebut(
                claim_id=claim_id,
                argument_id=arg_id,
                supports=bool(arg['supports']),
                created_by=user_id
            )
            db.session.add(s_r)
            db.session.flush()
        else:
            break
    # Track if both a support and rebut argument has processed
    if (check_support_and_rebut_exist):
        if (found_support == None and s_r.supports == True):
            found_support = True
        if (found_rebut == None and s_r.supports == False):
            found_rebut = True
        if (not (found_support and found_rebut)):
            errors.update({"argument balance": ["At least one support and one rebut argument were not set. Please add the missing needed Argument type and resubmit."]})

    if (errors):
        db.session.rollback()
        return {"errors": validation_messages(errors)}
    else:
        return {"success": "Arguments added."}


# def add_hit_keys(claim_id, user_id, hit_keys):
