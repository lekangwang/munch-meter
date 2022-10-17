import os

# Core libraries
from flask import Flask, flash
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager

# Utility libraries
from dotenv import load_dotenv

# Backend setup
load_dotenv()
app = Flask(__name__)
login_manager = LoginManager()

# Postgres db setup
app.config["SECRET_KEY"] = os.environ["DATABASE_SECRET"]
app.config["SQLALCHEMY_DATABASE_URI"] = os.environ["DATABASE_URL"]
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
db = SQLAlchemy(app)

# Import models
from models.users import User

db.create_all()
db.session.commit()
login_manager.init_app(app)

# Services
from search_service import search_service
from auth import auth

# Services registration
app.register_blueprint(search_service)
app.register_blueprint(auth)

@app.route("/")
def test():
    new_user = User("123@sesamestreet.ca", "password", "america", "2000", "200", "100", "50")
    db.session.add(new_user)
    db.session.commit()
    flash("New User Added")
    print(new_user.check_password("password"))
    return (f"User created!: {str(new_user)}", 200)

if __name__ == "__main__":
    app.run()
