import React, { useEffect } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { Link } from "react-router-dom";
import starWarsImage from "../assets/img/StarWars.jpg";

export const Home = () => {

	const { store, dispatch } = useGlobalReducer();

	useEffect(() => {

	}, []);

	return (
		<div
			className="d-flex align-items-center justify-content-center text-center"
			style={{
				minHeight: "80vh",
				background: "radial-gradient(circle at top, #0b0f2a 0%, #000 60%)",
				color: "white"
			}}
		>
			<div
				className="p-5 rounded-4 shadow-lg"
				style={{
					backdropFilter: "blur(8px)",
					background: "rgba(255,255,255,0.06)",
					border: "1px solid rgba(255,255,255,0.12)",
					maxWidth: "720px"
				}}
			>
				<h1 className="display-3 fw-bold mb-3" style={{ letterSpacing: "3px" }}>
					STAR WARS
				</h1>

				<p className="lead mb-4" style={{ opacity: 0.85 }}>
					Explora la galaxia, conoce personajes y descubre planetas lejanos...
				</p>

				<img
					src={starWarsImage}
					alt="Star Wars"
					className="img-fluid mb-4 rounded-4 shadow"
					style={{ maxWidth: "420px", border: "2px solid rgba(255,255,255,0.15)" }}
				/>

				<div className="d-flex gap-3 justify-content-center mt-2 flex-wrap">
					<Link to="/login" className="btn btn-warning btn-lg px-4">
						Ver Personajes
					</Link>
					<Link to="/login" className="btn btn-outline-light btn-lg px-4">
						Explorar Planetas
					</Link>
				</div>
			</div>
		</div>
	);
};
