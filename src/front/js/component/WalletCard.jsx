import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";

const WalletCard = ({ id, balance, name, currency, selectedWallet, setSelectedWallet }) => {
  const { store } = useContext(Context);
  const navigate = useNavigate()

  const handleWalletDetails = (id) => {
    // navigate(`/wallet/${id}`)
    localStorage.setItem("wallets", id)
    setSelectedWallet(id)
    console.log(selectedWallet)
  }

  return (
    <div className={`card text-white bg-success shadow-sm ${id == selectedWallet ? 'border-neon' : ''} `} onClick={() => { handleWalletDetails(id) }} role="button" style={{ minWidth: "200px", position: "relative" }}>
      <div className="card-body text-center">
        <button
          className="btn  position-absolute top-0 end-0 m-2"
          onClick={(e) => {
            e.stopPropagation()
            console.log("Eliminar billetera", id);
          }}
        >
          ❌
        </button>

        <h5 className="card-title">{name}</h5>
        <h2 className="display-6 fw-bold">{currency} {balance?.toFixed(2) || "0.00"}</h2>
        <p className="card-title">Ver detalles</p>
      </div>
    </div>
  );
};

export default WalletCard;
