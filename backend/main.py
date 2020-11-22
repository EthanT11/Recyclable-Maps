from bson.objectid import ObjectId
from flask import Flask, request, jsonify
import pymongo
import json

client = pymongo.MongoClient('mongodb://localhost:27017/')
db = client['markers_db']

try:
    col = db.create_collection(name='markers_col')
except Exception as err:
    # collection already exists
    if "already exists" in err._message:
        col = db['markers_col']
    else:
        print("create_collection() ERROR:", err)
        col = None

app = Flask(__name__)


@app.route('/api/markers', methods=['GET', 'POST', 'DELETE', 'OPTIONS'])
def markers():
    if request.method == 'OPTIONS':
        headers = {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET',
            'Access-Control-Allow-Headers': 'Content-Type',
            'Access-Control-Max-Age': '3600'
        }

        return '', 204, headers

    headers = {
        'Access-Control-Allow-Origin': '*'
    }



    if request.method == 'GET' and col is not None:
        cursor = col.find({})
        response = []
        for document in cursor:
            document['_id'] = str(document['_id'])
            response.append(document)

        return json.dumps(response)

    elif request.method == 'POST' and col is not None:
        req_json = request.get_json()
        if all(x in req_json for x in ['location', 'name', 'description']):
            cursor = col.find({"location": req_json['location']})
            if cursor.count() > 0:
                response = 'Resource already exists', 409, headers
            else:
                col.insert_one(req_json)
                response = 'Success', 200, headers

            return jsonify(response)
        else:
            response = 'Incorrect request format', 400, headers
            return jsonify(response)

    elif request.method == 'DELETE' and col is not None:
        req_json = request.get_json()
        if '_id' in req_json:
            query = {"_id": ObjectId(req_json['_id'])}
            delete = col.delete_one(query)
            if delete.deleted_count > 0:
                response = 'Success', 200, headers
            else:
                response = 'Resource not found', 404, headers

            return jsonify(response)
        else:
            response = 'Incorrect request format', 400, headers
            return jsonify(response)
    else:
        return 'Error with database collection', 400, headers


if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')
