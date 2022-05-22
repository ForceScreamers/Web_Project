//	Bootstrap css import
import 'bootstrap/dist/css/bootstrap.min.css';

import './BackgroundImages/BackgroundStyles.css'

import { BrowserRouter as Router, useLocation } from 'react-router-dom';
import ParentsApp from './Apps/ParentsApp';
import ProvidersApp from './Apps/ProvidersApp';
import AdminsApp from './Apps/AdminsApp';
import ProtectedRoute from './Components/GeneralComponents/ProtectedRoute';
import { useEffect } from 'react';

import { useState } from 'react';
// * React app component


//	Import backgrounds
import backgroundParentLogin from "./images/backgrounds/background_parent_login.png";

import backgroundParentGames from "./images/backgrounds/background_parent_games.png";

import backgroundMatch1 from "./images/backgrounds/background_match_1.png"
import backgroundSpotTheDifference from "./website-images/spot-the-difference-background.png"

const DEFAULT_BACKGROUND_IMAGE = backgroundParentLogin;

class Background {
	constructor(path, image) {
		this.path = path;

		//	Set image prop as image object to preload the background images
		this.image = new Image();
		this.image.src = image;
	}
}

const presetBackgroundImages = [
	new Background("/", backgroundParentLogin),
	new Background("/Parent/Games", backgroundParentGames),
	new Background("/Parent/Games/Match", backgroundMatch1),
	new Background("/Parent/Games/SpotTheDifferences", backgroundSpotTheDifference),
]

//TODO: Disconnect user if the webapi is offline
const App = () => {

	const [background, setBackground] = useState(backgroundParentLogin);
	console.log(background)

	function UpdateBackgroundByPathName(path) {

		let background = DEFAULT_BACKGROUND_IMAGE;

		for (let presetBackgroundImage of presetBackgroundImages) {

			if (presetBackgroundImage.path === path) {
				let absPath = presetBackgroundImage.image.src.substring(21);
				background = absPath;
			}
		}

		setBackground(background);
	}

	return (

		<div style={{ backgroundImage: `url(${background})` }} className={`main-app background-style`} >

			<Router>

				<BackgroundController UpdateBackgroundByPathName={UpdateBackgroundByPathName} />

				<ProvidersApp />
				<ParentsApp />

				<ProtectedRoute exact path={"/Admin"} Component={AdminsApp} />

			</Router>

		</div >
	);
}

function BackgroundController({ UpdateBackgroundByPathName }) {
	const location = useLocation();

	useEffect(() => {
		UpdateBackgroundByPathName(location.pathname);
		console.log("Updating background...")
	}, [UpdateBackgroundByPathName, location])

	return (
		<></>
	)
}

export default App;