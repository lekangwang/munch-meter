from app import db
from flask_login import UserMixin
import bcrypt
from werkzeug.security import generate_password_hash, check_password_hash

class User(UserMixin, db.Model):
    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(50), nullable=False, unique=True)
    password = db.Column(db.String(200), nullable=False, unique=True)
    timezone = db.Column(db.String(50), nullable=False)
    calorie_limit = db.Column(db.Float(50), nullable=False)
    protein_limit = db.Column(db.Float(50), nullable=False)
    fat_limit = db.Column(db.Float(50), nullable=False)
    carb_limit = db.Column(db.Float(50), nullable=False)

    def __init__(self, email, password, timezone, calorie_limit, protein_limit, fat_limit, carb_limit):
        self.email = email
        self.password = generate_password_hash(password)
        self.timezone = timezone
        self.calorie_limit = calorie_limit
        self.protein_limit = protein_limit
        self.fat_limit = fat_limit
        self.carb_limit = carb_limit

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def __repr__(self):
        return f"email: {self.email}, salted password: {self.password}"