import { useState } from "react";

export default function NewTripForm({ onNewTrip }) {
    const [form, setForm] = useState({
        name: "",
        destination: "",
        startDate: "",
        endDate: "",
        places: [],
        restaurants: [],
        transport: [],
        notes: []
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        fetch("https://effective-giggle-g47x4x7579jjhwxgq-5000.app.github.dev/api/trips", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                ...form,
                places: [],
                restaurants: [],
                transport: [],
                notes: [],
            }),
        })
            .then((res) => res.json())
            .then((newTrip) => {
                onNewTrip(newTrip);
                setForm({
                    name: "",
                    destination: "",
                    startDate: "",
                    endDate: ""
                });
            });
    };

    return (
        <form onSubmit={handleSubmit} className="form-panel-custom">
            <h3>Add new trip</h3>
            <input name="name" placeholder="Nombre del viaje" value={form.name} onChange={handleChange} required />
            <input name="destination" placeholder="Destino" value={form.destination} onChange={handleChange} required />
            <input name="startDate" type="date" value={form.startDate} onChange={handleChange} required />
            <input name="endDate" type="date" value={form.endDate} onChange={handleChange} required />
            <button type="submit" className="btn-pastel">➕ Crear viaje</button>
        </form>
    );
}
