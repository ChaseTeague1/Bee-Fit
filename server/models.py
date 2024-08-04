from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy

from config import db, bcrypt

# Models go here!
class User(db.Model, SerializerMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key = True)
    name = db.Column(db.String, nullable=False)
    profile_pic = db.Column(db.String)
    _password_hash = db.Column(db.String)
    created_at = db.Column(db.DateTime)

    reviews = db.relationship('Review', cascade='all,delete', backref='user')


class Post(db.Model, SerializerMixin):
    __tablename__ = 'posts'

    id = db.Column(db.Integer, primary_key = True)
    title = db.Column(db.String, nullable=False)
    body = db.Column(db.String)
    price = db.Column(db.Integer, nullable=False)
    created_at = db.Column(db.DateTime)

    reviews = db.relationship('Review', cascade='all,delete', backref='post')


class Review(db.Model, SerializerMixin):
    __tablename__ = 'reviews'

    id = db.Column(db.Integer, primary_key = True)
    body = db.Column(db.String, nullable=False)
    rating = db.Column(db.Integer)
    created_at = db.Column(db.DateTime)

    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    post_id = db.Column(db.Integer, db.ForeignKey('posts.id'))