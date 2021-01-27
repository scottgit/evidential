from flask import Blueprint, request
from flask_login import login_required
from app.models import Claim, SupportRebut, Argument, HitKey, ClaimHitKeys, db
from app.forms import CreateClaimForm, NewHitKeys
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



@claim_routes.route('/<int:claimId>/add_hit_keys', methods=['POST'])
def add_keys(claimId):
    claim = Claim.query.get(claimId)

    form = NewHitKeys()
    form['csrf_token'].data = request.cookies['csrf_token']

    for key in request.json['hitKeys']:
        form['hitKeys'].append_entry(key)

    if form.validate_on_submit():
        errors = create_and_link_hit_keys(claim, form.data['createdByUserId'], form.data['hitKeys'])
        if (not "errors" in errors):
            db.session.commit()
            return claim.full_to_dict()
        else:
            db.session.rollback()
            return errors

    return {'errors': validation_messages(form.errors)}

@claim_routes.route('/create', methods=['POST'])
@login_required
def create():
    """
    Creates a claim to use for analysis; claims require at least two arguments (can be more),
    one in support, one in rebut relationships; if hit_keys were provided, then
    """
    form = CreateClaimForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    '''
        The "newArguments" key should come in as an array of objects,
        with statement and argumentNotes being keys.

        The "existingArguments" key should come in as an array of objects
        with an integer being the "id" of an existing Argument

        In both cases, they should have a "supports" value to indicate how the argument
        is to relate to this claim.

        So if argument data is new, newArguments should have these objects:

            {
                statement: "Blah!",
                argumentNotes: "Blah, blah.",
                supports: 1   // See further explanation
            }

        If argument data is existing, existingArguments have these objects:

            {
                id: 7,
                supports: 1
            }

        The "supports" needs to come as a digit 0/1 for false/true so that that wtforms can process it within the array (as apparently Booleans are not supported within a FieldSet). It will be converted to a boolean on DB save.
    '''
    # Build arguments and keys arrays, since form does not take them in automatically
    for arg in request.json['newArguments']:
        form['newArguments'].append_entry(arg)

    for arg in request.json['existingArguments']:
        form['existingArguments'].append_entry(arg)

    for key in request.json['hitKeys']:
        form['hitKeys'].append_entry(key)

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

        # Second: Check for and create if needed Arguments (with two other steps within that)
        arguments = form.data['newArguments'] + form.data['existingArguments']
        errors = create_and_link_arguments(claim.id, user_id, arguments, check_support_and_rebut_exist=True)

        if (not "errors" in errors):
            hit_keys = form.data['hitKeys']
            print("****HK****", hit_keys)
            errors = create_and_link_hit_keys(claim, user_id, hit_keys)
            if (not "errors" in errors):
                db.session.commit()
                return claim.full_to_dict()

        db.session.rollback()
        return errors

    return {'errors': validation_messages(form.errors)}


'''
Helper functions for routes
'''
def create_and_link_arguments(claim_id, user_id, arguments, check_support_and_rebut_exist=False):
    errors = {}
    found_support = None
    found_rebut = None
    for arg in arguments:
        arg_id = arg['id'] if 'id' in arg else False

        if (arg_id):
            argument = Argument.query.get(arg_id)
            if (not argument): # An invalid id was given, abort all operations
                raise_error = {f"missing argument id {arg_id}": [f"Argument with id {arg_id} was not found in the database. Cannot link to Claim (Argument and any Claim creation aborted). Contact site administrator for help, as invalid id should not have been passed."]}
                errors.update(raise_error)
            else:
                argument = argument.to_dict()
        else:
            # Check for exact same argument statement's existence
            argument = Argument.query.filter_by(statement = arg['statement']).first()

            if (argument):
                argument = argument.to_dict()
                supports = SupportRebut.query.filter(SupportRebut.claim_id == claim_id, SupportRebut.argument_id == argument['id']).first()
                if (supports):
                    supports = supports.to_dict()
                # Check for a contradiction in support relation
                if (supports['supports'] != bool(arg['supports'])):
                    support_msg = 'support' if supports['supports'] else 'rebuttal'
                    raise_error = {f"Argument contradiction": [f"Argument statement '{argument['statement']}' already exists as a '{support_msg}' for this claim. Remove this attempt to define and edit the existing argument relation."]}
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
                argument = argument.to_dict()

            arg_id = argument['id'] # store proper id in list for use in just a bit

        # Link Arguments to Claim via SupportRebut
        if (not errors):
            s_r = SupportRebut(
                claim_id=claim_id,
                argument_id=arg_id,
                supports=bool(arg['supports']),
                created_by=user_id
            )

            db.session.add(s_r)
            db.session.flush()
            # Track if both a support and rebut argument has processed
            if (check_support_and_rebut_exist):
                if (found_support == None and s_r.supports == True):
                    found_support = True
                if (found_rebut == None and s_r.supports == False):
                    found_rebut = True
        else:
            break

    # Check if both a support and rebut were found
    if (not errors and not (found_support and found_rebut)):
        errors.update({"argument balance": ["At least one support and one rebut argument were not set. Please add the missing needed Argument type and resubmit."]})
    if (errors):
        db.session.rollback()
        return {"errors": validation_messages(errors)}
    else:
        return {"success": "Arguments added."}


def create_and_link_hit_keys(claim, user_id, hit_keys):
    errors = {}
    for key in hit_keys:
        keyValue = key['key']
        linkKey = HitKey.query.filter(HitKey.key == keyValue).first()

        #Check if key already exists and is already linked to that claim
        if (linkKey and linkKey in claim.hit_keys):
            continue

        #Check if key does not exist, and if so, make it
        if (not linkKey):
            linkKey = HitKey(
                key=keyValue,
                created_by=user_id
            )
            if (not linkKey):
                errors.update({"key creation failure": ["Hit key failed to get created."]})
                break
            else:
                db.session.add(linkKey)
                db.session.flush()

        #Link either existing or new key to the claim
        link = ClaimHitKeys(
                claim_id=claim.id,
                key_id=linkKey.id,
                created_by=user_id
            )
        if (not link):
            errors.update({"key link failure": ["Hit key failed to link to the claim."]})
            break
        else:
            db.session.add(link)

    if (errors):
        db.session.rollback()
        return {"errors": validation_messages(errors)}
    else:
        return {"success": "Keys added."}
