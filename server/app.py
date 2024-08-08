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

if __name__ == '__main__':
    app.run(port=5555, debug=True)

