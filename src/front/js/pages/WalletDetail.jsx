// views/WalletDetail.js
import React, { useEffect, useContext } from "react";
import { Context } from "../store/appContext";

const WalletDetail = () => {
  const { store, actions } = useContext(Context);

  useEffect(() => {
    actions.getWalletRecords(); // Esta función debería traer los records
  }, []);

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-12 col-md-8 offset-md-2">
          <div className="card mb-4 shadow-sm">
            <div className="card-body text-center">
              <h5 className="card-title fs-4 text-primary">Saldo Actual</h5>
              <h2 className="display-5 fw-bold">
                ${store.wallet?.balance?.toFixed(2) || "0.00"}
              </h2>
            </div>
          </div>

          <h4 className="mb-3 text-center text-md-start">Historial de Movimientos</h4>

          <div className="table-responsive">
            <table className="table table-striped table-bordered table-hover">
              <thead className="table-dark">
                <tr>
                  <th>Fecha</th>
                  <th>Categoría</th>
                  <th>Descripción</th>
                  <th>Monto</th>
                </tr>
              </thead>
              <tbody>
                {store.walletRecords.length > 0 ? (
                  store.walletRecords.map((r, i) => (
                    <tr key={i}>
                      <td>{new Date(r.date).toLocaleDateString()}</td>
                      <td>{r.category}</td>
                      <td>{r.description}</td>
                      <td className={r.amount < 0 ? "text-danger" : "text-success"}>
                        ${r.amount.toFixed(2)}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="text-center">
                      No hay registros en esta billetera.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WalletDetail;
