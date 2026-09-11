import {useState, useEffect} from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSuitcaseRolling, faCheck, faCalendarDays} from "@fortawesome/free-solid-svg-icons";
import {getBusinessTrips} from "./tripsService.js";
import {useWishlist} from "./wishlistContext.jsx";
import {formatTripDate} from "./dateUtils.js";

const imgsFolder = import.meta.env.VITE_IMGS || "items";

function TripList() {
    const [trips, setTrips] = useState([]);

    useEffect(() => {
        getBusinessTrips().then((response) => setTrips(response));
    }, []);

    return (
        <section className="my-4">
            <div className="d-flex align-items-center justify-content-between mb-3">
                <h4 className="mb-0">Business Trips</h4>
                <span className="badge text-bg-secondary">{trips.length} available</span>
            </div>

            {trips.length === 0 ? (
                <p className="alert alert-info">No business trips available at the moment.</p>
            ) : (
                <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 g-4">
                    {trips.map((trip) => (
                        <Trip trip={trip} key={trip.id}/>
                    ))}
                </div>
            )}
        </section>
    );
}

function Trip({trip}) {
    const {id, title, description, startTrip} = trip;
    const {wishlist, dispatch} = useWishlist();
    const alreadyAdded = wishlist.some((item) => item.id === id);

    return (
        <div className="col">
            <div className="card h-100 shadow-sm">
                <img
                    src={`images/${imgsFolder}/${id}.jpg`}
                    className="card-img-top"
                    style={{height: "160px", objectFit: "cover"}}
                    alt={title}
                />
                <div className="card-body d-flex flex-column">
                    <div className="d-flex align-items-center justify-content-between">
                        <h5 className="card-title mb-0">{title}</h5>
                        <span className="badge text-bg-light border">
                            <FontAwesomeIcon icon={faCalendarDays} className="me-1"/>
                            {formatTripDate(startTrip)}
                        </span>
                    </div>
                    <p className="card-text text-muted small flex-grow-1 mt-2">{description}</p>
                    <button
                        type="button"
                        className={`btn btn-sm mt-2 ${alreadyAdded ? "btn-success" : "btn-outline-primary"}`}
                        disabled={alreadyAdded}
                        onClick={() => dispatch({type: "add", trip})}
                    >
                        <FontAwesomeIcon icon={alreadyAdded ? faCheck : faSuitcaseRolling} className="me-2"/>
                        {alreadyAdded ? "Added to wishlist" : "Add to wishlist"}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default TripList;
