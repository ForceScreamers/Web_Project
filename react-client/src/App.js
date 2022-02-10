//	Bootstrap css import
import 'bootstrap/dist/css/bootstrap.min.css';

import { BrowserRouter as Router, Route } from 'react-router-dom';
import ParentsApp from './Apps/ParentsApp';
import ProvidersApp from './Apps/ProvidersApp';
import AdminsApp from './Apps/AdminsApp';
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