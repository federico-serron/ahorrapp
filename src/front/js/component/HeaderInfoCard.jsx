import React, { useEffect, useContext } from 'react';
import { Context } from "../store/appContext"; 

const HeaderInfoCard = () => {
  const { store, actions } = useContext(Context); 

  useEffect(() => {
    // Llama a la nueva acción para obtener solo el conteo de usuarios
  // y si el conteo ya se ha cargado para evitar llamadas redundantes.
    const userRole = store.currentUser?.role; 
    if (userRole === "admin" && store.totalUsersCount === null) {
      actions.getUsersCount(); // Llama a la NUEVA acción
    }
  }, [actions, store.currentUser, store.totalUsersCount]); // Dependencias para el useEffect

  // Obtener el número total de usuarios
  const totalUsuarios = store.totalUsersCount !== null ? store.totalUsersCount : "Cargando...";

  return (
    <div className="card shadow-sm border-light" style={{ maxWidth: '300px' }}>
      <div className="card-body d-flex flex-column align-items-start p-3">
        <div className="d-flex align-items-center mb-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-people-fill text-primary me-2" viewBox="0 0 16 16">
            <path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1H7zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
            <path fillRule="evenodd" d="M5.216 14A2.238 2.238 0 0 1 5 13c0-1.355.68-2.75 1.936-3.5 1.899-.772 5.1-1.07 5.819-2.477.81-.16.825-.361.825-.586 0-.224-.015-.426-.824-.586C13.08 6.708 9.899 7 8 8.5c-1.899.772-5.1 1.07-5.819 2.477-.81.16-.824.361-.824.586 0 .224.015.426.824.586C6.12 10.25 9.314 10.5 11 12c.706.596.92 1.436.92 2.237 0 .668-.429 1.322-1.184 1.897-1.232.88-2.82 1.384-4.56 1.384-1.737 0-3.325-.504-4.559-1.384-1.175-.85-1.942-2.013-1.942-3.468 0-.284.482-.515.836-.515.355 0 .714.194.856.515 1.267 1.581 4.012 2.08 5.666 2.08 1.654 0 4.399-.5 5.666-2.08.142-.321.501-.515.856-.515.354 0 .836.231.836.515 0 1.453-.767 2.616-1.942 3.468-1.234.88-2.821 1.384-4.562 1.384-1.735 0-3.322-.504-4.557-1.384-.756-.576-1.185-1.23-1.185-1.897 0-.761.214-1.601.92-2.237 1.691-1.407 4.827-1.705 6.765-2.477C8.2 9.25 6.92 8.5 5.216 8 4.5 9.5 3 13 3 14s1 0 1 1h4.216z"/>
          </svg>
          <h6 className="card-subtitle mb-0">Usuarios Registrados </h6>
        </div>
        <h3 className="card-title fw-bold mb-0">
          {totalUsuarios}
        </h3>
        <p className="card-text text-success mt-1">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-up me-1" viewBox="0 0 16 16">
            <path fillRule="evenodd" d="M8 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 0 0 .708.708L7.5 2.707V14.5a.5.5 0 0 0 .5.5z"/>
          </svg>
          11.07% 
        </p>
      </div>
    </div>
  );
};

export default HeaderInfoCard;