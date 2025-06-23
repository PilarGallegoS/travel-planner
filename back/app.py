from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app) 

# Datos simulados (en memoria)
trips = [
    {
        "id": 1,
        "name": "Viaje a Berlín",
        "startDate": "2025-05-15",
        "endDate": "2025-05-20",
        "places": [
            { "id": 1, "name": "Puerta de Brandeburgo", "location": "Berlín" }
        ],
        "restaurants": [
            { "id": 1, "name": "Curry 36", "location": "Mehringdamm 36" }
        ],
        "transport": [
            {
                "from": "Hotel",
                "to": "Museo",
                "transport": "Metro",
                "duration": "15 minutos"
            }
        ],
        "notes": ["Reservar entradas"]
    }
]

@app.route('/api/trips', methods=['GET'])
def get_trips():
    return jsonify(trips), 200

@app.route('/api/trips', method=['POST'])
def add_trip():
    new_trip = request.json
    new_trip["id"] = len(trips) + 1
    trips.append(new_trip)
    return jsonify(new_trip), 201

@app.route('/api/trips/<int:trip_id>', method=['DELETE'])
def delete_trip(trip_id):
    global trips
    trips = [t for t in trips if t["id"] != trip_id]
    return "", 204


if __name__ == "__main__":
    app.run(debug=True)