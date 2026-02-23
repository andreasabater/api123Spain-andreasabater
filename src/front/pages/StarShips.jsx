import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

export const StarShips = () => {
    const { dispatch } = useGlobalReducer();
    const [starships, setStarships] = useState([]);

    const getStarships = async () => {
        try {
            const response = await fetch("https://www.swapi.tech/api/starships");
            const data = await response.json();
            setStarships(data.results);
        } catch (error) {
            console.log("Error fetching starships:", error);
        }
    };

    const handleError = (event) => {
        event.target.src =
            "https://starwars-visualguide.com/assets/img/big-placeholder.jpg";
    };

    useEffect(() => {
        getStarships();
    }, []);

    return (
        <div className="container mt-3">
            <h1 className="text-center mb-4">Starships</h1>

            <div className="row">
                {starships.map((ship) => (
                    <div className="col-12 col-md-3 mb-3" key={ship.uid}>
                        <div className="card h-100 shadow-sm">
                            <img
                                src={`https://github.com/breatheco-de/swapi-images/blob/master/public/images/starships/${ship.uid}.jpg?raw=true`}
                                onError={handleError}
                                className="card-img-top"
                                alt={ship.name}
                                style={{ height: "300px", objectFit: "cover" }}
                            />

                            <div className="card-body d-flex flex-column">
                                <h5 className="card-title">{ship.name}</h5>

                                <Link
                                    to="/starship-details"
                                    className="btn btn-primary mt-auto"
                                    onClick={() =>
                                        dispatch({
                                            type: "starship_details",
                                            payload: ship,
                                        })
                                    }
                                >
                                    Details
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
