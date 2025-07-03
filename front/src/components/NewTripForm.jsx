import { useState } from "react";

export default function NewTripForm({ onNewTrip }) {
    // Estado para guardar los valores del formulario
    const [form, setForm] = useState({
        name: "",
        destination: "",
        startDate: "",
        endDate: "",
    });

    // Actualiza el estado cada vez que se escribe en un input
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    // Cuando se envía el formulario:
    const handleSubmit = (e) => {
        e.preventDefault(); // Evita que se recargue la página

        // Hace la petición POST al backend
        fetch("https://effective-giggle-g47x4x7579jjhwxgq-5000.app.github.dev/api/trips", {
            method: "POST", 
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                ...form,               // Copiamos lo que el usuario ha escrito
                places: [],            // Añadimos estructuras vacías
                restaurants: [],
                transport: [],
                notes: [],
            }),
        })
            .then((res) => res.json())       // Convertimos la respuesta en JSON
            .then((newTrip) => {
                onNewTrip(newTrip);            // Avisamos al componente padre
                setForm({                      // Limpiamos el formulario
                    name: "",
                    destination: "",
                    startDate: "",
                    endDate: ""
                });
            });
    };
    return (
        <form onSubmit={handleSubmit}>
            <h3>Add new trip</h3>
            <input name="name" placeholder="Nombre del viaje" value={form.name} onChange={handleChange} required />
            <input name="destination" placeholder="Destino" value={form.destination} onChange={handleChange} required />
            <input name="startDate" type="date" value={form.startDate} onChange={handleChange} required />
            <input name="endDate" type="date" value={form.endDate} onChange={handleChange} required />
            <button type="submit">➕ Crear viaje</button>
        </form>
    );
}