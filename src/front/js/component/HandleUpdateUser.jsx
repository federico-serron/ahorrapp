import React, { useState,useEffect,useContext, useActionState } from "react";
import {Context} from "../store/appContext"
//import HandleUpdateUser from "./HandleUpdateUser.jsx";

const HandleUpdateUser = () => {
    const [name, setName] = useState(store.currentUser.name);
    const [email, setEmail] = useState(store.currentUser.email);
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState(store.currentUser.phone);
    const [address, setAddress] = useState(store.currentUser.address);

    const {store,actions}= useContext(Context)
    const handleUpdateUser = async ()=> {

        try {

           const actualizar = await actions.handleUpdateUser()
           if (!actualizar){

            console.log("Hubo un error ")
           }

            
        } catch (error) {
            console.log (error)
            
        }
    }

    
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
