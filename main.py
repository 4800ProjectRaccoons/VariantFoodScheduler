from flask import Flask
import json
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route("/")
def hello_world():
    return "<h1>Hello World</h1>"

@app.route("/<name_entry>")
def input_name_db(name_entry):
    return f"<h1>Hello {name_entry}</h1>"

app.run()