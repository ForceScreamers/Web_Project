import NavigationBar from '../components/NavigationBar'
import NavigationBarTest from '../components/NavigationBarTest'
import '../css/pages-css/Welcome.css'
import { useEffect } from 'react';

function Welcome() {
    useEffect(() => console.log("WELCOMe!"), []);
    return (
        <div>
            <div className="WelcomeContainer">
                <NavigationBar />
                <h1 className="Headline">Welcome!</h1>
            </div>
        </div>
    )
}

export default Welcome