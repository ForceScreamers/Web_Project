//	Bootstrap css import
import 'bootstrap/dist/css/bootstrap.min.css';

import { BrowserRouter as Router, Route } from 'react-router-dom';
import ParentsApp from './Apps/ParentsApp';
import ProvidersApp from './Apps/ProvidersApp';
import AdminsApp from './Apps/AdminsApp';
import ProtectedRoute from './Components/GeneralComponents/ProtectedRoute';
// * React app component


const App = () => {
	return (

		<div className="App" >

			<Router>

				<ParentsApp />
				<ProvidersApp />

				<ProtectedRoute exact path={"/Admin"} Component={AdminsApp} />

			</Router>

		</div >
	);
}

export default App;