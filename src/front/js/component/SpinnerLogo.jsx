import React from "react";
import logo from "../../img/logotipo_sin_texto.png";


const SpinnerLogo = () => {
    return ( 
    <div class="text-center">
        <img src={logo} alt="Cargando..." class="image-spinner" />
        <p class="mt-2 text-sm">Cargando, por favor espera...</p>
    </div>
     );
}
 
export default SpinnerLogo;