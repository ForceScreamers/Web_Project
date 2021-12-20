//	#region Imports
//	Import hooks
import React, { Children, Component } from 'react';
import { useEffect, useState } from 'react';

//	Import main pages
import Login from "./main-pages/Login";

import { Router, Route, Redirect } from "react-router-dom";

//	Import history
import history from './History'

//	Import main pages
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

import utf8 from 'utf8'



//	Import helper functions
import { ValidateUserInput } from './Project-Modules/ValidateUserInput';

//	#endregion

//	var sharedsession = require("express-socket.io-session");
//	io.use(sharedsession(express_session));

const REQUEST_TIMEOUT_LENGTH = 4000;

//	Used for debugging
const ENABLE_LOGIN = false;

let username;

const ValidateInput = (userData) => {
	//	Client validation
	//	Empty fields, unusual characters, field length (this one can be done inside the field itself)
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

//	Checks if the user input for the child add form is valid
//	All letters in hebrew and not empty
const AddchildInputValidation = (input) => {
	console.log(input);

	let valid = true;

	if (input === "") {
		valid = false;
		alert("חסר שם הילד")
	}
	else if (!(/[\u0590-\u05FF]/).test(input)) {
		valid = false;
		alert("שם הילד צריך להיות בעברית")
	}

	return valid;
}

const GetChildrenFromServer = async () => {
	console.log("Getting children from server...")
	//	Gets all the children for the logged parent from the server
	return axios({
		method: 'get',
		url: "http://localhost:5001/get-children-for-parent",
		timeout: REQUEST_TIMEOUT_LENGTH,
		headers: {
			data: JSON.stringify(10)
		}
	})
}

const App = () => {
	const [isAuth, setIsAuth] = useState(false);

	//	All children for logged parent
	const [childrenProfiles, setChildrenProfiles] = useState([]);

	//	Current selected child, will be used for tracking progress
	const [currentChild, setCurrentChild] = useState({});

	const LoadChildren = async () => {
		console.log("Loading children...")
		return GetChildrenFromServer()
			.catch(err => console.log(err))
			.then(res => {
				if (res) {
					console.log(res.data)
					setChildrenProfiles(res.data)
				}
				else { console.log("No response from server") }

			})
	}



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
							console.log("User valid: " + response.data.Confirmed);
							RedirectLoggedUser(response.data.Confirmed);
						}
					});
			}
		}
		else {

			//	FOR DEBUGGING	//
			console.warn("Login disabled")
			//setIsAuth(true)
			history.push('/Welcome')
		}
	}

	//	Loads children into state
	useEffect(() => {
		LoadChildren();
	}, [])

	//Load children into react components from the current state when the children array updates
	useEffect(() => {
		console.log(childrenProfiles);

	}, [childrenProfiles])


	const HandleDeleteChild = (childId) => {
		console.log("Deleting child... " + childId)
		console.log(childrenProfiles);


		// Get the delete confirmation from the server then delete 
		//	the child from the state array
		axios({
			method: 'get',
			url: "http://localhost:5001/delete-child",
			timeout: REQUEST_TIMEOUT_LENGTH,
			headers: {
				data: JSON.stringify({ childId: childId })
			}
		}).catch(err => console.log(err))
			.then((response) => {
				console.log(response.data.childId);
				let arr = RemoveChildProfile(childrenProfiles, response.data.childId);
				console.log("Array without child");
				console.log(arr);

				setChildrenProfiles(arr)
			})
	}

	//	Remove the child with the given id from the state array
	const RemoveChildProfile = (profilesArray, childId) => {
		let newChildProfilesArray = [...childrenProfiles];

		newChildProfilesArray.forEach(childProfile => {
			if (childProfile.id === childId) {
				console.log("aaa")

				//Remove child
				newChildProfilesArray.splice(newChildProfilesArray.indexOf(childProfile), 1)
			}
		})

		console.log("(From function) Array without child")
		console.log(newChildProfilesArray);
		return newChildProfilesArray;
	}

	//  Handles child add logic
	const HandleAddChild = (e) => {
		e.preventDefault();

		let formChildName = e.target.childNameField.value;
		let formChildAge = e.target.childAgeSelect.value;

		//	Validate input
		console.log(formChildName);
		if (AddchildInputValidation(formChildName)) {
			//Send request to server to add child
			axios({

				method: 'post',
				url: "http://localhost:5001/add-child",
				timeout: REQUEST_TIMEOUT_LENGTH,
				headers: {
					data: JSON.stringify({
						parentId: 10, // Will be the logged in parent id
						childName: utf8.encode(formChildName),
						childAge: formChildAge
					}),
				}
			})
				.catch(err => console.log(err))

				.then((response) => {//	Get confirmation that the child was added
					//	Response will be HasAddedChild
					if (response) {
						console.log("Setting children profiles with added child");
						setChildrenProfiles([...childrenProfiles, {
							age: response.data.age,
							name: response.data.name,
							id: response.data.id
						}])
					}
					else { console.log("No response from server") }
				})
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
				<Route exact path="/EditProfile" component={() => <EditProfile HandleDeleteChild={HandleDeleteChild} HandleAddChild={HandleAddChild} children_={childrenProfiles} />} />
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