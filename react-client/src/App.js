//	Bootstrap css import
import 'bootstrap/dist/css/bootstrap.min.css';

import { BrowserRouter as Router, Route, Switch, useHistory } from 'react-router-dom';
import ParentsApp from './ParentsApp';
import ProvidersApp from './ProvidersApp';
import PageDoesntExist from './PageDoesntExist';
import { useEffect } from 'react';
import RouteHandler from './RouteHandler';

// import history from './History';
// * React app component
const App = () => {


	return (

		<div className="App" >

			<Router>

				<ParentsApp />

				<ProvidersApp />

				<RouteHandler />

			</Router>

		</div >
	);
}

export default App;