//	#region Imports
//	Import hooks
import React from 'react';
import { useEffect, useState } from 'react';

//	Import main pages
import Login from "./main-pages/Login";

import { Route, useHistory } from "react-router-dom";

//	Import main pages
import Welcome from './main-pages/Welcome';
import Register from './main-pages/Register';
import EditProfile from './main-pages/EditProfile';
import Games from './main-pages/Games'
import About from './main-pages/About';
import Info from './main-pages/Info';
import Avatar from './main-pages/Avatar';
import Journal from './main-pages/Journal';
import Home from './main-pages/Home';

//import AuthenticatedRoute from "./components/ProtectedRoute";
import { ProtectedRoute } from './components/ProtectedRoute'

import axios from 'axios';

//	Bootstrap css import
import 'bootstrap/dist/css/bootstrap.min.css';

//	Other libraries
import utf8 from 'utf8';



//	Import helper functions
import { LogoutContext } from './LogoutContext';
import { ValidateLoginInput, ValidateRegisterInput } from './Project-Modules/ValidateUserInput';

import { NavBarContext } from './NavBarContext';

//	#endregion

//	var sharedsession = require("express-socket.io-session");
//	io.use(sharedsession(express_session));

const REQUEST_TIMEOUT_LENGTH = 6000;
const ENABLE_LOGIN = true;//! Used for debugging

/**
 * normal comment
 * *Important highlighted
 * ! Warning
 * ? Query
 * TODO: todo comment
 * @param myParameter The parameter for something
 */





const RequestRegister = async () => {
	// Register req
	console.log("Requesting reg...")
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


// * React app component
const App = () => {
	const [currentChild, setCurrentChild] = useState('no name');
	const [username, setUsername] = useState('no username');
	//const history = useHistory();
	let history = useHistory();

	/**Gets the children belonging to the logged parent
	 * Set current children profiles to the matching children
	 */
	const LoadChildrenFromServer = () => {
		let parentId = JSON.parse(localStorage.getItem('userId'));

		//!HERE
		if (parentId) {
			axios({
				method: 'get',
				url: "http://localhost:5001/get-children-for-parent",
				timeout: REQUEST_TIMEOUT_LENGTH,
				headers: {
					data: parentId,
				}
			})
				.catch(err => console.log(err))
				.then(res => {
					if (res) {
						localStorage.setItem('children', JSON.stringify(res.data));
						let children = JSON.parse(localStorage.getItem('children'));

						localStorage.setItem('currentChild', JSON.stringify(GetSelectedChild(children)))
						setCurrentChild(JSON.parse(localStorage.getItem('currentChild')));
					}
				})
		}
	}

	const GetSelectedChild = (childrenArray) => {
		let tempArray = childrenArray;
		let child = undefined;

		tempArray.forEach((tempChild) => {
			if (tempChild.isSelected) {
				child = tempChild;
			}
		});

		return child;
	}

	/**
	 * Changes the selected child from edit profile to the current child
	 * Used to keep track of progress for this child
	 */
	const HandleSelectChild = (childToSelect) => {
		axios({
			method: 'post',
			url: "http://localhost:5001/select-child",
			timeout: REQUEST_TIMEOUT_LENGTH,
			headers: {
				data: JSON.stringify({ childId: childToSelect.id })
			}
		})
			.catch(err => console.log(err))
			.then((response) => {
				//TODO: Get correct response, it's adding just need to change it inside the client

				if (response.data.IsSelected) {//	The child was selected in the database 
					//	Change the current child
					LoadChildrenFromServer();
				}
				else {
					console.error("SOMETHING WENT WRONG WITH CHILD SELECT");
				}
			})


	}





	const HandleLogin = async (e) => {

		e.preventDefault();

		//! For debugging
		// let userData = {
		// 	email: e.target.loginEmailField.value,
		// 	password: e.target.loginPasswordField.value,
		// };


		let userData = {
			email: "test@test.com",
			password: "1234",
		};

		if (ENABLE_LOGIN) {
			if (ValidateLoginInput(userData)) {

				//TODO: Deal with unable to connect
				RequestLogin(userData)
					.catch(err => console.log(err))
					.then((response) => {

						if (response) {
							console.log(response);

							//	If the user is authorized
							if (response.data.authorized === true) {

								//	Set localstorage items and states
								localStorage.setItem("token", response.data.token);
								localStorage.setItem("userId", response.data.userId);
								localStorage.setItem("username", response.data.username);
								setUsername(localStorage.getItem("username"));

								localStorage.setItem("children", JSON.stringify(response.data.children));

								let children = JSON.parse(localStorage.getItem("children"));
								localStorage.setItem('currentChild', JSON.stringify(GetSelectedChild(children)))

								setCurrentChild(JSON.parse(localStorage.getItem("currentChild")))

								//	Redirect to welcome page
								history.push("/Welcome");
							}
							else {
								//	TODO Handle user doesn't exist
								alert("user not found");
							}
						}
						else {
							console.error("server error, maybe webapi")
						}
					});
			}
		}
		else {
			//! FOR DEBUGGING	//
			console.warn("Login disabled")
			//setIsAuth(true)
			history.push('/Welcome')
		}
	}

	const HandleRegister = async (e, formValid) => {
		e.preventDefault();

		let userData = {
			username: e.target.registerUsernameField.value,
			email: e.target.registerEmailField.value,
			password: e.target.registerPasswordField.value,
			confirmPassword: e.target.registerPasswordConfirmField.value,
		};
		//!	Note, i'm sending the confirm password too


		//!	THE BUG IS IN THE STATE AND THAT IT TAKES TOO LONG FOR THE STATE TO UPDATE
		//! CHECK "REACT WAIT FOR STATE UPDATE"
		console.log("Form valid: " + formValid)
		if (formValid) {//	If the form is valid (Writing here !valid because the validation works the opposite way)

			RequestRegister(userData)
				.catch(err => console.log(err))
				.then((response) => {

					if (response) {
						console.log(response);

						//	If the user is authorized
						if (response.data.authorized === true) {

							//	Set localstorage items and states
							localStorage.setItem("token", response.data.token);
							localStorage.setItem("userId", response.data.userId);
							localStorage.setItem("username", response.data.username);
							setUsername(localStorage.getItem("username"));

							localStorage.setItem("children", JSON.stringify(response.data.children));

							let children = JSON.parse(localStorage.getItem("children"));
							localStorage.setItem('currentChild', JSON.stringify(GetSelectedChild(children)))

							setCurrentChild(JSON.parse(localStorage.getItem("currentChild")))

							//	Redirect to welcome page
							history.push("/Welcome");
						}
						else {
							//	TODO Handle user doesn't exist
							alert("user not found");
						}
					}
					else {
						console.error("server error, maybe webapi")
					}
				});
		}
	}

	const HandleDeleteChild = (childId) => {
		// Get the delete confirmation from the server then delete 
		//	the child from the state array
		axios({
			method: 'get',
			url: "http://localhost:5001/delete-child",
			timeout: REQUEST_TIMEOUT_LENGTH,
			headers: {
				data: JSON.stringify({
					childId: childId,
					parentId: JSON.parse(localStorage.getItem('userId'))
				})
			}
		}).catch(err => console.log(err))
			.then((response) => {
				//TODO: User verify delete child

				LoadChildrenFromServer();
			})
	}

	//  Handles child add logic
	const HandleAddChild = (e) => {
		e.preventDefault();

		let formChildName = e.target.childNameField.value;
		let formChildAge = e.target.childAgeSelect.value;

		//	Validate input
		if (AddchildInputValidation(formChildName)) {
			//Send request to server to add child
			axios({

				method: 'post',
				url: "http://localhost:5001/add-child",
				timeout: REQUEST_TIMEOUT_LENGTH,
				headers: {
					data: JSON.stringify({
						parentId: JSON.parse(localStorage.getItem('userId')), // Will be the logged in parent id
						childName: utf8.encode(formChildName),
						childAge: formChildAge
					}),
				}
			})
				.catch(err => console.log(err))

				.then((response) => {//	Get confirmation that the child was added

					//	Response will be HasAddedChild
					if (response) {
						LoadChildrenFromServer();
					}
					else { console.log("No response from server") }
				})
		}
	}

	useEffect(() => {
		//	Load username and current child
		setUsername(localStorage.getItem('username'));
		setCurrentChild(JSON.parse(localStorage.getItem('currentChild')));
	}, [])

	

	useEffect(() => {
		//	Disconnect the user if the localstorage is empty
		return history.listen(() => {
			if (localStorage.length === 0 && history.location.pathname !== "/") {
				LogoutUser();
			}
		})
	}, [history])

	const LogoutUser = () => {
		localStorage.clear();
		history.replace("/");
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
		<div className="App" >

			<Route exact path="/" component={() => <Login HandleLogin={HandleLogin} />} />
			<Route exact path="/Register" component={() =>
				<Register
					HandleRegister={(e, isValid) => HandleRegister(e, isValid)}
				/>} />

			{/* //TODO: NEED TO CALL THE ROUTES ONLY WHEN THE WELCOME PAGE LOADS*/}
			<LogoutContext.Provider value={LogoutUser}>
				<NavBarContext.Provider value={{
					child: currentChild,
					username: username,
				}}>

					<ProtectedRoute exact path="/Welcome" component={Welcome} />
					<ProtectedRoute exact path="/About" component={About} />

					<ProtectedRoute path="/EditProfile" component={() =>
						<EditProfile
							HandleSelectChild={HandleSelectChild}
							HandleDeleteChild={HandleDeleteChild}
							HandleAddChild={HandleAddChild}
						/>}
					/>
					<ProtectedRoute exact path="/Games" component={Games} />
					<ProtectedRoute exact path="/Info" component={Info} />
					<ProtectedRoute exact path="/Avatar" component={Avatar} />
					<ProtectedRoute exact path="/Journal" component={Journal} />
					<ProtectedRoute exact path="/Home" component={Home} />
				</NavBarContext.Provider>

			</LogoutContext.Provider>
			{/* //  The main pages are: Games, info, about, edit profile, avatar, journal */}
		</div >
	);
}

export default App;