from flask import Flask, request
from flask_login import LoginManager, UserMixin
import requests as r
import os
from search_service import search_service
from dotenv import load_dotenv

app = Flask(__name__)
login_manager = LoginManager()
login_manager.init_app(app)
user = UserMixin()

app.register_blueprint(search_service)
load_dotenv()

app.secret_key = os.environ["SESSION_KEY"]

@app.route("/")
def test():
    print(os.environ["SESSION_KEY"])
    return "Hello"

if __name__ == "__main__":
    app.run()
