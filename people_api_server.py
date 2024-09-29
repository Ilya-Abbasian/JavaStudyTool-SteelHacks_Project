from flask import Flask, request, jsonify
from flask_cors import CORS
from pittapi import people

app = Flask(__name__)
CORS(app)

@app.route('/find-person', methods=['GET'])
def find_person():
    query = request.args.get('query')
    if not query:
        return jsonify({"error": "No query provided"}), 400
    
    try:
        results = people.get_person(query)
        return jsonify(results)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(port=5000)