export default function RestaurantCard({name, location}) {
    return (
        <div className ="restaurant-card">
            <h4>{name}</h4>
            <p>Ubicación: {location}</p>

        </div>
    );
}