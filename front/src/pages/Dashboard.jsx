import TripCard from '../components/TripCard.jsx'
import { useState, useEffect } from 'react';

export const Dashboard = () => {
  const [trips, setTrips] = useState([]);
  useEffect(()=> {
  fetch('https://active-giggle-g47x4x7579jjhwxgq-5000.app.github.dev/api/trips')
    .then(res=>res.json())
    .then(data=> setTrips(data))
    .catch(error=>console.error('Error al cargar', error));
  }, []);

  const handleDelete = (id) => {
    setTrips(prevTrips => prevTrips.filter(trip => trip.id !== id));
  };

  return (
    <div>
      <h2>Mis Viajes</h2>
      {trips.map((trip, index)=> (
        <TripCard
        key = {index}
        destination = {trip.destination}
        startDate = {trip.startDate}
        endDate = {trip.endDate}
        onDelete={handleDelete}
        />
      ))}
    </div>
  )
}