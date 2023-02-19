from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route("/")
def welcome():
    msg = {'message': 'Welcome to the Food Variant Scheduler!'}
    return jsonify(msg)

@app.route("/<user_name>")
def welcome_user(user_name):
    welcome_msg = {'message': f'Welcome {user_name} to a better diet!'}
    return jsonify(welcome_msg)

if __name__ == '__main__':
    app.run(host = '0.0.0.0')