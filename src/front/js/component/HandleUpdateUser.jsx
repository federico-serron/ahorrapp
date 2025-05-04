import React, { useState } from "react";

const HandleUpdateUser = ({ userId, apiUrl }) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");

    const handleUpdateUser = async () => {
        const userData = { name, email, password, phone, address };

        try {
            const response = await fetch(`${apiUrl}/api/user/${userId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify(userData)
            });

            const data = await response.json();

            if (response.ok) {
                console.log("Usuario actualizado:", data);
            } else {
                console.error("Error en la actualización:", data.msg || response.statusText);
            }
        } catch (error) {
            console.error("Error en la solicitud:", error);
        }
    };

    return (
        <div>
            <h2>Actualizar Usuario</h2>
            <input type="text" placeholder="Nombre" value={name} onChange={(e) => setName(e.target.value)} />
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <input type="password" placeholder="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)} />
            <input type="text" placeholder="Teléfono" value={phone} onChange={(e) => setPhone(e.target.value)} />
            <input type="text" placeholder="Dirección" value={address} onChange={(e) => setAddress(e.target.value)} />
            <button onClick={handleUpdateUser}>Actualizar Usuario</button>
        </div>
    );
};

export default HandleUpdateUser;
