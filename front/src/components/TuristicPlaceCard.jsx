export default function TuristicPlaceCard ({name, location}) {
    return (
        <div className ="turistic-place">
            <h4>{name}</h4>
            <p>Ubicación: {location}</p>

        </div>
    );
}