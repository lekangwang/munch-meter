from app import db
from flask_login import UserMixin
import bcrypt

class User(UserMixin, db.Model):
    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(50))
    password = db.Column(db.String(200))
    timezone = db.Column(db.String(50))
    calorie_limit = db.Column(db.Float(50))
    protein_limit = db.Column(db.Float(50))
    fat_limit = db.Column(db.Float(50))
    carb_limit = db.Column(db.Float(50))

    def __init__(self, email, password, timezone, calorie_limit, protein_limit, fat_limit, carb_limit):
        self.email = email
        self.password = self.salt_password(password).decode("utf-8")
        self.timezone = timezone
        self.calorie_limit = calorie_limit
        self.protein_limit = protein_limit
        self.fat_limit = fat_limit
        self.carb_limit = carb_limit

    def salt_password(self, password):
        return bcrypt.hashpw(password.encode("utf-8"), bcrypt.gensalt())

    def check_password(self, password):
        return bcrypt.checkpw(password.encode("utf-8"), self.password.encode("utf-8"))

    def __repr__(self):
        return f"email: {self.email}, salted password: {self.password}"