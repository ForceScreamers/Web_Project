//	#region Imports
//	Import hooks
import React from 'react';
import { useEffect, useState } from 'react';

//	Import main pages
import Login from "./main-pages/Login";

import { Router, Route } from "react-router-dom";

//	Import history
import history from './History';

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

import AuthenticatedRoute from "./components/AuthenticatedRoute";
import UnauthenticatedRoute from "./components/UnauthenticatedRoute";

import axios from 'axios';
import TestGame from './games/TestGame/TestGame';

//	Games import
import MemoryGame from './games/MemoryGame/MemoryGame';

//	Bootstrap css import
import 'bootstrap/dist/css/bootstrap.min.css';

//	Other libraries
import utf8 from 'utf8';



//	Import helper functions
import { ValidateUserInput, EmailRegexCheck } from './Project-Modules/ValidateUserInput';
import { NavBarContext } from './NavBarContext';

//	#endregion

//	var sharedsession = require("express-socket.io-session");
//	io.use(sharedsession(express_session));

const REQUEST_TIMEOUT_LENGTH = 4000;
const ENABLE_LOGIN = true;//! Used for debugging

let username;

/**
 * normal comment
 * *Important highlighted
 * ! Warning
 * ? Query
 * TODO: todo comment
 * @param myParameter The parameter for something
 */





const ValidateLoginInput = (userData) => {
	let emailValid, passwordValid = false;

	if (ValidateEmail(userData.email)) { emailValid = true; }
	if (ValidatePassword(userData.password)) { passwordValid = true; }

	return emailValid && passwordValid;
}

/**
 * Returns true or false whether the password isn't empty
 */
const ValidatePassword = (password) => {

	let valid = false;
	if (password !== "") {
		valid = true;
	}
	else {
		alert("empty password")
	}

	return valid;
}

/**
 * Returns true or false whether the email isn't empty or doesn't have special characters
 */
const ValidateEmail = (email) => {

	let valid = false;
	if (email !== "") {
		if (EmailRegexCheck(email)) {
			valid = true;
		}
		else {
			//	Email is invalid
			alert("invalid email");
		}
	}
	else {
		//	Email is empty
		alert("empty email");
	}

	return valid;
};


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



// *	Instantiate app component
const App = () => {
	const [isAuth, setIsAuth] = useState(false);

	//	All children for logged parent
	const [childrenProfiles, setChildrenProfiles] = useState([]);

	//	Current selected child, will be used for tracking progress
	const [currentChild, setCurrentChild] = useState({});
	const [username, setUsername] = useState("no username");

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


	/**
	 * Changes the selected child from edit profile to the current child
	 * Used to keep track of progress for this child
	 */
	const HandleSelectChild = (selectedChild) => {
		setCurrentChild(selectedChild)
		console.log("Selected child: ")
		console.log(currentChild)


		return true;
	}

	const IsSelectedChild = (childId) => {
		console.log(currentChild.id === childId)

		let isSelected = false;
		if (Object.keys(currentChild).length === 0 && childrenProfiles[0].id === childId) {
			isSelected = true;
			setCurrentChild(childrenProfiles[0]);

		}


		return isSelected;
	}


	const HandleLogin = async (e) => {

		e.preventDefault();

		let userData = {
			email: e.target.loginEmailField.value,
			password: e.target.loginPasswordField.value,
		};

		if (ENABLE_LOGIN) {
			if (ValidateLoginInput(userData)) {
				//TODO: Deal with unable to connect
				RequestLogin(userData)
					.catch(err => console.log(err))
					.then((response) => {

						console.log(response);
						if (response) {
							if (response.data.authorized) {
								//	Redirect user to the main page
								RedirectLoggedUser(response.data.authorized);
								setUsername(response.data.result.username)
							}
							else {
								//	User doesn't exist
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

	const RedirectLoggedUser = (isLogged) => {
		setIsAuth(isLogged);
		isLogged ? history.push('/Welcome') : alert("Incorrect email or password")
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
				//TODO: Verify Delete child

				let arr = RemoveChildProfile(childrenProfiles, response.data.childId);

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

	// useEffect(() => {
	// 	if (Object.keys(currentChild).length === 0) { setCurrentChild(childrenProfiles[0]) }
	// }, [currentChild])



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


				<NavBarContext.Provider value={{
					child: currentChild,
					username: username
				}}>
					<Route exact path="/Welcome" component={Welcome} />
					<Route exact path="/About" component={() => <About username={username} />} />
					<Route exact path="/EditProfile" component={() =>
						<EditProfile
							IsSelectedChild={IsSelectedChild}
							HandleSelectChild={HandleSelectChild}
							HandleDeleteChild={HandleDeleteChild}
							HandleAddChild={HandleAddChild}
							children_={childrenProfiles} />}
					/>
					<Route exact path="/Games" component={Games} />
					<Route exact path="/Info" component={Info} />
					<Route exact path="/Avatar" component={Avatar} />
					<Route exact path="/Journal" component={Journal} />
					<Route exact path="/Home" component={Home} />
				</NavBarContext.Provider>
				{/* //  The main pages are: Games, info, about, edit profile, avatar, journal */}


			</div>
		</Router>
	);
}

export default App;