import { useEffect, useState } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

const renderDetails = (details) => {
    const info = {
        model: "Modelo",
        starship_class: "Clase",
        manufacturer: "Fabricante",
        cost_in_credits: "Costo en créditos",
        length: "Longitud",
        crew: "Tripulación",
        passengers: "Pasajeros",
        max_atmosphering_speed: "Velocidad máxima",
        hyperdrive_rating: "Hiperpropulsor",
        MGLT: "MGLT",
        cargo_capacity: "Capacidad de carga",
        consumables: "Consumibles"
    };

    return Object.keys(info).map((key) => (
        <li key={key}>
            <strong>{info[key]}:</strong> {details[key]}
        </li>
    ));
};

export const StarshipDetails = () => {
    const { store } = useGlobalReducer();
    const [starshipDetails, setStarshipDetails] = useState(null);

    const getStarshipDetails = async () => {
        try {
            const response = await fetch(store.currentStarship.url);

            const data = await response.json();
            setStarshipDetails(data.result.properties);
        } catch (error) {
            console.log("Error fetching starship details:", error);
        }
    };

    const handleError = (event) => {
        event.target.src =
            "https://files.slack.com/files-tmb/T0BFXMWMV-F0A0U9PCNHX-bd49729586/big-placeholder_480.jpg";
    };

    useEffect(() => {
        if (store.currentStarship.url) getStarshipDetails();
    }, [store.currentStarship.url]);

    if (!starshipDetails) return <p className="text-center mt-4">Cargando...</p>;

    return (
        <div className="container mt-4">
            <h1 className="text-center mb-4">Detalles de la Nave</h1>

            <div className="row align-items-start">

                <div className="col-12 col-md-4 text-center mb-4">
                    <img
                        alt={store.currentStarship.name}
                        src={`https://github.com/breatheco-de/swapi-images/blob/master/public/images/starships/${store.currentStarship.uid}.jpg?raw=true`}
                        onError={handleError}
                        style={{
                            width: "100%",
                            maxWidth: "300px",
                            height: "300px",
                            objectFit: "cover",
                            borderRadius: "10px",
                        }}
                    />
                </div>

                <div className="col-12 col-md-8">
                    <h2>{store.currentStarship.name}</h2>

                    <ul className="character-list">
                        {renderDetails(starshipDetails)}
                    </ul>
                </div>
            </div>
        </div>
    );
};
