from flask import Blueprint, request
from flask_login import login_required
from app.models import Text, db
from app.forms import AddTextForm
from .includes.validation_messages import validation_messages

text_routes = Blueprint('texts', __name__)


@text_routes.route('')
def texts():
    texts = Text.query.all()
    return {"texts": [text.full_to_dict() for text in texts]}


@text_routes.route('/<int:id>')
def text(id):
    text = Text.query.get(id)
    return text.full_to_dict()


@text_routes.route('/upload', methods=['POST'])
@login_required
def upload():
    """
    Creates a text for analysis
    """
    form = AddTextForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        text = Text(
            title=form.data['title'],
            content=form.data['content'],
            word_count=form.data['wordCount'],
            source=form.data['source'],
            created_by=form.data['createdByUserId']
            # defaults done for id, created_at, locked, and locked_at
        )
        db.session.add(text)

        db.session.commit()

        return text.full_to_dict()
    return {'errors': validation_messages(form.errors)}

@text_routes.route('/upload/<int:id>', methods=['POST'])
@login_required
def edit_text(id):
    """
    Edits a text for analysis
    """
    form = AddTextForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        useId = form.data['createdByUserId']
        text = Text.query.get(id)
        print('****USERTEST****', useId, text.created_by, '***LOCK***', not text.locked)
        created_by = text.created_by['id']
        if (text and (not text.locked) and (useId == created_by)):
            text.title = form.data['title'],
            text.content=form.data['content'],
            text.word_count=form.data['wordCount'],
            text.source=form.data['source']
            # only original users can edit, so no need to set created_by
        elif (not text):
            return {'errors': 'Text id mismatch; requested text not found in the database.'}
        elif (text.locked):
            return {'errors': 'Text is locked and cannot be unlocked or edited.'}
        elif (useId == created_by):
            return {'errors': 'Text can only be edited by original creator.'}
        else:
            db.session.rollback()
            return {'errors': 'Unknown error.'}
        print('***UPDATING***')
        db.session.commit()

        return text.full_to_dict()
    print('***SENDING ERROR***', form.errors)
    return {'errors': validation_messages(form.errors)}

@text_routes.route('/delete/<int:id>')
@login_required
def delete(id):
    """
    Deletes unlocked text's (locked cannot be deleted)
    """
    text = Text.query.get(id)
    if (text and not text.locked):
        text.delete()
        db.session.commit()
        return {'message': 'Text deleted'}
    return {'errors': 'Text is locked and cannot be unlocked or deleted.'}


@text_routes.route('/<int:id>/add/<int:claim_id>', methods=['POST'])
@login_required
def add_claim(id, claim_id):
    """
    Creates an association between a text and a claim via an analysis run on hit_keys;
    the very first run of this on a text "locks" the text from editing or deletion
    """
    # TODO
