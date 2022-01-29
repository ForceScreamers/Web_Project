//	Bootstrap css import
import 'bootstrap/dist/css/bootstrap.min.css';

import { BrowserRouter as Router, Redirect, Route, useHistory } from 'react-router-dom';
import ParentsApp from './ParentsApp';
import ProvidersApp from './ProvidersApp';
import PageDoesntExist from './PageDoesntExist';
import Login from './Pages/GeneralPages/Login';
import { PublicRoute } from './Components/GeneralComponents/PublicRoute';

import { USER_TYPE } from './GlobalConstants';
import { Suspense, useState } from 'react';
import { ProtectedRoute } from './Components/GeneralComponents/ProtectedRoute';
import { RequestParentLogin, RequestProviderLogin } from './LoginHandler';
import Welcome from './Pages/GeneralPages/Welcome';

import { useEffect } from 'react';
import { ChildHandler } from './ChildHandler';

// * React app component
export default function App() {
	const history = useHistory();

	//const [childrenProfiles, setChildrenProfiles] = useState(null);
	const [username, setUsername] = useState('no username');

	async function HandleLogin(e, isValid) {
		console.log(history)

		e.preventDefault();


		if (isValid === true) {
			let formUserType = e.target.userType.value;
			let formEmail = e.target.loginEmailField.value;
			let formPassword = e.target.loginPasswordField.value;

			if (formUserType === USER_TYPE.PARENT) {
				//	Parent Login
				RequestParentLogin(formEmail, formPassword)
					.then((apiResponse) => {

						//	If responded with login accept
						console.log(apiResponse.data);
						sessionStorage.setItem("token", apiResponse.data.token);
						sessionStorage.setItem("userId", apiResponse.data.FromParent.ParentInfo.Id);
						sessionStorage.setItem("username", apiResponse.data.FromParent.ParentInfo.Username);

						setUsername(sessionStorage.getItem("username"));

						GetChildren();
						history.push("/Parents/Welcome");

					})
			}
			else if (formUserType === USER_TYPE.PROVIDER) {
				//	Provider Login
				console.log("Loggin in as provider...")
				history.push("/Providers/Welcome");

			}
			else {
				//	Don't think that this is needed but just in case
				alert("Something went wrong with user type");
			}
		}
	}

	// const fetchIsAuth = () => {
	// 	const userPromise = GetIsAuth();
	// 	return {
	// 		isAuth: wrapPromise(userPromise),
	// 	}
	// }

	function GetChildren() {
		const wrapPromise = (promise) => {
			//  Set initial status
			let status = 'pending';
			//  Store result
			let result;
			//Wait for promise
			let suspender = promise.then(

				res => {
					status = 'success';
					result = res;
					console.log(res);
				},
				err => {
					status = 'error';
					result = err;
					console.log(err);
				}
			);

			return {
				read() {
					if (status === 'pending') {
						throw suspender;
					}
					else if (status === 'error') {
						throw result;
					}
					else if (status === 'success') {
						return result;
					}
				}
			}




		}
		let children = ChildHandler.GetChildrenFromServer()

		return wrapPromise(children);
		//		let childrenFromApi = res.data;

		//	Set children in state
		//	setChildrenProfiles(childrenFromApi);

		// Set children in session storage
		//sessionStorage.setItem('children', JSON.stringify(childrenFromApi));
	}

	const children = GetChildren();

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

			<Route exact path="/" component={() =>
				<Login
					UserType={USER_TYPE.PARENT}
					HandleLogin={(e, isValid) => HandleLogin(e, isValid)}
				/>}
			/>


			<Suspense fallback={<h1>Loading parents app...</h1>}>
				<ParentsApp Username={username} ChildrenProfiles={children} UpdateChildren={GetChildren} />
			</Suspense>

			<ProvidersApp />
			{/* {
				userType === USER_TYPE.PARENT ? <ParentsApp /> : <ProvidersApp />
			} */}

			{/* <Route path="/Providers" component={ProvidersApp} /> */}
			{/* <Route path="/Parents" component={Welcome} /> */}

			{/* <Route component={PageDoesntExist} /> */}

		</div >
	);
}

