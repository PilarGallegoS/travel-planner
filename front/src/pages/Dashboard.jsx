import { useState, useEffect } from "react";
import TripCard from "../components/TripCard.jsx";
import NewTripForm from "../components/NewTripForm.jsx";

import '../styles/Dashboard.css'

export const Dashboard = () => {
  const [trips, setTrips] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [loadingId, setLoadingId] = useState(null); // Para saber qué viaje está borrando

  useEffect(() => {
    fetch("https://active-giggle-g47x4x7579jjhwxgq-5000.app.github.dev/api/trips")
      .then((res) => res.json())
      .then((data) => setTrips(data))
      .catch((error) => console.error("Error al cargar los viajes:", error));
  }, []);

  const handleNewTrip = (NewTripForm)=> {
    setTrips((prevTrips)=>[...prevTrips, NewTripForm])
  }

  const handleDelete = (id) => {
    setLoadingId(id); // Marcar el viaje como "en proceso de borrado"

    fetch(`https://active-giggle-g47x4x7579jjhwxgq-5000.app.github.dev/api/trips/${id}`, {
      method: "DELETE"
    })
      .then(() => {
        setTrips((prevTrips) => prevTrips.filter((trip) => trip.id !== id));
      })
      .catch((error) => {
        console.error("Error al eliminar el viaje:", error);
        alert("Hubo un problema al borrar el viaje");
      })
      .finally(() => {
        setLoadingId(null); // Quitar el estado de borrando
      });
  };

  return (
    <div>
      <h2>Mis Viajes</h2>
      <button onClick={()=> setShowForm(true)}>Añadir viaje</button>

      <div className="dashboard-container">
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
    </div>
  );
};