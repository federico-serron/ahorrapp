import React, { useState, useContext } from 'react'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { Context } from "../store/appContext";


const ForgotPass = () => {
    const [email, setEmail] = useState("")
    const navigate = useNavigate()
    const { store, actions } = useContext(Context);


    const handleSumbit = async (e) => {
        e.preventDefault()

        const response = await actions.forgotPassword(email);
        if (!response) {
            toast.error("No existe una cuenta con este email");
            return;
        }

        toast.success("Por favor, chequea tu cuenta de email (tambien chequea el Spam por las dudas)")
        return;


    }
    return (
        <div className='container mx-auto my-4'>
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <form className="needs-validation" onSubmit={handleSumbit}>
                        <div className="mb-3">
                            <label for="emailInput" className="form-label">Correo electrónico</label>
                            <input type="email" className="form-control" id="emailInput" placeholder="tucorreo@ejemplo.com" required onChange={(e) => { setEmail(e.target.value) }} value={email} />
                            <div className="invalid-feedback">
                                Por favor, ingresá un correo válido.
                            </div>
                        </div>
                        <button type="submit" className="btn btn-primary w-100">Recuperar</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default ForgotPass;
