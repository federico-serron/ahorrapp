import React, {useEffect,useState,useContext} from "react";
import { useNavigate } from "react-router-dom";
import HandleUpdateUser from "./HandleUpdateUser.jsx";
import {Context} from "../store/appContext.js"

export const Dashboard = () => {
const navigate = useNavigate()

const {store,actions}= useContext(Context)
let info = {

    
    name: "",
    email: "",
    password: "",
    phone: "",
    address: "",
   
}
const handleGetUser = async ()=>{

    try {

       const user = await actions.getUser()

        if (!user){
            console.log ("HUbo un error ")
            return;
        }

        info.name = store.currentUser.name 
        info.email= store.currentUser.email
        info.address= store.currentUser.address
        info.phone= store.currentUser.phone 




        
    } catch (error) {
        console.log(error)
        
    }
}


useEffect(()=>{
    if (!localStorage.getItem("token")) {
        navigate('/login')
    }
},[])

    return (
        <div className="container justify-content-center">
            <div>
                <h1>Dashboard User</h1>
            </div>

           

            

            <select className="form-select form-select-sm" aria-label="Small select example" style={{ marginTop: "20px" }}>
                <option selected>Select the Category</option>
                <option value="1">Alquiler</option>
                <option value="2">Comida</option>
                <option value="3">Otros</option>
            </select>

            <select className="form-select form-select-sm" aria-label="Small select example" style={{ marginTop: "20px" }}>
                <option selected>Amount</option>
                <option value="1">10</option>
                <option value="2">20</option>
                <option value="3">Otro Monto</option>
            </select>

            <select className="form-select form-select-sm" aria-label="Small select example" style={{ marginTop: "20px" }}>
                <option selected>Type of Currency</option>
                <option value="1">$</option>
                <option value="2">€</option>
                <option value="3">Otros</option>
            </select>

            <div>

                <button type="button" className="btn btn-outline-primary" style={{ width: "18rem", marginTop: "20px" }}>Load Data</button>

            </div>

            <div>
                <div className="card" style={{ width: "18rem", marginTop: "20px" }}>
                    <div className="card-header">
                        payment summary (dia/mes/año)
                    </div>
                    <ul className="list-group list-group-flush">
                        <li className="list-group-item">category:</li>
                        <li className="list-group-item">amount:</li>
                        <li className="list-group-item">currency:</li>
                    </ul>
                    <div className="card-footer">Total: 20$ (ejemplo) <i className="fa-brands fa-cc-diners-club"></i>
                    </div>
                    

            



                </div>

               
               
            </div>
            <div >
                <button className="btn btn-primary" onClick= {handleGetUser}>Editar Usuario</button>
            </div>

            <HandleUpdateUser/>
            
        </div>
    )
};

export default Dashboard 