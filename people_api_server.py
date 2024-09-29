from flask import Flask, request, jsonify
from flask_cors import CORS
from requests_html import HTMLSession

app = Flask(__name__)
CORS(app)

PEOPLE_SEARCH_URL = "https://find.pitt.edu/Search"

def get_person(query):
    payload = {"search": query}
    session = HTMLSession()
    resp = session.post(PEOPLE_SEARCH_URL, data=payload)

    if "Too many people matched your criteria." in resp.text:
        return [{"ERROR": "Too many people matched your criteria."}]

    elements = resp.html.xpath("/html/div/section")
    result = []

    for entry in elements:
        name, *segments = entry.find("span")
        person = {"name": name.text}
        label = None
        for segment in segments:
            if "class" in segment.attrs and "row-label" in segment.attrs["class"]:
                label = segment.text
            elif label:
                if label in person:
                    if not isinstance(person[label], list):
                        person[label] = [person[label]]
                    person[label].append(segment.text)
                else:
                    person[label] = segment.text
        result.append(person)

    if not result:
        return [{"ERROR": "No one found."}]

    return result

@app.route('/api/people', methods=['GET'])
def search_people():
    query = request.args.get('query', '')
    if not query:
        return jsonify({"error": "Query parameter is required"}), 400

    results = get_person(query)
    return jsonify(results)

if __name__ == '__main__':
    app.run(port=5000)