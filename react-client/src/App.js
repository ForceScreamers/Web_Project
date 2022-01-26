//	Bootstrap css import
import 'bootstrap/dist/css/bootstrap.min.css';

import { BrowserRouter as Router, Route, useHistory } from 'react-router-dom';
import ParentsApp from './ParentsApp';
import ProvidersApp from './ProvidersApp';
import PageDoesntExist from './PageDoesntExist';

// * React app component
const App = () => {



	return (

		<div className="App" >

			<Router>


				<ParentsApp />
				<ProvidersApp />

				{/* <Route component={PageDoesntExist} /> */}
			</Router>

		</div >
	);
}

export default App;