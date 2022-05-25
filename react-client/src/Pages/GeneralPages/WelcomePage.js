import NavigationBar from '../../Components/ParentsComponents/ParentNavigationBar'
import WelcomeOpener from '../../Components/GeneralComponents/WelcomeComponents/WelcomeOpener'
import '../../CSS/pages-css/Welcome.css'
import { Button } from 'react-bootstrap'

import understandIcon from '../../website-images/welcome-understand-icon.png';
import reactionIcon from '../../website-images/welcome-reaction-icon.png';
import welcomeBackgroundLine from '../../website-images/welcome-background-line.png';


import vocabIcon from '../../website-images/welcome-vocab-icon.png';
import { useRef } from 'react';

import welcomeImage1 from '../../website-images/welcome-image-1.png'
import welcomeImage2 from '../../website-images/welcome-image-2.png'

export default function WelcomePage({ RedirectToGamesAndFilterByTopic }) {

    const scrollToElementRef = useRef();

    function ExecuteScroll() { scrollToElementRef.current.scrollIntoView(); }


    return (
        <div>
            <NavigationBar />
            <div className="WelcomeContainer">
                <div className='HeadlineContainer'>
                    <WelcomeOpener>
                        <img className="welcome-image-2" alt="lion" src={welcomeImage2} width={250} />
                        <img className="welcome-image-1" alt="lion" src={welcomeImage1} width={200} />
                        <h1 className="Headline">
                            בואו לפתח כישורי למידה
                        </h1>
                        <h1 className="Headline">
                            במגוון תחומים ורמות קושי!
                        </h1>
                        <br />
                        <br />
                        <h1 className="Headline">
                            שפרו את השפה, ההבנה החזותית, החשיבה, הדימיון
                        </h1>
                        <h1 className="Headline">
                            ומיומנויות למידה נוספות!
                        </h1>
                        <br />
                        <br />
                        <Button onClick={ExecuteScroll} className="welcome-start-button">לחצו פה כדי להתחיל</Button>
                        <div className="welcome-background-line-container"><img alt="line" src={welcomeBackgroundLine} height={200} /></div>

                    </WelcomeOpener>
                </div>
            </div >
            <WelcomeOpener >
                <div className='d-flex flex-column align-items-center'>
                    <div className='para'>
                        <img className='welcome-icon welcome-icon-right' onClick={() => RedirectToGamesAndFilterByTopic("מוטוריקה")} alt="pick-topic" src={reactionIcon} width={300} />
                        <img className='welcome-icon' onClick={() => RedirectToGamesAndFilterByTopic("התאמה")} alt="pick-topic" src={vocabIcon} width={300} />
                        <img className='welcome-icon welcome-icon-left' onClick={() => RedirectToGamesAndFilterByTopic("קישוריות")} alt="pick-topic" src={understandIcon} width={300} />
                    </div>
                    <Button ref={scrollToElementRef} className="welcome-more-button">לפיתוח תחומים נוספים לחצו כאן</Button>
                </div>
            </WelcomeOpener>
        </div>

    )
}