import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";

// Recibe la prop onClose. Es opcional ahora.
const HandleUpdateUser = ({ onClose }) => {
  const { store, actions } = useContext(Context);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    address: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      setError(null);
      try {
        await actions.getUser();
        setLoading(false);
      } catch (err) {
        setError("Error al cargar los datos del usuario.");
        setLoading(false);
        console.error("Error al obtener usuario:", err);
      }
    };
    fetchUser();
  }, []);

  useEffect(() => {
    if (store.currentUser) {
      setFormData({
        name: store.currentUser.name || "",
        email: store.currentUser.email || "",
        password: "",
        phone: store.currentUser.phone || "",
        address: store.currentUser.address || "",
      });
    }
  }, [store.currentUser]);

  const handleUpdateUser = async (e) => {
    e.preventDefault();
    console.log("🔄 Enviando datos para actualizar usuario:", formData);
    setLoading(true);
    setError(null);
    setSuccessMessage(null);

    try {
      const actualizado = await actions.updateUser(
        formData.name,
        formData.email,
        formData.password,
        formData.phone,
        formData.address
      );

      if (actualizado) {
        console.log("✅ Usuario actualizado correctamente. Refrescando datos...");
        setSuccessMessage("¡Usuario actualizado con éxito!");
        await actions.getUser();
        // Si onClose existe, lo llamamos.
        if (onClose) {
          setTimeout(() => {
            onClose();
          }, 1500);
        }
      } else {
        console.error("❌ Falló la actualización del usuario.");
        setError("No se pudo actualizar el usuario. Inténtalo de nuevo.");
      }
    } catch (error) {
      console.error("🛑 Error al intentar actualizar usuario:", error);
      setError("Error en la conexión al servidor o datos inválidos.");
    } finally {
      setLoading(false);
    }
  };

  if (loading && !store.currentUser) {
    return (
      <div className="card p-3 mt-4 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
        <p className="mt-2">Cargando datos del usuario...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="card p-3 mt-4">
        <div className="alert alert-danger" role="alert">
          {error}
          {/* El botón de cerrar el mensaje de error se mantiene */}
          <button type="button" className="btn-close float-end" aria-label="Close" onClick={onClose}></button>
        </div>
      </div>
    );
  }

  if (!store.currentUser) {
    return <div className="alert alert-warning mt-4">No hay datos de usuario para mostrar.</div>;
  }


  return (
    <div className="card p-3 mt-4 shadow rounded-2">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Actualizar Mi Perfil</h2>
        {/* Renderizar el botón de cerrar SOLO SI la prop onClose está presente */}
        {onClose && (
          <button className="btn btn-secondary btn-sm" onClick={onClose}>
            <i className="fas fa-times"></i> Cerrar
          </button>
        )}
      </div>

      {successMessage && (
        <div className="alert alert-success alert-dismissible fade show" role="alert">
          {successMessage}
          <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close" onClick={() => setSuccessMessage(null)}></button>
        </div>
      )}

      <form onSubmit={handleUpdateUser}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Nombre:</label>
          <input
            className="form-control"
            type="text"
            id="name"
            placeholder="Nombre"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email:</label>
          <input
            className="form-control"
            type="email"
            id="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label">Nueva Contraseña (dejar vacío para no cambiar):</label>
          <input
            className="form-control"
            type="password"
            id="password"
            placeholder="Nueva contraseña"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="phone" className="form-label">Teléfono:</label>
          <input
            className="form-control"
            type="text"
            id="phone"
            placeholder="Teléfono"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="address" className="form-label">Dirección:</label>
          <input
            className="form-control"
            type="text"
            id="address"
            placeholder="Dirección"
            value={formData.address}
            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
          />
        </div>

        <button className="btn btn-primary mt-3" type="submit" disabled={loading}>
          {loading ? (
            <>
              <span className="spinner-border spinner-border-sm" aria-hidden="true"></span>
              <span className="visually-hidden" role="status">Cargando...</span>
              Actualizando...
            </>
          ) : (
            "Actualizar Usuario"
          )}
        </button>
      </form>
    </div>
  );
};

export default HandleUpdateUser;