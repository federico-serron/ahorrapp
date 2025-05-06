import React, { useEffect, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";


export const Navbar = () => {

	const { store, actions } = useContext(Context);
	const role = actions.getUserRoleFromToken();

	const [isVisible, setIsVisible] = useState(false);
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const currentTheme = store.theme;

	const navigate = useNavigate()

	const handleLogout = () => {
		localStorage.removeItem("token");
		setIsLoggedIn(false)
		navigate('/')
	}


	useEffect(() => {
		setIsVisible(true);
	}, []);

	useEffect(() => {
		setIsLoggedIn(!!localStorage.getItem("token"))
	}, [])

	return (
		<nav className={`navbar navbar-expand-lg ${currentTheme === 'dark' ? 'navbar-dark bg-dark' : 'navbar-light bg-light'} shadow-sm animated-navbar ${isVisible ? "fade-slide" : ""}`}>

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
						{localStorage.getItem("token") && (
							<>
								<li className="nav-item">{store.currentUser.is_premium ? <i className="fas fa-gem" style={{ color: "gold" }} title="Usuario Premium"></i> : ""}</li>
								<li className="nav-item">
									<Link className="nav-link" to="/dashboard">Dashboard</Link>
								</li>
								<li className="nav-item">
									<Link className="nav-link" to="/records/add">Registros</Link>
								</li>
							</>
						)}
						{role === "admin" && (
							<>
								<li className="nav-item">
									<Link className="nav-link" to="/admin">Admin</Link>
								</li>
							</>
						)}
						<li className="nav-item">
							{localStorage.getItem("token") ? (
								<button className="nav-link btn btn-danger px-3 ms-2" onClick={handleLogout}>
									Salir
								</button>
							) : (
								<Link className="nav-link" to="/login">Ingresar</Link>
							)}
						</li>
						{!localStorage.getItem("token") && (
							<li className="nav-item">
								<Link className="nav-link btn btn-register px-3 ms-2" to="/signup">
									Registrarse
								</Link>
							</li>
						)}
						<li className="nav-item">
							<button
								className="btn btn-outline-secondary mx-2"
								onClick={() => actions.setTheme(currentTheme === "light" ? "dark" : "light")}
							>
								 {currentTheme === "dark" ? <i className="fas fa-sun" /> : <i className="fas fa-moon" />}
							</button>
						</li>
					</ul>
				</div>
			</div>
		</nav>

	);
};
