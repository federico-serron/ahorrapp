import React, { useEffect, useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Context } from "../store/appContext";





const Wallet = () => {
    const navigate = useNavigate()
    const { store, actions } = useContext(Context);
    const [totalAmount, setTotalAmount] = useState(0)
    const { id } = useParams()

    const handleChange = (e) => {
        const ruta = e.target.value
        if (ruta) {
            navigate(ruta)
        }
    }

    useEffect(() => {
        if (!localStorage.getItem("token")) {
            navigate("/login")
        }
    }, [])

    useEffect(() => {
        setTotalAmount(actions.getWalletInfo(id))
        
    }, [])


    return (
        <div>



            <div className="container justify-content-center">
                <select onChange={handleChange} className="form-select" aria-label="Default select example">
                    <option selected value="" disabled>Wallets</option>
                    <option value="/wallet/1">Wallet One</option>
                    <option value="/wallet/2">Wallet Two</option>
                    <option value="/wallet/3">Wallet Three</option>
                </select>
            </div>






            <div className="card">
                <div className="card-header">
                    Billetera Gastos Mensuales {id}
                </div>
                <div className="card-body">
                    <ul className="list-group list-group-flush">
                        <li className="list-group-item">An item</li>
                        <li className="list-group-item">A second item</li>
                        <li className="list-group-item">A third item</li>
                        <li className="list-group-item">A fourth item</li>
                        <li className="list-group-item">And a fifth one</li>
                    </ul>


                    <p className="card-text"></p>
                    <a href="#" className="btn btn-primary">Go somewhere</a>
                    <h1>monto actual ${totalAmount}</h1>
                </div>
            </div>

        </div>
    )
}

export default Wallet
