import React, { useContext } from "react";
import { Navigate, Outlet, Link } from "react-router-dom";
import { Context } from "../store/appContext";


const AdminLayout = () => {
    const { store, actions } = useContext(Context);
    const role = actions.getUserRoleFromToken();

  if (role !== "admin") return <Navigate to="/unauthorized" />;
  
  return (
    <div className="d-flex">
      <div className="bg-dark text-white vh-100 p-3" style={{ width: "220px" }}>
        <h4 className="mb-4">Admin</h4>
        <ul className="nav flex-column">
          <li className="nav-item">
            <Link
              to="/admin"
              className={`nav-link text-white ${location.pathname === "/admin" ? "fw-bold" : ""}`}
            >
              Dashboard
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/admin/users"
              className={`nav-link text-white ${location.pathname.includes("/admin/usuarios") ? "fw-bold" : ""}`}
            >
              Usuarios
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/admin/categories"
              className={`nav-link text-white ${location.pathname.includes("/admin/categories") ? "fw-bold" : ""}`}
            >
              Categorias
            </Link>
          </li>
        </ul>
      </div>

      {/* Contenido, ya sea paginas o componentes, depende la ruta */}
      <div className="flex-grow-1 p-4" style={{ background: "#f8f9fa", minHeight: "100vh" }}>
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
