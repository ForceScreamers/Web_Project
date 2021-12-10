import NavigationBar from '../components/NavigationBar'
import NavigationBarTest from '../components/NavigationBarTest'
import '../css/pages-css/Welcome.css'

function Welcome() {
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