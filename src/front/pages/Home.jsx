import React, { useEffect } from "react"
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { Link } from "react-router-dom";
import starWarsImage from "../assets/img/StarWars.jpg";

export const Home = () => {

	const { store, dispatch } = useGlobalReducer()



	useEffect(() => {

	}, [])

	return (
		<div className="text-center mt-5">
			<h1 className="display-4"> Star wars</h1>
			<p className="lead">
				<img
					src={starWarsImage}
					alt="Star Wars"
					className="img-fluid mb-4"
					style={{ maxWidth: "400px" }}
				/>

			</p>

		</div>
	);
}; 