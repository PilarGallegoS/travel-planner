import { Link } from "react-router-dom";

function TripCard({ id, destination, startDate, endDate, onDelete }) {
  const handleDelete = () => {
    fetch(`https://effective-giggle-g47x4x7579jjhwxgq-5000.app.github.dev/api/trips/${id}`, {
      method: 'DELETE',
    })
      .then(() => {
        // Avisar al padre para que actualice la lista
        if (onDelete) onDelete(id);
      })
      .catch(err => console.error("Error al eliminar:", err));
  };

  return (
    <div className="card" style={{ width: "18rem" }}>
      <img src="https://picsum.photos/150/100" className="card-img-top" alt="..." />
      <div className="card-body">
        <h3 className="card-title">{destination}</h3>
        <p className="card-date">{startDate} - {endDate}</p>
        <Link to={`/trip/${id}`} className="btn btn-primary">Go to {destination}!</Link>
        <button className="btn btn-danger mt-2" onClick={handleDelete}>🗑️ Eliminar</button>
      </div>
    </div>
  );
}

export default TripCard;
