#!/usr/bin/env python3

# Standard library imports


# Remote library imports
from flask import request, make_response, session
from flask_restful import Resource
from sqlalchemy.exc import IntegrityError

# Local imports
from config import app, db, api
# Add your model imports
from models import User, Workout, Exercise, workout_exercise

# Views go here!

@app.route('/')
def index():
    return '<h1>Project Server</h1>'

class Users(Resource):
    def get(self):
        users = [user.to_dict() for user in User.query.all()]
        return make_response(users, 200)

api.add_resource(Users, '/users')


class Workouts(Resource):
    def get(self):
        workouts = [workout.to_dict() for workout in Workout.query.all()]
        return make_response(workouts, 200)
    
    def post(self):
        data = request.get_json()

        new_workout = Workout(
            title = data['title'],
            duration = data['duration'],
            description = data['description']
        )
        db.session.add(new_workout)
        db.session.commit()

        return make_response(new_workout.to_dict(), 201)

api.add_resource(Workouts, '/workouts')

class Exercises(Resource):
    def get(self):
        exercises = [exercise.to_dict() for exercise in Exercise.query.all()]
        return make_response(exercises, 200)
    
api.add_resource(Exercises, '/exercises')

if __name__ == '__main__':
    app.run(port=5555, debug=True)

