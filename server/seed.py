#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc

# Remote library imports
from faker import Faker

# Local imports
from app import app
from models import db, Post, Review, User

fake = Faker()


def create_posts():
    posts = []
    for _ in range(10):
        p = Post(
            title=fake.name(),
            body=fake.sentence(),
            price = fake.random_digit()
        )
        posts.append(p)

    return posts


def create_users():
    users = []
    for _ in range(5):
        u = User(
            name=fake.name(),
            profile_pic=fake.sentence()
        )
        users.append(u)

    return users


def create_reviews(posts, users):
    reviews = []
    for _ in range(20):
        r = Review(
            body=fake.sentence(),
            rating=fake.random_digit(),
            user_id=rc([user.id for user in users]),
            post_id=rc([post.id for post in posts])
        )
        reviews.append(r)

    return reviews


if __name__ == '__main__':

    with app.app_context():
        print("Clearing db...")
        Post.query.delete()
        Review.query.delete()
        User.query.delete()

        print("Seeding posts...")
        posts = create_posts()
        db.session.add_all(posts)
        db.session.commit()

        print("Seeding campers...")
        users = create_users()
        db.session.add_all(users)
        db.session.commit()

        print("Seeding signups...")
        reviews = create_reviews(posts, users)
        db.session.add_all(reviews)
        db.session.commit()

        print("Done seeding!")

