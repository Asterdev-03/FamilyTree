from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

family_tree = []

@app.route('/add_member', methods=['POST'])
def add_member():
    member = request.json
    family_tree.append(member)
    return jsonify(member), 201

@app.route('/get_family', methods=['GET'])
def get_family():
    return jsonify(family_tree), 200

if __name__ == '__main__':
    app.run(debug=True)
