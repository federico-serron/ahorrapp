import React, { useContext, useState, useEffect } from "react";
import { Navigate, Outlet, Link, useLocation } from "react-router-dom";
import { Context } from "../store/appContext";
import logo from "../../img/logo.png";
import HeaderCardAdmin from "./HeaderCardAdmin.jsx";
import HeaderInfoCard from "./HeaderInfoCard.jsx";
import CalculadoraAhorro from "./CalculadoraAhorro.jsx";
import RadialProgressChart from "./RadialProgressChart.jsx";
import "../../styles/index.css";

const AdminLayout = () => {
  const { store, actions } = useContext(Context);
  const location = useLocation();
  const [role, setRole] = useState(null);

  useEffect(() => {
    // Simulación de carga de rol
    const simulatedRole = "admin";
    setTimeout(() => setRole(simulatedRole), 500);
  }, []);

  if (role === null)
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        Cargando...
      </div>
    );
  if (role !== "admin") return <Navigate to="/unauthorized" />;

  const isActive = (path) =>
    location.pathname === path || location.pathname.startsWith(path);

  return (
    <div className="d-flex vh-100">
      {/* Sidebar de Escritorio */}
      <div className="d-none d-md-flex flex-column bg-success text-white p-3" style={{ width: "220px" }}>
        <div className="sidebar-logo mb-4">
          <img src={logo} alt="Logo" className="logo img-fluid" />
        </div>
        <h4 className="mb-4">Admin Panel</h4>
        <ul className="nav flex-column">
          <li className="nav-item">
            <Link
              to="/admin"
              className={`nav-link text-white d-flex align-items-center ${isActive("/admin") ? "fw-bold active-sidebar-link" : ""}`}
            >
              {isActive("/admin") && <i className="me-2 fas fa-tachometer-alt"></i>}
              Dashboard
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/admin/users"
              className={`nav-link text-white d-flex align-items-center ${isActive("/admin/users") ? "fw-bold active-sidebar-link" : ""}`}
            >
              {isActive("/admin/users") && <i className="me-2 fas fa-users"></i>}
              Usuarios
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/admin/categories"
              className={`nav-link text-white d-flex align-items-center ${isActive("/admin/categories") ? "fw-bold active-sidebar-link" : ""}`}
            >
              {isActive("/admin/categories") && <i className="me-2 fas fa-tags"></i>}
              Categorías
            </Link>
          </li>
        </ul>

        <div className="mt-auto text-center">
          <img src={logo} alt="Logo" className="img-fluid mt-5" style={{ maxHeight: "60px" }} />
        </div>
      </div>

      {/* Sidebar Móvil (Offcanvas) */}
      <div className="d-md-none">
        <button
          className="btn btn-success m-2"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#adminSidebar"
          aria-controls="adminSidebar"
        >
          ☰
        </button>
        <div className="offcanvas offcanvas-start bg-success text-white" tabIndex="-1" id="adminSidebar">
          <div className="offcanvas-header">
            <h5 className="offcanvas-title">Admin Panel</h5>
            <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas"></button>
          </div>
          <div className="offcanvas-body d-flex flex-column">
            <ul className="nav flex-column">
              <li className="nav-item">
                <Link
                  to="/admin"
                  className={`nav-link text-white d-flex align-items-center ${isActive("/admin") ? "fw-bold active-sidebar-link" : ""}`}
                  data-bs-dismiss="offcanvas" // Cierra el offcanvas al hacer clic
                >
                  {isActive("/admin") && <i className="me-2 fas fa-tachometer-alt"></i>}
                  Dashboard
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/admin/users"
                  className={`nav-link text-white d-flex align-items-center ${isActive("/admin/users") ? "fw-bold active-sidebar-link" : ""}`}
                  data-bs-dismiss="offcanvas" // Cierra el offcanvas al hacer clic
                >
                  {isActive("/admin/users") && <i className="me-2 fas fa-users"></i>}
                  Usuarios
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/admin/categories"
                  className={`nav-link text-white d-flex align-items-center ${isActive("/admin/categories") ? "fw-bold active-sidebar-link" : ""}`}
                  data-bs-dismiss="offcanvas" // Cierra el offcanvas al hacer clic
                >
                  {isActive("/admin/categories") && <i className="me-2 fas fa-tags"></i>}
                  Categorías
                </Link>
              </li>
            </ul>
            <div className="mt-auto text-center">
              <img src={logo} alt="Logo" className="img-fluid mt-4" style={{ maxHeight: "60px" }} />
            </div>
          </div>
        </div>
      </div>

      {/* Contenido Principal */}
      <div className="flex-grow-1 d-flex flex-column overflow-auto" style={{ maxHeight: "100vh" }}>
        {/* Cabecera con tarjetas responsivas */}
        <div className="container-fluid p-4 pb-0">
          <div className="row g-3"> {/* g-3 añade un pequeño espacio entre las columnas */}
            <div className="col-12 col-md-6 col-lg-4"> {/* Ocupa 12 columnas en extra-small, 6 en medium, 4 en large */}
              <HeaderCardAdmin />
            </div>
            <div className="col-12 col-md-6 col-lg-4">
              <RadialProgressChart />
            </div>
            <div className="col-12 col-lg-4"> {/* Ocupa 12 columnas en extra-small/medium, 4 en large */}
              <HeaderInfoCard />
            </div>
          </div>
        </div>

        {/* Calculadora solo en /admin, con comportamiento responsivo */}
        {location.pathname === "/admin" && (
          <div className="container-fluid px-4">
            <CalculadoraAhorro />
          </div>
        )}

        {/* Contenido dinámico (Outlet) - Asegura que el contenido interno sea responsivo */}
        <div className="container-fluid p-4 pt-0 flex-grow-1">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;