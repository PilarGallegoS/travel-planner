export default function({from, to, transport, duration}) {
    return (
        <div className="transport-card">
            <h4>Ruta</h4>
            <p>Desde: {from} hasta: {to}</p>
            <p>Método de transporte: {transport}</p>
            <p>Duración estimada: {duration}</p>
        </div>
    );
}