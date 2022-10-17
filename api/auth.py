from flask import Blueprint, request, jsonify
from flask_login import login_required, logout_user, current_user, login_user
from dotenv import load_dotenv
from app import login_manager, db
from models.users import User

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
        print(data.get("password"))
        if existing_user.check_password(data.get("password")):
            login_user(existing_user)
            return jsonify({"status": 200, "data": {"message": "login success"}})
        return jsonify({"status": 403, "data": {"message": "incorrect password"}})
    return jsonify({"status": 404, "data": {"message": "incorrect email"}})


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
        existing_password = User.query.filter_by(email=data.get("password")).first()
        # password is also new
        if existing_password == None:
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
            # Create a new user and log them in
            db.session.commit()
            print(login_user(new_user))
            if new_user.is_authenticated:
                print("logged in")
            return "new user created", 200
        # password already taken
        return "password taken", 403
    # email already taken 
    return "email taken", 403

@auth.route("/logout", methods=["GET", "POST"])
@login_required
def logout():
    """User log-out logic."""
    logout_user()
    return jsonify({"status": 200, "data": {"message": "logout success"}})
