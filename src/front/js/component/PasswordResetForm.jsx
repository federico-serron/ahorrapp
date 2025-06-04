import React, { useState, useContext } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import { toast } from "react-toastify";


const PasswordResetForm = () => {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [validated, setValidated] = useState(false);
    const [error, setError] = useState("");
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const token = searchParams.get("token");

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (password !== confirmPassword) {
            setError("Las contraseñas no coinciden.");
            setValidated(true);
            return;
        }

        if (password.length < 6) {
            setError("La contraseña debe tener al menos 6 caracteres.");
            setValidated(true);
            return;
        }

        // Limpiar errores y enviar
        setError("");
        setValidated(true);


        const response = await actions.recoverPassword(token, password)

        if (!response) {
            toast.error("Hubo un error, intenta nuevamente por favor")
            return;
        }
        toast.success("Contraseña actualizada correctamente 😁")
        navigate('/login');
    };

    return (
        <div className="container py-4">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <form noValidate onSubmit={handleSubmit} className={validated ? "was-validated" : ""}>
                        <div className="mb-3">
                            <label htmlFor="newPassword" className="form-label">Nueva contraseña</label>
                            <input
                                type="password"
                                className="form-control"
                                id="newPassword"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                minLength={6}
                            />
                            <div className="invalid-feedback">
                                La contraseña es requerida y debe tener al menos 6 caracteres.
                            </div>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="confirmPassword" className="form-label">Repetir nueva contraseña</label>
                            <input
                                type="password"
                                className="form-control"
                                id="confirmPassword"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                            />
                            <div className="invalid-feedback">
                                Por favor, repetí la contraseña.
                            </div>
                        </div>

                        {error && (
                            <div className="alert alert-danger" role="alert">
                                {error}
                            </div>
                        )}

                        <button type="submit" className="btn btn-primary w-100">
                            Cambiar contraseña
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default PasswordResetForm;
