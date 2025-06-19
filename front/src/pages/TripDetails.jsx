import TuristicPlaceCard from '../components/TuristicPlaceCard.jsx'
import RestaurantCard from '../components/RestaurantCard.jsx'
import TransportCard from '../components/TransportCard.jsx'
import Notes from '../components/Notes.jsx'
import BackButton from '../components/BackButton.jsx'

const firstTrip = {
    name: 'Viaje a Berlín',
    startDate: '15/05/25',
    endDate: '20/05/25',
    places: [
        { id: 1, name: "Puerta de Brandeburgo", location: "Pariser Platz, Berlín" }
    ],
    restaurants: [
        { id: 1, name: 'Example Name', location: 'Exaple Location' },
        { id: 2, name: 'Example 2', location: 'Exaple Loc2' },
    ],
    transports: [{
        from: "Hotel Berlín",
        to: "Museo de Pérgamo",
        transport: "Metro (U-Bahn)",
        duration: "15 minutos"
    },
    {
        from: "Museo de Pérgamo",
        to: "Restaurante Curry 36",
        transport: "Bus",
        duration: "10 minutos"
    }
    ],
    notes: ["Reservar entradas del museo", "Llevar paraguas por si llueve"]
};

export default function TripDetails() {
    return (
        <div className="trip-details">
            <h3>{firstTrip.name}</h3>
            <p><strong>De: {firstTrip.startDate} A:{firstTrip.endDate}</strong></p>
            <section>
                <h3>Turistic places</h3>
                {firstTrip.places.map((place) => (
                    <TuristicPlaceCard
                        key={place.id}
                        name={place.name}
                        location={place.location} />
                ))}
            </section>
            <section>
                <h3>Restaurants</h3>
                {firstTrip.restaurants.map((restaurant) => (
                    <RestaurantCard
                        key={restaurant.id}
                        name={restaurant.name}
                        location={restaurant.location}
                    />
                ))}
            </section>
            <section>
                <h3>Transport</h3>
                {firstTrip.transport.map((route, i)=>(
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
                {firstTrip.notes.map((text,i)=>(
                    <p key={i}>{text}</p>
                ))}
                <Notes/>
            </section>
            <BackButton/>
        </div>
    );
}