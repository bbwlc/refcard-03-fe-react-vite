import "bootstrap/dist/css/bootstrap.min.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faHeart, faTrashCan} from "@fortawesome/free-solid-svg-icons";
import {useWishlist} from "./wishlistContext.jsx";
import {formatTripDate} from "./dateUtils.js";

export default function Wishlist() {
    const {wishlist, dispatch} = useWishlist();

    return (
        <section className="my-4">
            <div className="d-flex align-items-center justify-content-between mb-3">
                <h4 className="mb-0">
                    <FontAwesomeIcon icon={faHeart} className="text-danger me-2"/>
                    My Wishlist
                    <span className="badge text-bg-secondary ms-2">{wishlist.length}</span>
                </h4>
                <button
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => dispatch({type: "empty"})}
                    disabled={wishlist.length === 0}
                >
                    Clear all
                </button>
            </div>

            {wishlist.length === 0 ? (
                <p className="alert alert-info">Your wishlist is empty. Add a trip to get started.</p>
            ) : (
                <div className="table-responsive">
                    <table className="table table-hover align-middle">
                        <thead className="text-muted">
                            <tr>
                                <th scope="col">Trip</th>
                                <th scope="col">Dates</th>
                                <th scope="col">Description</th>
                                <th scope="col" className="text-end">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {wishlist.map((item) => (
                                <Wish item={item} key={item.id}/>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </section>
    );
}

function Wish({item}) {
    const {dispatch} = useWishlist();
    const {id, title, description, startTrip, endTrip} = item;

    return (
        <tr>
            <td>
                <div className="d-flex align-items-center gap-2">
                    <img
                        src={`images/items/${id}.jpg`}
                        className="img-thumbnail"
                        style={{width: "56px", height: "56px", objectFit: "cover"}}
                        alt={title}
                    />
                    <span className="fw-semibold">{title}</span>
                </div>
            </td>
            <td>
                <span className="badge text-bg-light border d-block mb-1">{formatTripDate(startTrip)}</span>
                <span className="badge text-bg-light border">{formatTripDate(endTrip)}</span>
            </td>
            <td className="text-muted small">{description}</td>
            <td className="text-end">
                <button
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => dispatch({type: "deleteItem", id})}
                >
                    <FontAwesomeIcon icon={faTrashCan} className="me-1"/>
                    Remove
                </button>
            </td>
        </tr>
    );
}
