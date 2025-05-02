import React, { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import PayPalBtn from "./PayPalBtn.jsx";
import WalletCard from "./WalletCard.jsx";
import AddWallet from "./AddWallet.jsx";
import AddRecord from "./AddRecord.jsx"
import ListRecord from "./ListRecord.jsx"
import { toast } from "react-toastify";
import { Context } from "../store/appContext";


export const Dashboard = () => {

    const navigate = useNavigate()
    const { store, actions } = useContext(Context);



    useEffect(() => {
        const fetchWallets = async () => {
            const response = await actions.getAllUserWallets()

            if (!response) {
                console.log("Parece que hubo un error o no hay wallets")
                return;
            }

        }

        fetchWallets();
    }, []);


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

                <div className="row">
                    <div className="col-3">
                        <PayPalBtn />
                    </div>
                    <div className="col-2 mt-4">
                        <AddWallet />
                    </div>
                </div>
            </div>

            <div className="row">
                {store.wallets_from_user && store.wallets_from_user.length > 0 ? (
                    store.wallets_from_user.map((wallet) => (
                        <div className="col-lg-3 col-sm-4 col-sm-6 mb-3" key={wallet.id}>
                            <WalletCard id={wallet.id} balance={wallet.balance} name={wallet.name} currency={wallet.currency.symbol} />
                        </div>
                    ))
                ) : (
                    <div className="col-3">
                        <p>No tienes wallets</p>
                        <AddWallet />
                    </div>
                )}
            </div>

            <div className="row">
                <div className="col-lg-6 col-md-12">
                    <AddRecord />
                </div>
                <div className="text-center align-items-center my-auto col-lg-6 col-md-12">
                    Meter grafiquitas aca
                </div>
            </div>
        </div>
    )
};

export default Dashboard 