from flask.cli import AppGroup
from .users import seed_users, undo_users
from .texts import seed_texts, undo_texts
from .claims import seed_claims, undo_claims
from .claim_histories import seed_claim_histories, undo_claim_histories
from .hit_keys import seed_hit_keys, undo_hit_keys
from .association_claims_hit_keys import seed_association_claims_hit_keys, undo_association_claims_hit_keys

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')

# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    seed_users()
    seed_texts()
    seed_claims()
    seed_claim_histories()
    seed_hit_keys()
    seed_association_claims_hit_keys()

# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_association_claims_hit_keys()
    undo_hit_keys()
    undo_claim_histories()
    undo_claims()
    undo_texts()
    undo_users()
