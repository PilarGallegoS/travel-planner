import { useState, useEffect } from "react";
import TripCard from "../components/TripCard.jsx";
import NewTripForm from "../components/NewTripForm.jsx";
import "../styles/Dashboard.css";

export const Dashboard = () => {
  const [trips, setTrips] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [loadingId, setLoadingId] = useState(null);

  useEffect(() => {
    fetch("https://effective-giggle-g47x4x7579jjhwxgq-5000.app.github.dev/api/trips")
      .then((res) => res.json())
      .then((data) => setTrips(data))
      .catch((error) => console.error("Error al cargar los viajes:", error));
  }, []);

  const handleDelete = (id) => {
    setLoadingId(id);
    fetch(`https://effective-giggle-g47x4x7579jjhwxgq-5000.app.github.dev/api/trips/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        setTrips((prevTrips) => prevTrips.filter((trip) => trip.id !== id));
      })
      .catch((error) => {
        console.error("Error al eliminar el viaje:", error);
        alert("Hubo un problema al borrar el viaje");
      })
      .finally(() => {
        setLoadingId(null);
      });
  };

  return (
    <div>
      <h2 className="text-center">Mis Viajes</h2>
      <div className="text-center my-4">
        <button className="btn-pastel" onClick={() => setShowForm(true)}>
          + Añadir viaje
        </button>
      </div>

      {!showForm && trips.length === 0 ? (
        <div className="no-trips-container">
          <p className="no-trips-message">No tienes viajes aún.</p>
        </div>
      ) : (
        <div className="dashboard-container">
          {trips.length > 0 && (
            <div className="trip-list">
              {trips.map((trip) => (
                <TripCard
                  key={trip.id}
                  id={trip.id}
                  destination={trip.destination}
                  startDate={trip.startDate}
                  endDate={trip.endDate}
                  onDelete={handleDelete}
                  isDeleting={trip.id === loadingId}
                />
              ))}
            </div>
          )}

          {showForm && (
            <div className="form-panel">
              <NewTripForm
                onNewTrip={(newTrip) => {
                  setTrips((prev) => [...prev, newTrip]);
                  setShowForm(false);
                }}
                onCancel={() => setShowForm(false)}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};
