from flask import Blueprint, request, jsonify, abort
from flask_login import login_required, logout_user, current_user, login_user
from dotenv import load_dotenv
from app import login_manager, db
from models.users import User
from werkzeug.security import check_password_hash

auth = Blueprint("auth", __name__)
load_dotenv()
login_manager.login_view = "login"

@auth.route('/login', methods=['POST'])
def login():
    # Login route logic goes here
    data = request.get_json()
    # Check if email matches
    existing_user = User.query.filter_by(email=data.get("email")).first()
    if existing_user:
        # Correct password provided
        if existing_user.check_password(data.get("password")):
            login_user(existing_user)
            return jsonify({"status": 200, "message": "login success"})
        return jsonify({"status": 403, "message": "incorrect password"})
    return jsonify({"status": 404, "message": "incorrect email"})


@login_manager.user_loader
def load_user(user_id):
    return User.query.filter_by(id=int(user_id)).first()

@auth.route('/register', methods=['POST'])
def register():
    data = request.get_json()  

    # Check if email already exists
    existing_user = User.query.filter_by(email=data.get("email")).first()

    # email is a new email
    if existing_user == None:
        # check password for uniqueness
        all_users = User.query.all()
        print(all_users)
        password_exists = False
        for user in all_users:
            if user.check_password(data.get("password")):
                password_exists = True
                break
        # password is also new
        if not password_exists:
            # create new user and log them in
            new_user = User(
                email=data.get("email"),
                password=data.get("password"),
                timezone=f'{data.get("country")}/{data.get("city")}',
                calorie_limit=data.get("calories"),
                protein_limit=data.get("proteins"),
                fat_limit=data.get("fats"),
                carb_limit=data.get("carbs"),
            )
            db.session.add(new_user)
            db.session.commit()
            login_user(new_user)
            return jsonify({"status": 200, "message": "user created"})
        # password already taken
        return jsonify({"status": 403, "message": "password taken"})
    # email already taken 
    return jsonify({"status": 403, "message": "email taken"})

@auth.route("/logout", methods=["GET", "POST"])
@login_required
def logout():
    """User log-out logic."""
    logout_user()
    return jsonify({"status": 200, "message": "logout success"})
