import React, { useContext } from "react";
import { Context } from "../store/appContext";
import {useNavigate} from "react-router-dom";

const WalletCard = ({id, balance, name, currency}) => {
  const { store } = useContext(Context);
  const navigate = useNavigate()

  const handleWalletDetails = (id) => {
    navigate(`/wallet/${id}`)
  }

  return (
    <div className="card text-white bg-success shadow-sm" onClick={()=>{handleWalletDetails(id)}} role="button" style={{ minWidth: "200px" }}>
      <div className="card-body text-center">
        <h5 className="card-title">{name}</h5>
        <h2 className="display-6 fw-bold">{currency} {balance?.toFixed(2) || "0.00"}</h2>
        <p className="card-title">Ver detalles</p>
      </div>
    </div>
  );
};

export default WalletCard;
