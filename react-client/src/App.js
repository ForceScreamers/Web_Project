//	#region Imports
//	Import hooks
import React from 'react';
import { useEffect, useState } from 'react';

import { Route, useHistory } from "react-router-dom";

//	Import main pages
import Welcome from './Pages/GeneralPages/Welcome'
import About from './Pages/GeneralPages/About';

import ParentRegister from './Pages/ParentsPages/ParentRegister';
import ParentLogin from './Pages/ParentsPages/ParentLogin';
import EditProfilePage from './Pages/ParentsPages/EditProfilePage';
import GamesPage from './Pages/ParentsPages/GamesPage'
import InfoPage from './Pages/ParentsPages/InfoPage';
import AvatarPage from './Pages/ParentsPages/AvatarPage';
import JournalPage from './Pages/ParentsPages/JournalPage';
import HomePage from './Pages/ParentsPages/HomePage';

//import AuthenticatedRoute from "./components/ProtectedRoute";
import { ProtectedRoute } from './Components/GeneralComponents/ProtectedRoute'
import { PublicRoute } from './Components/GeneralComponents/PublicRoute'

import axios from 'axios';

//	Bootstrap css import
import 'bootstrap/dist/css/bootstrap.min.css';

//	Other libraries
import utf8 from 'utf8';



//	Import helper functions
import { LogoutContext } from './Contexts/LogoutContext';
import { ValidateLoginInput, ValidateRegisterInput } from './Project-Modules/ValidateUserInput';

import { NavBarContext } from './Contexts/NavBarContext';

//	#endregion

/**
 * normal comment
 * *Important highlighted
 * ! Warning
 * ? Query
 * TODO: todo comment
 * @param myParameter The parameter for something
 */




const RequestRegister = async (userData) => {
	// Register req
	console.log("Requesting reg...")

	//	Encode the username
	userData.username = utf8.encode(userData.username)

	return axios({
		method: 'POST',
		url: "http://localhost:5000/api/Parent/ParentRegister",
		timeout: process.env.REACT_APP_REQUEST_TIMEOUT_LENGTH,
		headers: {
			// data: JSON.stringify(userData),
			'username': userData.username,
			'email': userData.email,
			'password': userData.password,
		}
	})
}

const RequestLogin = async (userData) => {
	console.log("dhtrghzertdfx")
	return axios({
		method: 'POST',
		hostname: 'localhost',
		url: "http://localhost:5000/api/Parent/ParentLogin",
		port: 5000,
		timeout: process.env.REACT_APP_REQUEST_TIMEOUT_LENGTH,
		headers: {
			'Access-Control-Allow-Origin': '*',
			'Content-Type': 'application/json',
			data: JSON.stringify(userData),
			'email': userData.email,
			'password': userData.password,
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


//TODO: Fix - Protected route sends 30 requests to authenticate, it needs to send one
//TODO: Fix - Login and register response have unnessesary headers i.e. \/	\/	\/
// Data: {
// 		FromParent: {
// 				ParentInfo: {
// 					some data
// 				},
// 			more data
// 		}
// }
//* DONE: Validate login input at client
//TODO: Fix input validation at add child,
//TODO: Add text to input error
//TODO: Add errors in login and register as text to screen
//TODO: HandleLogin and HandleRegister are too long
//TODO: Combine contexts
//TODO: Fix handle when token is expired
//TODO: Disconnect when the same user relogs
//TODO: Remove unnecessary e parameter from various functions 
//TODO: Finish game template
//TODO: Update evaluation when a game ends
//TODO: Deal with unable to connect
//TODO Handle user doesn't exist
//TODO: User verify delete child
//TODO: NEED TO CALL THE ROUTES ONLY WHEN THE WELCOME PAGE LOADS


// * React app component
const App = () => {
	const [currentChild, setCurrentChild] = useState({});
	const [username, setUsername] = useState('no username');
	//const history = useHistory();
	let history = useHistory();

	/**Gets the children belonging to the logged parent
	 * Set current children profiles to the matching children
	 */
	const LoadChildrenFromServer = () => {

		let parentId = JSON.parse(sessionStorage.getItem('userId'));

		console.log(parentId);
		if (parentId) {
			axios({
				method: 'POST',
				url: "http://localhost:5000/api/Parent/GetChildren",
				timeout: process.env.REACT_APP_REQUEST_TIMEOUT_LENGTH,
				headers: {
					'parentId': parentId,
				}
			})
				.catch(err => console.log(err))
				.then(res => {
					if (res) {
						console.log("CHILDREN:")
						console.log(res)
						sessionStorage.setItem('children', JSON.stringify(res.data));
						let children = JSON.parse(sessionStorage.getItem('children'));

						// children.forEach(child => {
						// 	child.Evaluations = [];
						// })
						//InitializeEvaluationsForChildren(children);

						console.log(children);
						if (children.length === 0) {
							console.log(children);
							setCurrentChild(null);
							sessionStorage.setItem('currentChild', 'null')
						}
						else {
							sessionStorage.setItem('currentChild', JSON.stringify(GetSelectedChild(children)))
							setCurrentChild(JSON.parse(sessionStorage.getItem('currentChild')));
						}
					}
				})
		}
	}



	const GetSelectedChild = (childrenArray) => {
		let tempArray = childrenArray;
		let child = undefined;

		tempArray.forEach((tempChild) => {
			if (tempChild.IsSelected) {
				child = tempChild;
			}
		});
		console.log(childrenArray);

		return child;
	}

	/**
	 * Changes the selected child from edit profile to the current child
	 * Used to keep track of progress for this child
	 */
	const HandleSelectChild = (childToSelect) => {

		console.log(childToSelect)
		axios({
			method: 'post',
			url: "http://localhost:5000/api/Parent/SelectChild",
			timeout: process.env.REACT_APP_REQUEST_TIMEOUT_LENGTH,
			headers: {
				'childId': JSON.stringify(childToSelect.Id),
				'parentId': sessionStorage.getItem('userId'),
			}
		})
			.catch(err => console.log(err))
			.then((response) => {

				if (response.data.IsSelected) {//	The child was selected in the database 

					//	Change the current child
					LoadChildrenFromServer();
				}
				else {
					console.error("SOMETHING WENT WRONG WITH CHILD SELECT");
				}
			})
	}




	const HandleLogin = async (e, formValid) => {

		e.preventDefault();

		if (formValid) {

			let userData = {
				email: e.target.loginEmailField.value,
				password: e.target.loginPasswordField.value,
			};


			//! For debugging
			// let userData = {
			// 	email: "test@test.com",
			// 	password: "1234",
			// };

			RequestLogin(userData)
				.catch(err => console.log(err))
				.then((response) => {

					if (response) {
						console.log(response);

						//	If the user is authorized
						if (response.data.FromParent.UserExists === true) {

							//	Set sessionStorage items and states
							sessionStorage.setItem("token", response.data.token);
							sessionStorage.setItem("userId", response.data.FromParent.ParentInfo.Id);
							sessionStorage.setItem("username", response.data.FromParent.ParentInfo.Username);
							setUsername(sessionStorage.getItem("username"));

							LoadChildrenFromServer()

							//	Redirect to welcome page
							history.push("/Welcome");
						}
						else {
							alert("user not found");
						}
					}
					else {
						console.error("server error, maybe webapi")
					}
				});
		}
	}



	const HandleRegister = async (e, formValid) => {
		e.preventDefault();



		console.log("Form valid: " + formValid)
		if (formValid) {//	If the form is valid (Writing here !valid because the validation works the opposite way)

			let userData = {
				username: e.target.registerUsernameField.value,
				email: e.target.registerEmailField.value,
				password: e.target.registerPasswordField.value,
				confirmPassword: e.target.registerPasswordConfirmField.value,
			};
			//!	Note, i'm sending the confirm password too

			let response = await RequestRegister(userData);
			if (response) {
				console.log(response);

				//	If the user is authorized
				if (response.data.Registered === true) {

					//	Log in the newly registered user
					//? Check properties
					RequestLogin(userData)
						.then((loginResponse) => {
							console.log(loginResponse)
							//	Set sessionStorage items and states
							sessionStorage.setItem("token", loginResponse.data.token);
							sessionStorage.setItem("userId", loginResponse.data.FromParent.ParentInfo.Id);
							sessionStorage.setItem("username", loginResponse.data.FromParent.ParentInfo.Username);
							setUsername(sessionStorage.getItem("username"));
							history.push("/Welcome");
						});
				}
				else if (response.data.FromParent.UserExists) {
					alert("User already exists");
				}
				else {
					console.error("ERROR IN REGISTER USER");
				}
			}
			else {
				console.error("server error, maybe webapi")
			}
		}
	}



	const HandleDeleteChild = (childId) => {
		// Get the delete confirmation from the server then delete 
		//	the child from the state array
		axios({
			method: 'POST',
			url: "http://localhost:5000/api/Parent/DeleteChild",
			timeout: process.env.REACT_APP_REQUEST_TIMEOUT_LENGTH,
			headers: {
				'childId': childId,
				'parentId': JSON.parse(sessionStorage.getItem('userId'))

			}
		}).catch(err => console.log(err))
			.then((response) => {

				LoadChildrenFromServer();
			})
	}

	//  Handles child add logic
	const HandleAddChild = async (e, formValid) => {
		e.preventDefault();

		console.log(`Add child? ${formValid}`)

		if (formValid) {

			let formChildName = e.target.childNameField.value;
			let formChildAge = e.target.childAgeSelect.value;


			//Send request to server to add child
			axios({

				method: 'post',
				url: "http://localhost:5000/api/Parent/AddChild",
				timeout: process.env.REACT_APP_REQUEST_TIMEOUT_LENGTH,
				headers: {
					'parentId': JSON.parse(sessionStorage.getItem('userId')),
					'childName': utf8.encode(formChildName),
					'childAge': formChildAge
				}
			})
				.catch(err => console.log(err))

				.then((response) => {//	Get confirmation that the child was added
					console.log(response);
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
		setUsername(sessionStorage.getItem('username'));
		console.log(sessionStorage.getItem('currentChild'));
		setCurrentChild(JSON.parse(sessionStorage.getItem('currentChild')));

	}, [])

	const LogoutUser = () => {
		sessionStorage.clear();
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





	function HandleEvaluationUpdate(score, gameId) {
		alert("testing" + score);
		console.log(score);

		axios({
			method: 'POST',
			url: "http://localhost:5000/api/Parent/UpdateEvaluationScore",
			timeout: process.env.REACT_APP_REQUEST_TIMEOUT_LENGTH,
			headers: {
				'childId': JSON.parse(sessionStorage.getItem('currentChild')).Id,
				'gameId': gameId,
				'gameScore': score,
			}
		})
			.catch(err => console.log(err))
			.then(response => {

				//	If the server has updated the evaluation
				if (response.data.UpdatedEvaluation) {
					LoadChildrenFromServer();
				}
			})
	}


	return (

		<div className="App" >

			<PublicRoute exact path="/" component={() =>
				<ParentLogin HandleLogin={(e, isValid) => HandleLogin(e, isValid)} />}
			/>

			<PublicRoute exact path="/Register" component={() => {
				return (
					<ParentRegister
						HandleRegister={(e, isValid) => HandleRegister(e, isValid)}
					/>
				)
			}

			} />

			<LogoutContext.Provider value={LogoutUser}>
				<NavBarContext.Provider value={{
					child: currentChild,
					username: username,
				}}>

					<ProtectedRoute exact path="/Welcome" component={Welcome} />
					<ProtectedRoute exact path="/About" component={About} />

					<ProtectedRoute path="/EditProfile" component={() =>
						<EditProfilePage
							HandleSelectChild={HandleSelectChild}
							HandleDeleteChild={HandleDeleteChild}
							HandleAddChild={(e, isValid) => HandleAddChild(e, isValid)}
						/>}
					/>
					<ProtectedRoute exact path="/Games" component={() => {
						return <GamesPage HandleEvaluationUpdate={HandleEvaluationUpdate} />
					}} />
					<ProtectedRoute exact path="/Info" component={InfoPage} />
					<ProtectedRoute exact path="/Avatar" component={AvatarPage} />
					<ProtectedRoute exact path="/Journal" component={JournalPage} />
					<ProtectedRoute exact path="/Home" component={HomePage} />
				</NavBarContext.Provider>

			</LogoutContext.Provider>
			{/* //  The main pages are: Games, info, about, edit profile, avatar, journal */}
		</div >
	);
}

export default App;