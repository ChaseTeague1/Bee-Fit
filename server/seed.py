from faker import Faker
from sqlalchemy import text
from config import db
from models import User, Workout, Exercise
from app import app

fake = Faker()

def seed_users(num_users=10):
    """Seed users with fake data."""
    for _ in range(num_users):
        user = User(
            name=fake.name(),
            email=fake.email()
        )
        db.session.add(user)
    db.session.commit()

def seed_exercises(num_exercises=15):
    """Seed exercises with fake data."""
    for _ in range(num_exercises):
        exercise = Exercise(
            name=fake.word(),
            category=fake.word(),
            picture=fake.image_url(),
            description=fake.text()
        )
        db.session.add(exercise)
    db.session.commit()

def seed_workouts(num_workouts=20):
    """Seed workouts with fake data."""
    users = User.query.all()
    exercises = Exercise.query.all()
    
    for _ in range(num_workouts):
        workout = Workout(
            title=fake.sentence(),
            duration=fake.time(),
            description=fake.text(),
            user_id=fake.random_element(elements=[user.id for user in users])
        )
        db.session.add(workout)
        db.session.flush()  # Ensure workout.id is available

        # Track added exercise combinations to avoid duplicates
        added_combinations = set()

        # Add some exercises to the workout
        for _ in range(fake.random_int(min=1, max=5)):
            exercise = fake.random_element(elements=exercises)
            combination = (workout.id, exercise.id)
            
            if combination not in added_combinations:
                added_combinations.add(combination)
                db.session.execute(
                    text('INSERT INTO workout_exercise (workout_id, exercise_id, reps) VALUES (:workout_id, :exercise_id, :reps)'),
                    {'workout_id': workout.id, 'exercise_id': exercise.id, 'reps': fake.random_int(min=5, max=15)}
                )
    
    db.session.commit()


with app.app_context():
    db.create_all()  # Ensure all tables are created
    seed_users()
    seed_exercises()
    seed_workouts()
    print("Database seeded!")

