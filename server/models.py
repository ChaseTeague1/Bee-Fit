from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy

from config import db

# Models go here!

workout_exercise = db.Table('workout_exercise',
    db.Column('workout_id', db.Integer, db.ForeignKey('workouts.id'), primary_key=True),
    db.Column('exercise_id', db.Integer, db.ForeignKey('exercises.id'), primary_key=True),
    db.Column('reps', db.Integer, nullable=False) 
)


class User(db.Model, SerializerMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False, unique=True)
    email = db.Column(db.String, nullable=False)

    workouts = db.relationship('Workout', backref='user')

    serialize_rules = ('-workouts',)

class Workout(db.Model, SerializerMixin):
    __tablename__ = 'workouts'

    id = db.Column(db.Integer, primary_key = True)
    title = db.Column(db.String, nullable = False)
    duration = db.Column(db.String, nullable = False)
    description = db.Column(db.String, nullable=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))

    exercises = db.relationship('Exercise', secondary=workout_exercise, backref='workout')
    exercise_names = association_proxy('exercises', 'name')


class Exercise(db.Model, SerializerMixin):
    __tablename__ = 'exercises'

    id = db.Column(db.Integer, primary_key = True)
    name = db.Column(db.String, nullable=False)
    category = db.Column(db.String, nullable=False)
    picture = db.Column(db.String)
    description = db.Column(db.String, nullable=False)

    serialize_rules = ('-workout',)

