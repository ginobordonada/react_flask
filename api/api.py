import json
from flask import Flask, request
from flask_cors import CORS
app = Flask(__name__, static_folder='../build', static_url_path='/')
CORS(app)


@app.route('/api/parse_json', methods=['POST'])
def index():
    data = request.files['json'].read()
    json_data = json.loads(data)
    urls = {}
    for data in json_data['Browser History']:
        url = data['url'].split('/')[2]
        if url in urls:
            urls[url] = urls[url] + 1
        else:
            urls[url] = 1
    sorted_urls = {k: v for k, v in sorted(urls.items(), key=lambda item: item[1], reverse=True)}
    keys = list(sorted_urls.keys())[:5]
    values = list(sorted_urls.values())[:5]
    response = {
        'keys': keys,
        'values': values
    }
    return response


if __name__ == "__main__":
    app.run()