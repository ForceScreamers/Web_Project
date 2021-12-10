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
import Register from './main-pages/Register';

import EditProfile from './main-pages/EditProfile'
import Games from './main-pages/Games'
import About from './main-pages/About';
import Info from './main-pages/Info';
import Avatar from './main-pages/Avatar';
import Journal from './main-pages/Journal';
import Home from './main-pages/Home';

import AuthenticatedRoute from "./components/AuthenticatedRoute";
import UnauthenticatedRoute from "./components/UnauthenticatedRoute";

import UserProfile from './components/UserProfile';

import axios from 'axios';
import TestGame from './games/TestGame/TestGame';

//	Games import
import MemoryGame from './games/MemoryGame/MemoryGame'

//	Bootstrap css import
import 'bootstrap/dist/css/bootstrap.min.css';

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
	console.log("Validating input...")
	//	Returns a enum (EMPTY, UNUSUAL, MAXIMUM_LENGTH)
	return true;
}

const RequestLogin = async (userData) => {
	return axios({
		method: 'post',
		url: "http://localhost:5001/login",
		timeout: REQUEST_TIMEOUT_LENGTH,
		headers: {
			data: JSON.stringify(userData),
		}
	})
}

const HandleAddChild = () => {

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
				//TODO: Deal with unable to connect
				RequestLogin(userData).catch(err => console.log(err))
					.then((response) => {
						//	If there is a response
						if (response) {
							//	Redirect user to the main page
							console.log("User valid: " + response.data.Authenticated);
							RedirectLoggedUser(response.data.Authenticated);
						}
					});
			}
		}
		else {
			//	FOR DEBUGGING	//
			console.warn("Login disabled")
			//setIsAuth(true)
			history.push('/Games/MemoryGame')
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

	const RedirectLoggedUser = (isLogged) => {
		setIsAuth(isLogged);
		isLogged ? history.push('/Welcome') : alert("Incorrect email or password")
	}

	return (
		<Router history={history}>
			<div className="App" >

				{/* DEFAULT PATH */}
				{/* <Route exact path="/" render={() => (userLoggedIn ? (<Redirect to="/" />) : (<Redirect to="/Login" />))} /> */}

				<Route exact path="/" component={() => <Login HandleLogin={HandleLogin} />} />
				<Route exact path="/Register" component={() => <Register />} />

				{/* <AuthenticatedRoute exact path="/Welcome" isAuth={isAuth} component={() => <MainPage username={username} />} /> */}

				{/* <AuthenticatedRoute exact path="/Games" isAuth={isAuth} component={Games} /> */}
				{/* <AuthenticatedRoute exact path="/EditProfile" isAuth={isAuth} component={MyProfile} /> */}

				<AuthenticatedRoute exact path="/Games/TestGame" isAuth={isAuth} component={TestGame} />
				<AuthenticatedRoute exact path="/Games/MemoryGame" isAuth={isAuth} component={MemoryGame} />

				<Route exact path="/Welcome" component={Welcome} />
				<Route exact path="/About" component={About} />
				<Route exact path="/EditProfile" component={() => <EditProfile HandleAddChild={HandleAddChild} />} />
				<Route exact path="/Games" component={Games} />
				<Route exact path="/Info" component={Info} />
				<Route exact path="/Avatar" component={Avatar} />
				<Route exact path="/Journal" component={Journal} />
				<Route exact path="/Home" component={Home} />

				{/* //  The main pages are: Games, info, about, edit profile, avatar, journal */}


			</div>
		</Router>
	);
}

export default App;