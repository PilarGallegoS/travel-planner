from flask import Flask, jsonify, request
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from models import db, User

app = Flask(__name__)
CORS(app, supports_credentials=True)

# Configuración de base de datos
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///mydatabase.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

# Inicializar SQLAlchemy y migraciones
db.init_app(app)
migrate = Migrate(app, db)

# ---------------------
# RUTAS DE AUTENTICACIÓN
# ---------------------

@app.route("/api/register", methods=["POST"])
def register():
    data = request.json
    email = data.get("email")
    password = data.get("password")

    if not email or not password:
        return jsonify({"error": "Faltan datos"}), 400

    if User.query.filter_by(email=email).first():
        return jsonify({"error": "Usuario ya existe"}), 400

    user = User(email=email)
    user.set_password(password)
    db.session.add(user)
    db.session.commit()
    return jsonify({"message": "Usuario registrado correctamente"}), 201


@app.route("/api/login", methods=["POST"])
def login():
    data = request.json
    email = data.get("email")
    password = data.get("password")

    user = User.query.filter_by(email=email).first()

    if user and user.check_password(password):
        return jsonify({"token": user.email}), 200
    else:
        return jsonify({"error": "Credenciales incorrectas"}), 401


# ---------------------
# RUTAS DE VIAJES
# ---------------------

# Datos simulados en memoria
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

@app.route('/api/trips', methods=['POST'])
def add_trip():
    new_trip = request.json
    new_trip["id"] = len(trips) + 1
    new_trip.setdefault("places", [])
    new_trip.setdefault("restaurants", [])
    new_trip.setdefault("transport", [])
    new_trip.setdefault("notes", [])
    trips.append(new_trip)
    return jsonify(new_trip), 201

@app.route('/api/trips/<int:trip_id>', methods=['DELETE'])
def delete_trip(trip_id):
    global trips
    trips = [t for t in trips if t["id"] != trip_id]
    return "", 204

@app.route('/api/trips/<int:trip_id>', methods=['PATCH'])
def update_trip(trip_id):
    updated_data = request.json
    for trip in trips:
        if trip["id"] == trip_id:
            trip.update(updated_data)
            return jsonify(trip), 200
    return jsonify({"error": "Viaje no encontrado"}), 404

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5000)
