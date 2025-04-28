import React from "react";
import { Link } from "react-router-dom";

export const Footer = () => (
	<footer className="bg-light text-center text-lg-start text-muted mt-5">
            <div className="container p-4">
                <div className="row">
                    <div className="col-md-6 mb-4">
                        <h5 className="text-success fw-bold mb-3">AhorrApp</h5>
                        <p className="text-muted">
                            La app que te ayuda a administrar tus gastos, ahorrar y alcanzar tus metas financieras. ¡Empezá a ahorrar hoy!
                        </p>
                    </div>

                    <div className="col-md-3 mb-4">
                        <h6 className="text-success fw-bold mb-3">Enlaces</h6>
                        <ul className="list-unstyled">
                            <li><Link to="/" className="text-decoration-none text-muted">Inicio</Link></li>
                            <li><Link to="/login" className="text-decoration-none text-muted">Ingresar</Link></li>
                            <li><Link to="/signup" className="text-decoration-none text-muted">Registrarse</Link></li>
                        </ul>
                    </div>

                    <div className="col-md-3 mb-4">
                        <h6 className="text-success fw-bold mb-3">Contacto</h6>
                        <ul className="list-unstyled">
                            <li><a href="mailto:info@ahorrapp.com" className="text-decoration-none text-muted">info@ahorrapp.com</a></li>
                            <li><a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-decoration-none text-muted">Instagram</a></li>
                            <li><a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-decoration-none text-muted">Twitter</a></li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className="text-center p-3 bg-success text-white">
                © {new Date().getFullYear()} AhorrApp - Todos los derechos reservados.
            </div>
        </footer>
);
