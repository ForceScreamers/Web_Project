//	Bootstrap css import
import 'bootstrap/dist/css/bootstrap.min.css';

import { BrowserRouter as Router, Route, Switch, useHistory } from 'react-router-dom';
import ParentsApp from './GeneralApps/ParentsApp';
import ProvidersApp from './GeneralApps/ProvidersApp';
import PageDoesntExist from './PageDoesntExist';
import { useEffect } from 'react';
import AdminsApp from './GeneralApps/AdminsApp';

// import history from './History';
// * React app component
const App = () => {


	return (

		<div className="App" >

			<Router>

				<ParentsApp />
				<ProvidersApp />

				<Route exact path={"/Admins"} component={AdminsApp} />

			</Router>

		</div >
	);
}

export default App;