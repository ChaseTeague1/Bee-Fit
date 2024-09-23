#!/usr/bin/env python3

# Standard library imports


# Remote library imports
from flask import request, make_response, session
from flask_restful import Resource
from sqlalchemy.exc import IntegrityError

# Local imports
from config import app, db, api
# Add your model imports
from models import User, Workout, Exercise, Workout_Exercise

# Views go here!

@app.route('/')
def index():
    return '<h1>Project Server</h1>'


class WorkoutExercise(Resource):
    def post(self):
        data = request.get_json()
        new_rep = Workout_Exercise(
            workout_id = data['workout_id'],
            exercise_id = data['exercise_id'],
            reps = data['reps']
        )

        db.session.add(new_rep)
        db.session.commit()

        return make_response(new_rep.to_dict(), 201)
    
api.add_resource(WorkoutExercise, '/workoutexercise')

# Login Routes

class Login(Resource):
    def post(self):
        username = request.get_json()['username']
        user = User.query.filter(User.name == username).first()

        session['user_id'] = user.id

        return make_response(user.to_dict(), 200)

api.add_resource(Login, '/login')

class Logout(Resource):
    def delete(self):
        session['user_id'] = None
        return {}, 204

api.add_resource(Logout, '/logout')

class CheckSession(Resource):
    def get(self):
        user_id = session.get('user_id')
        if user_id:
            user = User.query.filter(User.id == user_id).first()
            if user:
                return make_response(user.to_dict(), 200)
        return {}, 401

api.add_resource(CheckSession, '/check_session')

# User Routes

class Users(Resource):
    def get(self):
        users = [user.to_dict() for user in User.query.all()]
        return make_response(users, 200)
    
    def post(self):
        data = request.get_json()

        new_user = User(
            name = data['name'],
            email = data['email']
        )
        db.session.add(new_user)
        db.session.commit()

        return make_response(new_user.to_dict(), 201)

api.add_resource(Users, '/users')



# Workout Routes

class Workouts(Resource):
    def get(self):
        workouts = [workout.to_dict() for workout in Workout.query.all()]
        return make_response(workouts, 200)
    
    def post(self):
        data = request.get_json()
        user_id = session.get('user_id')

        new_workout = Workout(
            title = data['title'],
            duration = data['duration'],
            description = data['description'],
            user_id = user_id,
        )


        db.session.add(new_workout)
        db.session.commit()

        exercise_ids = data.get('selectedExercises', [])
        for exercise_id in exercise_ids:
            exercise = Exercise.query.get(exercise_id)
            if exercise:
                new_workout.exercises.append(exercise)
        
        db.session.commit()


        return make_response(new_workout.to_dict(), 201)

api.add_resource(Workouts, '/workouts')

class WorkoutById(Resource):
    def get(self,id):
        workout = Workout.query.filter(Workout.id == id).first()

        return make_response(workout.to_dict(), 200)

    def delete(self, id):
        workout = Workout.query.filter(Workout.id == id).first()
        
        if workout:
            db.session.delete(workout)
            db.session.commit()

            body = {}
            return make_response(body, 204)
        return {'error':'Workout not found'} , 404
    

    def patch(self, id):
        workout = Workout.query.filter(Workout.id == id).first()
        data = request.get_json()

        for attr in data:
            if attr != 'selectedExercises':  
                setattr(workout, attr, data[attr])

        if 'selectedExercises' in data:
            exercise_ids = data['selectedExercises']
            workout.exercises = []

            for exercise_id in exercise_ids:
                exercise = db.session.get(Exercise, exercise_id)
                if exercise:
                    new_rep = Workout_Exercise(
                        workout_id=workout.id,
                        exercise_id=exercise_id,
                        reps=data.get('reps')
                    )
                    workout.exercises.append(new_rep)

        db.session.commit()

        return make_response(workout.to_dict(), 200)



api.add_resource(WorkoutById, '/workouts/<int:id>')

# Exercise Routes

class Exercises(Resource):
    def get(self):
        exercises = [exercise.to_dict() for exercise in Exercise.query.all()]
        return make_response(exercises, 200)
    
    def post(self):
        data = request.get_json()

        new_exercise = Exercise(
            name = data['name'],
            category = data['category'],
            picture = data['picture'],
            description = data['description'],
        )

        db.session.add(new_exercise)
        db.session.commit()

        return make_response(new_exercise.to_dict(), 201)
    
api.add_resource(Exercises, '/exercises')

class ExerciseById(Resource):
    def get(self, id):
        exercise = Exercise.query.filter(Exercise.id == id).first()
        return make_response(exercise.to_dict(), 200)
    
    def patch(self, id):
        exercise = Exercise.query.filter(Exercise.id == id).first()
        data = request.get_json()

        for attr in data:
            setattr(exercise, attr, data[attr])
        
        try:
            db.session.add(exercise)
            db.session.commit()
            return make_response(exercise.to_dict(), 200)
        except ValueError:
            return {'error': 'Could not find exercise'}
        
    def delete(self, id):
        exercise = Exercise.query.filter(Exercise.id == id).first()
        if exercise:
            db.session.delete(exercise)
            db.session.commit()
            
            body ={}
            return make_response(body, 204)

api.add_resource(ExerciseById, '/exercises/<int:id>')

    


if __name__ == '__main__':
    app.run(port=5555, debug=True)

