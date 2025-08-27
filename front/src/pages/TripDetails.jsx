import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useUser } from '../context/UserContext.jsx';

import TuristicPlaceCard from '../components/TuristicPlaceCard.jsx';
import RestaurantCard from '../components/RestaurantCard.jsx';
import TransportCard from '../components/TransportCard.jsx';
import BackButton from '../components/BackButton.jsx';

export default function TripDetails() {
  const { id } = useParams();
  const { user } = useUser();
  const [trip, setTrip] = useState(null);
  const [loading, setLoading] = useState(true);

  const [newPlace, setNewPlace] = useState({ name: '', location: '' });
  const [newRestaurant, setNewRestaurant] = useState({ name: '', location: '' });
  const [newTransport, setNewTransport] = useState({ from: '', to: '', transport: '', duration: '' });
  const [newNote, setNewNote] = useState('');

  const [editingField, setEditingField] = useState(null);
  const [editIndex, setEditIndex] = useState(null);
  const [editItem, setEditItem] = useState({});

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

  const handleAdd = (field, newItem, setNewItem) => {
    if (!newItem || Object.values(newItem).some(val => !val || val.trim() === '')) return;

    const formattedItem = typeof newItem === 'string'
      ? newItem
      : { ...newItem, id: Date.now() };

    const updatedList = [...(trip[field] || []), formattedItem];
    updateTrip(field, updatedList);
    setTrip({ ...trip, [field]: updatedList });

    if (typeof newItem === 'string') {
      setNewItem('');
    } else {
      setNewItem(Object.fromEntries(Object.keys(newItem).map(key => [key, ''])));
    }
  };

  const handleDelete = (field, index) => {
    const updatedList = [...trip[field]];
    updatedList.splice(index, 1);
    updateTrip(field, updatedList);
    setTrip({ ...trip, [field]: updatedList });
  };

  const handleEdit = (field, index, item) => {
    setEditingField(field);
    setEditIndex(index);
    setEditItem(item);
  };

  const handleSaveEdit = () => {
    if (!editingField) return;

    const updatedList = [...trip[editingField]];
    updatedList[editIndex] = editItem;

    updateTrip(editingField, updatedList);
    setTrip({ ...trip, [editingField]: updatedList });

    setEditingField(null);
    setEditIndex(null);
    setEditItem({});
  };

  if (loading) return <p>Cargando...</p>;
  if (!trip) return <p>Viaje no encontrado</p>;

  return (
    <div className="container my-4">
      <h2 className="mb-3">{trip.name}</h2>
      <p><strong>De:</strong> {trip.startDate} <strong>a</strong> {trip.endDate}</p>

      {/* TURISTIC PLACES */}
      <section className="mb-4">
        <h4>Lugares turísticos</h4>
        {trip.places?.map((place, i) => (
          <div key={place.id} className="mb-2">
            <TuristicPlaceCard name={place.name} location={place.location} />
            {user && (
              <>
                <button className="btn btn-sm btn-outline-primary me-2" onClick={() => handleEdit('places', i, place)}>✏️ Editar</button>
                <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete('places', i)}>🗑️ Eliminar</button>
              </>
            )}

            {user && editingField === 'places' && editIndex === i && (
              <div className="collapse show mt-2">
                <input
                  className="form-control mb-2"
                  value={editItem.name}
                  onChange={e => setEditItem({ ...editItem, name: e.target.value })}
                  placeholder="Nombre"
                />
                <input
                  className="form-control mb-2"
                  value={editItem.location}
                  onChange={e => setEditItem({ ...editItem, location: e.target.value })}
                  placeholder="Ubicación"
                />
                <button className="btn btn-success btn-sm me-2" onClick={handleSaveEdit}>💾 Guardar</button>
                <button className="btn btn-secondary btn-sm" onClick={() => setEditIndex(null)}>Cancelar</button>
              </div>
            )}
          </div>
        ))}
        {user && (
          <div className="mt-3">
            <input className="form-control mb-2" placeholder="Nombre del lugar" value={newPlace.name} onChange={e => setNewPlace({ ...newPlace, name: e.target.value })} />
            <input className="form-control mb-2" placeholder="Ubicación" value={newPlace.location} onChange={e => setNewPlace({ ...newPlace, location: e.target.value })} />
            <button className="btn btn-primary" onClick={() => handleAdd("places", newPlace, setNewPlace)}>+ Añadir lugar</button>
          </div>
        )}
      </section>

      {/* RESTAURANTS */}
      <section className="mb-4">
        <h4>Restaurantes</h4>
        {trip.restaurants?.map((r, i) => (
          <div key={r.id} className="mb-2">
            <RestaurantCard name={r.name} location={r.location} />
            {user && (
              <>
                <button className="btn btn-sm btn-outline-primary me-2" onClick={() => handleEdit('restaurants', i, r)}>✏️ Editar</button>
                <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete('restaurants', i)}>🗑️ Eliminar</button>
              </>
            )}

            {user && editingField === 'restaurants' && editIndex === i && (
              <div className="collapse show mt-2">
                <input className="form-control mb-2" value={editItem.name} onChange={e => setEditItem({ ...editItem, name: e.target.value })} placeholder="Nombre" />
                <input className="form-control mb-2" value={editItem.location} onChange={e => setEditItem({ ...editItem, location: e.target.value })} placeholder="Ubicación" />
                <button className="btn btn-success btn-sm me-2" onClick={handleSaveEdit}>💾 Guardar</button>
                <button className="btn btn-secondary btn-sm" onClick={() => setEditIndex(null)}>Cancelar</button>
              </div>
            )}
          </div>
        ))}
        {user && (
          <div className="mt-3">
            <input className="form-control mb-2" placeholder="Nombre del restaurante" value={newRestaurant.name} onChange={e => setNewRestaurant({ ...newRestaurant, name: e.target.value })} />
            <input className="form-control mb-2" placeholder="Ubicación" value={newRestaurant.location} onChange={e => setNewRestaurant({ ...newRestaurant, location: e.target.value })} />
            <button className="btn btn-primary" onClick={() => handleAdd("restaurants", newRestaurant, setNewRestaurant)}>+ Añadir restaurante</button>
          </div>
        )}
      </section>

      {/* TRANSPORT */}
      <section className="mb-4">
        <h4>Transporte</h4>
        {trip.transport?.map((t, i) => (
          <div key={i} className="mb-2">
            <TransportCard from={t.from} to={t.to} transport={t.transport} duration={t.duration} />
            {user && (
              <>
                <button className="btn btn-sm btn-outline-primary me-2" onClick={() => handleEdit('transport', i, t)}>✏️ Editar</button>
                <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete('transport', i)}>🗑️ Eliminar</button>
              </>
            )}

            {user && editingField === 'transport' && editIndex === i && (
              <div className="collapse show mt-2">
                <input className="form-control mb-2" value={editItem.from} onChange={e => setEditItem({ ...editItem, from: e.target.value })} placeholder="Desde" />
                <input className="form-control mb-2" value={editItem.to} onChange={e => setEditItem({ ...editItem, to: e.target.value })} placeholder="Hacia" />
                <input className="form-control mb-2" value={editItem.transport} onChange={e => setEditItem({ ...editItem, transport: e.target.value })} placeholder="Medio de transporte" />
                <input className="form-control mb-2" value={editItem.duration} onChange={e => setEditItem({ ...editItem, duration: e.target.value })} placeholder="Duración" />
                <button className="btn btn-success btn-sm me-2" onClick={handleSaveEdit}>💾 Guardar</button>
                <button className="btn btn-secondary btn-sm" onClick={() => setEditIndex(null)}>Cancelar</button>
              </div>
            )}
          </div>
        ))}
        {user && (
          <div className="mt-3">
            <input className="form-control mb-2" placeholder="Desde" value={newTransport.from} onChange={e => setNewTransport({ ...newTransport, from: e.target.value })} />
            <input className="form-control mb-2" placeholder="Hacia" value={newTransport.to} onChange={e => setNewTransport({ ...newTransport, to: e.target.value })} />
            <input className="form-control mb-2" placeholder="Medio de transporte" value={newTransport.transport} onChange={e => setNewTransport({ ...newTransport, transport: e.target.value })} />
            <input className="form-control mb-2" placeholder="Duración" value={newTransport.duration} onChange={e => setNewTransport({ ...newTransport, duration: e.target.value })} />
            <button className="btn btn-primary" onClick={() => handleAdd("transport", newTransport, setNewTransport)}>+ Añadir transporte</button>
          </div>
        )}
      </section>

      {/* NOTES */}
      <section className="mb-4">
        <h4>Notas</h4>
        {trip.notes?.map((note, i) => (
          <div key={i} className="mb-2">
            <p className="mb-1">{note}</p>
            {user && (
              <>
                <button className="btn btn-sm btn-outline-primary me-2" onClick={() => handleEdit('notes', i, note)}>✏️ Editar</button>
                <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete('notes', i)}>🗑️ Eliminar</button>
              </>
            )}

            {user && editingField === 'notes' && editIndex === i && (
              <div className="collapse show mt-2">
                <input className="form-control mb-2" value={editItem} onChange={e => setEditItem(e.target.value)} />
                <button className="btn btn-success btn-sm me-2" onClick={handleSaveEdit}>💾 Guardar</button>
                <button className="btn btn-secondary btn-sm" onClick={() => setEditIndex(null)}>Cancelar</button>
              </div>
            )}
          </div>
        ))}
        {user && (
          <div className="mt-3">
            <input className="form-control mb-2" placeholder="Nueva nota" value={newNote} onChange={e => setNewNote(e.target.value)} />
            <button className="btn btn-primary" onClick={() => handleAdd("notes", newNote, setNewNote)}>+ Añadir nota</button>
          </div>
        )}
      </section>

      <BackButton />
    </div>
  );
}
