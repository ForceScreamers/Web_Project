//	Bootstrap css import
import 'bootstrap/dist/css/bootstrap.min.css';

import { BrowserRouter as Router, Route } from 'react-router-dom';
import ParentsApp from './GeneralApps/ParentsApp';
import ProvidersApp from './GeneralApps/ProvidersApp';
import AdminsApp from './GeneralApps/AdminsApp';
// * React app component

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
//TODO: Add text to input error
//TODO: Add errors in login and register as text to screen
//TODO: Deal with unable to connect
//TODO: Add comments to every function
//TODO: Add welcome opener
//TODO: Provider register -> validation wont update component without the "Test" state need to fix

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