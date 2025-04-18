import React, {useState, useEffect, useContext} from "react";
import logo from "../../img/logo.png";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";


const Login = () => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate()
  
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = async (e)=>{

    e.preventDefault();
    const success = await actions.login(email, password)
    
    if(success){
      navigate("/otro-slug")
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

              <div data-mdb-input-init className="form-outline mb-4">
                <input type="email" id="form3Example3" className="form-control form-control-lg"
                  placeholder="Enter a valid email address" onChange={(e)=>{setEmail(e.target.value)}} value={email}/>
                <label className="form-label" htmlFor="form3Example3">Email address</label>
              </div>

              <div data-mdb-input-init className="form-outline mb-3">
                <input type="password" id="form3Example4" className="form-control form-control-lg"
                  placeholder="Enter password" onChange={(e)=>{setPassword(e.target.value)}} value={password}/>
                <label className="form-label" htmlFor="form3Example4">Password</label>
              </div>

              <div className="text-center text-lg-start mt-4 pt-2">
                <button type="submit" data-mdb-button-init data-mdb-ripple-init className="btn btn-primary btn-lg btn-login">Login</button>
                <p className="small fw-bold mt-2 pt-1 mb-0">Don't have an account? <a href="#!"
                  className="link-danger">Register</a></p>
              </div>

            </form>
          </div>
        </div>
      </div>
  )
}

export default Login;