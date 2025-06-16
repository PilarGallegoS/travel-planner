import TripCard from '../components/TripCard.jsx'

const myTrips = [
  {
    name: "Viaje a Berlín",
    destination: "Alemania",
    startDate: "2025-06-10",
    endDate: "2025-06-15"
  }
];

export const Dashboard = () => {
  return (
    <div>
      <h2>Mis Viajes</h2>
      {myTrips.map((trip, index)=> (
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