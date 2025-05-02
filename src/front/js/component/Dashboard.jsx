import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PayPalBtn from "./PayPalBtn.jsx";
import WalletCard from "./WalletCard.jsx";
import AddWallet from "./AddWallet.jsx";

export const Dashboard = () => {
    const navigate = useNavigate()


    useEffect(() => {
        if (!localStorage.getItem("token")) {
            navigate('/login')
        }
    }, [])

    return (
        <div className="container my-3">
            <div id="header" className="">
                <h1>Dashboard User</h1>
                <h3>Convertirse en Premium!</h3>
                <PayPalBtn />
            </div>

            <div>
                <AddWallet />
            </div>

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
        </div>
    )
};

export default Dashboard 