import React, {useEffect, useState} from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {

	const [isVisible, setIsVisible] = useState(false);


    useEffect(() => {
        setIsVisible(true);
    }, []);


	return (
	<nav className={`navbar navbar-expand-lg navbar-light bg-light shadow-sm animated-navbar ${isVisible ? "fade-slide" : ""}`}>
		<div className="container">
			<Link className="navbar-brand text-success fw-bold" to="/">
				AhorrApp
			</Link>
			<button 
				className="navbar-toggler" 
				type="button" 
				data-bs-toggle="collapse" 
				data-bs-target="#navbarNav" 
				aria-controls="navbarNav" 
				aria-expanded="false" 
				aria-label="Toggle navigation"
			>
				<span className="navbar-toggler-icon"></span>
			</button>
			<div className="collapse navbar-collapse" id="navbarNav">
				<ul className="navbar-nav ms-auto">
					<li className="nav-item">
						<Link className="nav-link" to="/login">Ingresar</Link>
					</li>
					<li className="nav-item">
						<Link className="nav-link btn btn-success text-white px-3 ms-2" to="/signup">
							Registrarse
						</Link>
					</li>
				</ul>
			</div>
		</div>
	</nav>
	);
};
