//import react into the bundle
import React from "react";
import ReactDOM from "react-dom";

//include your index.scss file into the bundle
import "../styles/index.css";

// Importa los estilos CSS de Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';

// Importa el JavaScript de Bootstrap (el bundle incluye Popper.js)
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

//import your own components
import Layout from "./layout";

//render your react application
ReactDOM.render(<Layout />, document.querySelector("#app"));