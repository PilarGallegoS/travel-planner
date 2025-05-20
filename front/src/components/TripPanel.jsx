function TripPanel({destination, startDate, endDate,}) {
    return (
    <div className="card" style={{width: "18rem"}}>
        <img src="https://picsum.photos/150/100" className="card-img-top" alt="..." />
            <div className="card-body">
                <h3 className="card-title"> {destination} </h3>
                <p className="card-date">{startDate} - {endDate}</p>
                <a href="#" className="btn btn-primary">Go to {destination}!</a>
            </div>
         </div>
    );
}
export default TripPanel;