from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy

from config import db, bcrypt

# Models go here!
class User(db.Model, SerializerMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    email = db.Column(db.String, unique=True, nullable=False)

    orders = db.relationship('Order', backref='customer')

    serialize_rules = ('-orders.customer',)

class Order(db.Model, SerializerMixin):
    __tablename__ = 'orders'

    id = db.Column(db.Integer, primary_key=True)
    created_at = db.Column(db.Date)

    customer_id = db.Column(db.Integer, db.ForeignKey('customers.id'), nullable=False)

    order_items = db.relationship('OrderItem', backref='order')

    serialize_rules = ('-order_items.order',)

class Item(db.Model, SerializerMixin):
    __tablename__ = 'items'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    price = db.Column(db.Integer, nullable=False)

    order_items = db.relationship('OrderItem', backref='item')

    serialize_rules = ('-order_items.product',)

class OrderItem(db.Model, SerializerMixin):
    __tablename__ = 'order_items'

    quantity = db.Column(db.Integer, nullable=False)

    order_id = db.Column(db.Integer, db.ForeignKey('orders.id'), primary_key=True)
    product_id = db.Column(db.Integer, db.ForeignKey('products.id'), primary_key=True)

    serialize_rules = ('-order.order_items', '-product.order_items')