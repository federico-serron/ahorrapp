import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";

const WalletCard = () => {
  const { store } = useContext(Context);

  return (
    <div className="container my-4">
      <div className="row">
        <div className="col-12 col-sm-10 col-md-6 col-lg-4">
          <div className="card text-white bg-primary shadow-sm">
            <div className="card-body text-center">
              <h5 className="card-title">Saldo en tu billetera</h5>
              <h2 className="display-6 fw-bold">
                ${store.wallet?.balance?.toFixed(2) || "0.00"}
              </h2>
              <Link className="card-title" to={'/wallet/'}>Ver detalles</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WalletCard;
