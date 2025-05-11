import React, { useState, useEffect, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt, faPlus } from '@fortawesome/free-solid-svg-icons';
import { Context } from "../store/appContext";

const HeaderCardAdmin = ({ setActiveComponent }) => {
    const { store } = useContext(Context);
    const [profileImage, setProfileImage] = useState(null);
    const [hovered, setHovered] = useState(false);

    useEffect(() => {
        // Carga inicial desde localStorage si no hay en currentUser
        const storedImage = localStorage.getItem("profileImage");
        if (storedImage) {
            setProfileImage(storedImage);
        } else if (store.currentUser?.profile_picture_url) {
            setProfileImage(store.currentUser.profile_picture_url);
        }
    }, [store.currentUser]);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onloadend = () => {
            const base64String = reader.result;
            setProfileImage(base64String);
            localStorage.setItem("profileImage", base64String);
        };
        reader.readAsDataURL(file);
    };

    return (
        <div className="card shadow-sm border-light position-relative" style={{ maxWidth: '300px' }}>
            {/* Icono para cambiar a vista de editar */}
            <div className="position-absolute top-0 end-0 p-2" style={{ cursor: 'pointer' }} onClick={() => setActiveComponent("edit-user")}>
                <FontAwesomeIcon icon={faPencilAlt} size="lg" />
            </div>

            <div className="card-body d-flex flex-column align-items-center p-4">
                <label
                    htmlFor="profile-upload"
                    className="position-relative"
                    onMouseEnter={() => setHovered(true)}
                    onMouseLeave={() => setHovered(false)}
                    style={{ cursor: 'pointer' }}
                >
                    <img
                        src={profileImage || "https://via.placeholder.com/100x100?text=Agregar+Imagen"}
                        alt="Imagen de perfil"
                        className="rounded-circle mb-3"
                        style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                    />
                    {hovered && (
                        <div
                            className="position-absolute top-50 start-50 translate-middle"
                            style={{
                                backgroundColor: "rgba(0,0,0,0.5)",
                                borderRadius: "50%",
                                padding: "10px",
                                color: "white"
                            }}
                        >
                            <FontAwesomeIcon icon={faPlus} />
                        </div>
                    )}
                </label>
                <input
                    id="profile-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    style={{ display: 'none' }}
                />

                <h5 className="card-title fw-bold mb-1 text-center">{store.currentUser?.name || "Cargando..."}</h5>
                <p className="card-subtitle text-muted mb-2 text-center">{store.currentUser?.email || "Cargando..."}</p>
            </div>
        </div>
    );
};

export default HeaderCardAdmin;
