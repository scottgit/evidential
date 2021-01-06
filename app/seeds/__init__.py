from flask.cli import AppGroup
from .users import seed_users, undo_users
from .texts import seed_texts, undo_texts
from .topics import seed_topics, undo_topics
from .topic_histories import seed_topic_histories, undo_topic_histories

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')

# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    seed_users()
    seed_texts()
    seed_topics()
    seed_topic_histories()

# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_topic_histories()
    undo_topics()
    undo_texts()
    undo_users()
