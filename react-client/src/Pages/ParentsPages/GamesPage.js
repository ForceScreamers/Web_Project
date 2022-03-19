import MemoryGame from "../../Games/MemoryGame/MemoryGame";
import ParentMainPage from "../../Components/ParentsComponents/ParentMainPage"
import GamePreviewCard from "../../Components/GeneralComponents/GamesComponents/GamePreviewCard";
import Img from '../../images/download.jpg'
import GamePreviewCardsGrid from "../../Components/GeneralComponents/GamesComponents/GamePreviewCardsGrid";
import { useState } from "react";
import GameTemplate from "../../Games/GameTemplate";
import { ParentsApiRequest } from "../../RequestHeadersToWebApi";
import MatchCardsGame from "../../Games/MatchCardsGame/MatchCardsGame";
import NoChildrenMessage from "../../Components/ParentsComponents/GamesPageComponents/NoChildrenMessage";

import ShowScoreModal from "../../Games/ShowScoreModal";



//  JSON Cards list
import jsonMatchCards from '../../Games/MemoryGame/CardLists/MatchCardsList.json'
import jsonOppositesCards from '../../Games/MemoryGame/CardLists/OppositesCardsList.json'
import jsonNumberAndCountCards from '../../Games/MemoryGame/CardLists/NumberAndCountCardsList.json'

const GAMES_MENU_ID = 0;

const MENU_COMPONENT = "Hello";

export default function GamesPage({ UpdateChildrenProfiles }) {

  const [currentGame, setCurrentGame] = useState(MENU_COMPONENT)

  // const [currentGameId, setCurrentGameId] = useState(GAMES_MENU_ID);

  const [showScoreModal, setShowScoreModal] = useState(false);
  const [score, setScore] = useState(0);


  function ExitToMenu() {
    // setCurrentGameId(GAMES_MENU_ID);
    setCurrentGame(MENU_COMPONENT);
  }

  async function EndGame(score, gameId) {

    let evaluationScoreData = {
      childId: JSON.parse(sessionStorage.getItem('currentChild')).Id,
      gameId: gameId,
      gameScore: score,
    }

    ParentsApiRequest('POST', 'UpdateEvaluationScore', evaluationScoreData)
      .catch(err => console.log(err))
      .then(() => {
        // setCurrentGameId(GAMES_MENU_ID);
        ExitToMenu();

        setScore(score);
        setShowScoreModal(true);

      })
  }





  //TODO: Reconfigure with links instead of react components



  /**
   * GameComponent = {
   *  game jsx element
   *  id
   * }
   */

  /**
   * GameCard = {
   *  name
   *  desc
   *  id
   * }
   */


  const GAMES = [
    {
      name: "שיוך",
      description: "תיאור משחק זיכרון",
      gameComponent: <GameTemplate ExitGame={ExitToMenu} CardsJSON={jsonMatchCards} EndGame={EndGame} GameId={9} GameComponent={MemoryGame} />
    },
    {
      name: "הפכים",
      description: "תיאור התאמת קלפים",
      gameComponent: <GameTemplate ExitGame={ExitToMenu} CardsJSON={jsonOppositesCards} EndGame={EndGame} GameId={10} GameComponent={MemoryGame} />
    },
    {
      name: "מספר וכמות",
      description: "תיאור מספר וכמות",
      gameComponent: <GameTemplate ExitGame={ExitToMenu} CardsJSON={jsonNumberAndCountCards} EndGame={EndGame} GameId={11} GameComponent={MemoryGame} />
    },
    {
      name: "המשך תבנית",
      description: "",
      gameComponent: <GameTemplate ExitGame={ExitToMenu} EndGame={EndGame} GameId={8} GameComponent={MatchCardsGame} />
      // gameComponent: <MatchCardsGame />
      //      <GameComponent SetHasEnded={setHasEnded} CardsJSON={CardsJSON} Time={secondsLeft} GameName={GameName} />

    },
  ];


  function HandlePlay(gameId) {
    setCurrentGameId(gameId);
  }


  function RenderCurrentGame() {
    //TODO: Show as error
    let gameToRender = <div>Hello!</div>


    GAMES.forEach(game => {
      if (game.id === currentGameId) {
        // <GameTemplate ExitGame={ExitGame} EndGame={EndGame} GameId={ } GameComponent={ } />
        gameToRender = game.gameComponent;
      }
    })

    return gameToRender;
  }


  function DoesUserHaveChildren() {
    let children = JSON.parse(sessionStorage.getItem('children'));
    let hasChildren = false;

    console.log(children);
    if (children && children.length > 0) {
      hasChildren = true;
    }

    return hasChildren;
  }


  function RenderGamesPage() {

    if (DoesUserHaveChildren() === true) {

      if (currentGameId === GAMES_MENU_ID) {

        return <GameTemplate GameName={currentGame.name} />
        //  Show grid
        // return <GamePreviewCardsGrid HandlePlay={HandlePlay} Games={GAMES} />
      }
      else {

        return RenderCurrentGame()
      }
    }

    return <NoChildrenMessage />
  }


  function CloseScoreModal() {
    setShowScoreModal(false);
    UpdateChildrenProfiles();
  }


  return (
    <div>
      <ParentMainPage>

        <h1>משחקים</h1>
        {
          DoesUserHaveChildren()
            ? RenderCurrentGame()
            : <NoChildrenMessage />
        }

        <ShowScoreModal ShowScoreModal={showScoreModal} CloseScoreModal={CloseScoreModal} Score={score} />


      </ParentMainPage>
    </div>
  )
}