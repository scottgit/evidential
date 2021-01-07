from flask.cli import AppGroup
from .users import seed_users, undo_users
from .texts import seed_texts, undo_texts
from .claims import seed_claims, undo_claims
from .change_histories import seed_change_histories, undo_change_histories
from .hit_keys import seed_hit_keys, undo_hit_keys
from .claim_hit_keys import seed_claim_hit_keys, undo_claim_hit_keys

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')

# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    seed_users()
    seed_texts()
    seed_claims()
    seed_hit_keys()
    seed_claim_hit_keys()
    seed_change_histories()

# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_change_histories()
    undo_claim_hit_keys()
    undo_hit_keys()
    undo_claims()
    undo_texts()
    undo_users()
