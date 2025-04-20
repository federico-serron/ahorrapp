import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";
import { Dashboard } from "../component/Dashboard.jsx";




export const Home = () => {
	return (
		<div>

			<Dashboard/>
			
		</div>
	)
};