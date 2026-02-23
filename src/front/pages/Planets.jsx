import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

export const Planets = () => {
    const { dispatch } = useGlobalReducer();
    const [planets, setPlanets] = useState([]);

    const getPlanets = async () => {
        try {
            const response = await fetch("https://www.swapi.tech/api/planets");
            const data = await response.json();
            setPlanets(data.results);
        } catch (error) {
            console.log("Error fetching planets:", error);
        }
    };

    const handleError = (e) => {
        e.target.src = "https://starwars-visualguide.com/assets/img/big-placeholder.jpg";
    };

    useEffect(() => {
        getPlanets();
    }, []);

    return (
        <div className="container mt-3">
            <h1 className="text-center mb-4">Planets</h1>

            <div className="row">
                {planets.map((planet) => (
                    <div className="col-12 col-md-3 mb-3" key={planet.uid}>
                        <div className="card h-100 shadow-sm">
                            <img
                                src={`https://github.com/breatheco-de/swapi-images/blob/master/public/images/planets/${planet.uid}.jpg?raw=true`}
                                onError={handleError}
                                className="card-img-top"
                                alt={planet.name}
                                style={{ height: "300px", objectFit: "cover" }}
                            />

                            <div className="card-body d-flex flex-column">
                                <h5 className="card-title">{planet.name}</h5>

                                <Link
                                    to="/planet-details"
                                    className="btn btn-primary mt-auto"
                                    onClick={() => dispatch({ type: "planet_details", payload: planet })
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
