import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'

import TuristicPlaceCard from '../components/TuristicPlaceCard.jsx'
import RestaurantCard from '../components/RestaurantCard.jsx'
import TransportCard from '../components/TransportCard.jsx'
import Notes from '../components/Notes.jsx'
import BackButton from '../components/BackButton.jsx'

export default function TripDetails() {
    const { id } = useParams();
    const [trip, setTrip] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`https://effective-giggle-g47x4x7579jjhwxgq-5000.app.github.dev/api/trips`)
            .then(res => res.json())
            .then(data => {
                const foundTrip = data.find(t => t.id === parseInt(id));
                setTrip(foundTrip);
                setLoading(false);
            })
            .catch(err => {
                console.error("Error al cargar el viaje:", err);
                setLoading(false);
            });
    },[id]);

    if(loading) return <p>Cargando...</p>
    if(!trip) return <p>Viaje no encontrado</p>

    return (
        <div className="trip-details">
            <h3>{trip.name}</h3>
            <p><strong>De: {trip.startDate} A:{trip.endDate}</strong></p>
            <section>
                <h3>Turistic places</h3>
                {trip.places?.map((place) => (
                    <TuristicPlaceCard
                        key={place.id}
                        name={place.name}
                        location={place.location} />
                ))}
            </section>
            <section>
                <h3>Restaurants</h3>
                {trip.restaurants?.map((restaurant) => (
                    <RestaurantCard
                        key={restaurant.id}
                        name={restaurant.name}
                        location={restaurant.location}
                    />
                ))}
            </section>
            <section>
                <h3>Transport</h3>
                {trip.transport?.map((route, i) => (
                    <TransportCard
                        key={i}
                        from={route.from}
                        to={route.to}
                        transport={route.transport}
                        duration={route.duration}
                    />
                ))}
            </section>
            <section>
                <h3>Notas</h3>
                {trip.notes?.map((text, i) => (
                    <p key={i}>{text}</p>
                ))}
                <Notes />
            </section>
            <BackButton />
        </div>
    );
}