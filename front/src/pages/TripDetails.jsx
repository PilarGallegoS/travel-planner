import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'

import TuristicPlaceCard from '../components/TuristicPlaceCard.jsx'
import RestaurantCard from '../components/RestaurantCard.jsx'
import TransportCard from '../components/TransportCard.jsx'
import BackButton from '../components/BackButton.jsx'

export default function TripDetails() {
    const { id } = useParams();
    const [trip, setTrip] = useState(null);
    const [loading, setLoading] = useState(true);

    const [newPlace, setNewPlace] = useState({ name: '', location: '' });
    const [newRestaurant, setNewRestaurant] = useState({ name: '', location: '' });
    const [newTransport, setNewTransport] = useState({ from: '', to: '', transport: '', duration: '' });
    const [newNote, setNewNote] = useState('');

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
    }, [id]);

    const updateTrip = (field, value) => {
        fetch(`https://effective-giggle-g47x4x7579jjhwxgq-5000.app.github.dev/api/trips/${id}`, {
            method: 'PATCH',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ [field]: value })
        })
            .then(res => res.json())
            .then(updatedTrip => setTrip(updatedTrip))
            .catch(err => console.error(`Error al actualizar ${field}:`, err));

    };

    const handleAddPlace = () => {
        if (!newPlace.name || !newPlace.location) return;

        const updatedPlaces = [...(trip.places || []), { ...newPlace, id: Date.now() }];
        updateTrip("places", updatedPlaces);
        setTrip({ ...trip, places: updatedPlaces });
        setNewPlace({ name: '', location: '' });
    };

    const handleAddRestaurant = () => {
        if (!newRestaurant.name || !newRestaurant.location) return;

        const updatedRestaurants = [...(trip.restaurants || []), { ...newRestaurant, id: Date.now() }];
        updateTrip("restaurants", updatedRestaurants);
        setTrip({ ...trip, restaurants: updatedRestaurants });
        setNewRestaurant({ name: '', location: '' });
    };

    const handleAddTransport = () => {
        if (!newTransport.from || !newTransport.to || !newTransport.transport || !newTransport.duration) return;

        const updatedTransports = [...(trip.transports || []), newTransport];
        updateTrip("transports", updatedTransports);
        setTrip({ ...trip, transports: updatedTransports });
        setNewTransport({ from: '', to: '', transport: '', duration: '' });
    };

    const handleAddNote = () => {
        if (!newNote.trim()) return;

        const updatedNotes = [...(trip.notes || []), newNote]
        updateTrip("notes", updatedNotes);
        setTrip({ ...trip, notes: updatedNotes });
        setNewNote('');
    };

    if (loading) return <p>Cargando...</p>
    if (!trip) return <p>Viaje no encontrado</p>

    return (
        <div className="trip-details">
            <h3>{trip.name}</h3>
            <p><strong>De: {trip.startDate} A: {trip.endDate}</strong></p>

            <section>
                <h3>Turistic places</h3>
                {trip.places?.map((place) => (
                    <TuristicPlaceCard key={place.id} name={place.name} location={place.location} />
                ))}
                <input placeholder="Nombre del lugar" value={newPlace.name} onChange={e => setNewPlace({ ...newPlace, name: e.target.value })} />
                <input placeholder="Ubicación" value={newPlace.location} onChange={e => setNewPlace({ ...newPlace, location: e.target.value })} />
                <button onClick={handleAddPlace}>+ Añadir lugar</button>
            </section>

            <section>
                <h3>Restaurants</h3>
                {trip.restaurants?.map((r) => (
                    <RestaurantCard key={r.id} name={r.name} location={r.location} />
                ))}
                <input placeholder="Nombre del restaurante" value={newRestaurant.name} onChange={e => setNewRestaurant({ ...newRestaurant, name: e.target.value })} />
                <input placeholder="Ubicación" value={newRestaurant.location} onChange={e => setNewRestaurant({ ...newRestaurant, location: e.target.value })} />
                <button onClick={handleAddRestaurant}>+ Añadir restaurante</button>
            </section>

            <section>
                <h3>Transport</h3>
                {trip.transports?.map((t, i) => (
                    <TransportCard key={i} from={t.from} to={t.to} transport={t.transport} duration={t.duration} />
                ))}
                <input placeholder="Desde" value={newTransport.from} onChange={e => setNewTransport({ ...newTransport, from: e.target.value })} />
                <input placeholder="Hacia" value={newTransport.to} onChange={e => setNewTransport({ ...newTransport, to: e.target.value })} />
                <input placeholder="Medio de transporte" value={newTransport.transport} onChange={e => setNewTransport({ ...newTransport, transport: e.target.value })} />
                <input placeholder="Duración" value={newTransport.duration} onChange={e => setNewTransport({ ...newTransport, duration: e.target.value })} />
                <button onClick={handleAddTransport}>+ Añadir transporte</button>
            </section>

            <section>
                <h3>Notas</h3>
                {trip.notes?.map((note, i) => <p key={i}>{note}</p>)}
                <input placeholder="Nueva nota" value={newNote} onChange={e => setNewNote(e.target.value)} />
                <button onClick={handleAddNote}>+ Añadir nota</button>
            </section>

            <BackButton />
        </div>
    );
}