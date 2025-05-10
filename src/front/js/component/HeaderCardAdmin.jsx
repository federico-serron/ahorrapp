import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';

const HeaderCardAdmin = () => {
  const [profileImage, setProfileImage] = useState(null);

  useEffect(() => {
    const storedImage = localStorage.getItem("profileImage");
    if (storedImage) {
      setProfileImage(storedImage);
    }
  }, []);

  const handleImageChange = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        localStorage.setItem("profileImage", reader.result); // Guarda la imagen
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  
  return ( 
    
    
    // Header Card User (Contenido de la tarjeta de perfil)
    <div className="card shadow-sm border-light position-relative" style={{ maxWidth: '300px' }}>
      <div className="position-absolute top-0 end-0 p-2" style={{ cursor: 'pointer' }}>
        <FontAwesomeIcon icon={faPencilAlt} size="lg" />
      </div>
      <div className="card-body d-flex flex-column align-items-center p-4">
        <label htmlFor="profileImageInput" style={{ cursor: 'pointer' }}>
          <img
            src={profileImage || "https://via.placeholder.com/100x100"}
            alt="Avatar de usuario"
            className="rounded-circle mb-3"
            style={{ width: '100px', height: '100px', objectFit: 'cover' }}
          />
        </label>
        <input
          type="file"
          id="profileImageInput"
          accept="image/*"
          style={{ display: 'none' }}
          onChange={handleImageChange}
        />
        <h5 className="card-title fw-bold mb-1 text-center">Bonnie Green</h5>
        <p className="card-subtitle text-muted mb-2 text-center">Visual Designer</p>
        <div className="d-flex gap-2">
          <button className="btn btn-primary btn-sm">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-person-plus-fill me-2" viewBox="0 0 16 16">
              <path d="M1 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
              <path fillRule="evenodd" d="M13.5 5a.5.5 0 0 1 .5.5V7h1.5a.5.5 0 0 1 0 1H14v1.5a.5.5 0 0 1-1 0V8h-.5a.5.5 0 0 1-.5-.5V6h-.5a.5.5 0 0 1 0-1H13v-.5a.5.5 0 0 1 .5-.5z"/>
            </svg>
            Añadir amigo
          </button>
          <button className="btn btn-outline-secondary btn-sm">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-chat-fill me-2" viewBox="0 0 16 16">
              <path d="M8 15c4.418 0 8-3.134 8-7s-3.582-7-8-7-8 3.134-8 7 3.582 7 8 7zm4-9c0 1.11-.448 2.08-1.289 2.82C11.5 9.08 11 9.86 11 10.7c-.63-.32-1.39-.5-2.25-.5-1.664 0-2.993.672-3.691 1.409-.792.841-1.289 1.786-1.289 2.82 0 .834.179 1.634.479 2.345a.5.5 0 0 0 .767.595l.643-.307c.289.137.643.218 1.04.218 1.6 0 2.51-.53 3.03-1.144.63-.739.995-1.637.995-2.664 0-.418-.078-.805-.226-1.156a.5.5 0 0 0-.52-.303H6.635a.5.5 0 0 0-.52-.303c-.148.351-.226.738-.226.156 0 1.027.365 1.925.995 2.664.52.614 1.43 1.144 3.03 1.144.397 0 .75-.081 1.04-.218l.643.307a.5.5 0 0 0 .767-.595c.3-.711.479-1.511.479-2.345 0-.418-.078-.805-.226-1.156a.5.5 0 0 0-.52-.303H6.635a.5.5 0 0 0-.52-.303c-.148.351-.226.738-.226.156 0 1.027.365 1.925.995 2.664.52.614 1.43 1.144 3.03 1.144.397 0 .75-.081 1.04-.218l.643.307a.5.5 0 0 0 .767-.595c.3-.711.479-1.511.479-2.345 0-.418-.078-.805-.226-1.156a.5.5 0 0 0-.52-.303H6.635a.5.5 0 0 0-.52-.303c-.148.351-.226.738-.226.156 0 1.027.365 1.925.995 2.664.52.614 1.43 1.144 3.03 1.144.397 0 .75-.081 1.04-.218l-.643.307a.5.5 0 0 0-.767.595c-.3.711-.479 1.511-.479 2.345 0 1.034.448 2.004 1.289 2.845C12.448 8.08 12 7.3 12 6.4z"/>
            </svg>
            Mensaje
          </button>
        </div>
      </div>
    </div>

   
  );
};

export default HeaderCardAdmin;