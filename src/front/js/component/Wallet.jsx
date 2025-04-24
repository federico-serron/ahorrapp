import React from "react";


const Wallet = () => {
    return (
        <div>



            <div className="container justify-content-center">
                <select className="form-select" aria-label="Default select example">
                    <option selected>Wallets</option>
                    <option value="1">Wallet One</option>
                    <option value="2">Wallet Two</option>
                    <option value="3">Wallet Three</option>
                </select>
            </div>






            <div className="card">
                <div className="card-header">
                    Billetera Gastos Mensuales
                </div>
                <div className="card-body">
                    <h5 className="card-title">Gastos</h5>

                    <div className="mb-3">
                        <input type="text" className="form-control" id="formGroupExampleInput" placeholder="ALQUILER 400$ " />
                    </div>
                    <div className="mb-3">
                        <input type="text" className="form-control" id="formGroupExampleInput" placeholder="COMIDA 200$ " />
                    </div>
                    <div className="mb-3">
                        <input type="text" className="form-control" id="formGroupExampleInput" placeholder="SERVICIOS 100$ " />
                    </div>


                    <p className="card-text"></p>
                    <a href="#" className="btn btn-primary">Go somewhere</a>
                    <h1>Monto Actual  2.000 $</h1>
                </div>
            </div>

            <div>
                <label for="customRange1" className="form-label">Example range</label>
                <input type="range" className="form-range" id="customRange1" />
            </div>

        </div>
    )
}

export default Wallet
