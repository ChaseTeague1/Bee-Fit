#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc
import random
# Remote library imports
from faker import Faker

# Local imports
from app import app
from models import db, Order, Item, User, OrderItem

fake = Faker()


def seed_users(n):
    for _ in range(n):
        user = User(
            name=fake.name(),
            email=fake.email(),
        )
        user.password_hash = user.name + 'password'
        db.session.add(user)
    db.session.commit()

def seed_items(n):
    for _ in range(n):
        item = Item(
            name=fake.word(),
            price=round(random.uniform(10.0, 100.0), 2)
        )
        db.session.add(item)
    db.session.commit()

def seed_orders(n):
    user_ids = [user.id for user in User.query.all()]
    item_ids = [item.id for item in Item.query.all()]

    for _ in range(n):
        order = Order(
            created_at=fake.date_this_year(),
        )
        db.session.add(order)
        db.session.commit()

        # Add order items
        num_items = random.randint(1, 5)
        for _ in range(num_items):
            order_item = OrderItem(
                order_id=order.id,
                item_id=random.choice(item_ids),
                quantity=random.randint(1, 10)
            )
            db.session.add(order_item)
    db.session.commit()

with app.app_context():
    db.drop_all()
    db.create_all()
    
    seed_users(10)  # Create 10 users
    seed_items(10)  # Create 10 items
    seed_orders(10)  # Create 10 orders with random order items

