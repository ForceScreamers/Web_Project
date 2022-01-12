import NavigationBar from '../../Components/ParentsComponents/ParentNavigationBar'
import WelcomeOpener from '../../Components/GeneralComponents/WelcomeComponents/WelcomeOpener'
import '../../CSS/pages-css/Welcome.css'

function Welcome() {
    return (
        <div>

            <NavigationBar />
            <div className="WelcomeContainer">
                <div className='HeadlineContainer'>
                    <WelcomeOpener>
                        <h1 className="Headline">"משפט קבלת פנים יפה כזה אבל לא משהו יותר מידי"</h1>
                    </WelcomeOpener>
                </div>
            </div>
            <WelcomeOpener>
                <div className='para'>
                    ניסיון
                </div>
            </WelcomeOpener>
        </div>

    )
}

export default Welcome