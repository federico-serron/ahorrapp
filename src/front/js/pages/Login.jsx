import React, {useState, useEffect, useContext} from "react";
import logo from "../../img/logo.png";
import { Context } from "../store/appContext";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";


const Login = () => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate()
  
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e)=>{
    e.preventDefault();
    const emailRegex = /\S+@\S+\.\S+/;

    if (!emailRegex.test(email)) {
      toast.warn("El correo no tiene un formato válido")
      return;
    }
    setLoading(true)
    const success = await actions.login(email, password)
    setLoading(false)

    if(success){
      navigate("/dashboard")
    }else{
      toast.error("Correo o contraseña incorrectos 😓");
    }
  }


  return (
      <div className="container h-custom">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-md-9 col-lg-6 col-xl-5">
            <img src={logo}
              className="img-fluid" alt="AhorrApp logo" />
          </div>
          <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
            <form onSubmit={handleSubmit}>

              <div  className="form-outline mb-4">
                <input type="email" id="form3Example3" className="form-control form-control-lg"
                  placeholder="Email valido" onChange={(e)=>{setEmail(e.target.value)}} value={email}/>
                <label className="form-label" htmlFor="form3Example3">Email</label>
              </div>

              <div className="form-outline mb-3">
                <input type="password" id="form3Example4" className="form-control form-control-lg"
                  placeholder="Tu contrasena" onChange={(e)=>{setPassword(e.target.value)}} value={password}/>
                <label className="form-label" htmlFor="form3Example4">Contrasena</label>
              </div>

              <div className="text-center text-lg-start mt-4 pt-2">
                <button type="submit" className="btn btn-primary btn-lg btn-login" disabled={loading}>{loading ? "Entrando..." : "Login"}</button>
                <p className="small fw-bold mt-2 pt-1 mb-0">No tienes una cuenta? <Link to={'/signup'}
                  className="link-danger">Registrarse</Link></p>
              </div>

            </form>
          </div>
        </div>
      </div>
  )
}

export default Login;