import React from "react";
import logo from "../../img/logo.png";

const Signup = () => {
  return (
    <div className="container d-flex justify-content-center align-items-center mt-5">
      <div className="card shadow-lg w-100" style={{ maxWidth: "500px" }}>
        <div className="text-center mt-3">
          <img 
            src={logo} 
            alt="Logo de AhorrApp" 
            className="img-fluid" 
            style={{ maxHeight: "220px", objectFit: "contain" }}
          />
        </div>
        <div className="card-body">
          <h2 className="card-title text-center mb-4">Crear cuenta</h2>
          <form>
            <div className="mb-3">
              <label htmlFor="username" className="form-label">
                Nombre de usuario
              </label>
              <input
                type="text"
                className="form-control"
                id="username"
                placeholder="Ingresá tu nombre de usuario"
              />
            </div>

            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Correo electrónico
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="ejemplo@correo.com"
              />
            </div>

            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Contraseña
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="Mínimo 8 caracteres"
              />
            </div>

            <div className="mb-3">
              <label htmlFor="confirmPassword" className="form-label">
                Confirmar contraseña
              </label>
              <input
                type="password"
                className="form-control"
                id="confirmPassword"
                placeholder="Repetí la contraseña"
              />
            </div>

            <button type="submit" className="btn btn-primary w-100">
              Registrarse
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
