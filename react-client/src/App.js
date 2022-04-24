//	Bootstrap css import
import 'bootstrap/dist/css/bootstrap.min.css';

import './BackgroundImages/BackgroundStyles.css'

import { BrowserRouter as Router } from 'react-router-dom';
import ParentsApp from './Apps/ParentsApp';
import ProvidersApp from './Apps/ProvidersApp';
import AdminsApp from './Apps/AdminsApp';
import ProtectedRoute from './Components/GeneralComponents/ProtectedRoute';
// * React app component

function GetBackgroundByUserType() {

	//	Background for login and register pages
	let backgroundCss = "login-register-pages-background";

	//	Get user type
	let userType = JSON.parse(sessionStorage.getItem('userType'));

	//	Set background accordingly
	if (userType === "Parent") {
		backgroundCss = "parent-background-image"
	}
	else if (userType === "Provider") {
		backgroundCss = "provider-background-image"
	}

	return backgroundCss;
}

const App = () => {

	return (

		<div className={`main-app ${GetBackgroundByUserType()}`} >

			<Router>

				<ProvidersApp />
				<ParentsApp />

				<ProtectedRoute exact path={"/Admin"} Component={AdminsApp} />

			</Router>

		</div >
	);
}

export default App;