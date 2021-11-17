//#region Imports
//Import hooks
import React, { Component } from 'react';
import { useEffect, useState } from 'react';

//Import main pages
import Login from "./main-pages/Login";

import { Router, Route, Redirect } from "react-router-dom";

//Import history
import history from './History'

//Import main pages
import Welcome from './main-pages/Welcome'
import Games from './main-pages/Games'
import MyProfile from './main-pages/MyProfile'
import MainPage from './components/MainPage'
import Register from './main-pages/Register';

import AuthenticatedRoute from "./components/AuthenticatedRoute";
import UnauthenticatedRoute from "./components/UnauthenticatedRoute";

import UserProfile from './components/UserProfile';

import axios from 'axios';
import TestGame from './games/TestGame/TestGame';
//import { Console } from 'console';

//#endregion

// var sharedsession = require("express-socket.io-session");
// io.use(sharedsession(express_session));

const REQUEST_TIMEOUT_LENGTH = 4000;

//	Used for debugging
const ENABLE_LOGIN = true;

let username;

const ValidateInput = (userData) => {
	//	Client validation
	// Empty fields, unusual characters, field length (this one can be done inside the field itself)

	//	Returns a enum (EMPTY, UNUSUAL, MAXIMUM_LENGTH)
	return true;
}

const App = () => {
	const [isAuth, setIsAuth] = useState(false);

	const HandleLogin = async (e) => {

		e.preventDefault();

		let userData = {
			email: e.target.loginEmailField.value,
			password: e.target.loginPasswordField.value,
		};

		if (ENABLE_LOGIN) {

			if (ValidateInput(userData)) {
				//	Axios login request to server
				axios({
					method: 'post',
					url: "http://localhost:5001/login",
					timeout: REQUEST_TIMEOUT_LENGTH,
					headers: {
						data: JSON.stringify(userData),
					}
				}).then((response) => {

					//	Redirect user to the main page
					setIsAuth(response.data.Authenticated)
					history.push('/Games/TestGame')
				});
			}
		}
		else {
			console.warn("Login disabled")
			setIsAuth(true)
			history.push('/Games/TestGame')
		}
	}



	//#region	Control the website zoom level
	useEffect(() => {
		const initialValue = document.body.style.zoom;

		// Change zoom level on mount
		document.body.style.zoom = "125%";

		return () => {
			// Restore default value
			document.body.style.zoom = initialValue;
		};
	}, []);
	//#endregion

	return (
		<Router history={history}>
			<div className="App" >

				{/* DEFAULT PATH */}
				{/* <Route exact path="/" render={() => (userLoggedIn ? (<Redirect to="/" />) : (<Redirect to="/Login" />))} /> */}

				<Route exact path="/" component={() => <Login HandleLogin={HandleLogin} />} />
				<Route exact path="/Register" component={() => <Register />} />

				<AuthenticatedRoute exact path="/Welcome" isAuth={isAuth} component={() => <MainPage username={username} />} />

				<AuthenticatedRoute exact path="/Games" isAuth={isAuth} component={Games} />
				<AuthenticatedRoute exact path="/MyProfile" isAuth={isAuth} component={MyProfile} />

				<AuthenticatedRoute exact path="/Games/TestGame" isAuth={isAuth} component={TestGame} />


			</div>
		</Router>
	);
}

export default App;