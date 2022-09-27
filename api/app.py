from flask import Flask, flash
from flask_sqlalchemy import SQLAlchemy
import os
from search_service import search_service
# Utility libraries
from dotenv import load_dotenv
import bcrypt

load_dotenv()
app = Flask(__name__)

# Postgres Database Setup
app.config["SECRET_KEY"] = os.environ["DATABASE_SECRET"]
app.config["SQLALCHEMY_DATABASE_URI"] = os.environ["DATABASE_URL"]
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
db = SQLAlchemy(app)

app.register_blueprint(search_service)

# Import models
from models.users import User

@app.route("/")
def test():
    new_user = User("kangkanglw", "123@sesamestreet.ca", bcrypt.hashpw("12345".encode("utf-8"), bcrypt.gensalt()))
    db.session.add(new_user)
    db.session.commit()
    flash("New User Added")
    return (f"User created!: {str(new_user)}", 200)

if __name__ == "__main__":
    app.run()
