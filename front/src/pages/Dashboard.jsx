import TripCard from '../components/TripCard.jsx'
import { useState, useEffect } from 'react';

export const Dashboard = () => {
  const [trips, setTrips] = useState([]);
  useEffect(()=> {
    fetch('http://localhost:5000/api/trips')
    .then(res=>res.json())
    .then(data=> setTrips(data))
    .catch(error=>console.error('Error al cargar', error));
  }, []);

  return (
    <div>
      <h2>Mis Viajes</h2>
      {trips.map((trip, index)=> (
        <TripCard
        key = {index}
        destination = {trip.destination}
        startDate = {trip.startDate}
        endDate = {trip.endDate}
        />
      ))}
    </div>
  )
}