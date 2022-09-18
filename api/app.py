from flask import Flask, request
import requests as r
import os
from search_service import search_service
from dotenv import load_dotenv

app = Flask(__name__)
app.register_blueprint(search_service)
load_dotenv()

# @app.route("/")
# def test():
#     return f"{os.environ['FOOD_API_KEY']}"

if __name__ == "__main__":
    app.run()
