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
import SpotTheDifference from "../../Games/SpotTheDifference/SpotTheDifference";

const GAMES_MENU_ID = 0;

export default function GamesPage({ UpdateChildrenProfiles }) {

  const [currentGameId, setCurrentGameId] = useState(GAMES_MENU_ID);

  const [showScoreModal, setShowScoreModal] = useState(false);
  const [score, setScore] = useState(0);


  function ExitGame() {
    setCurrentGameId(GAMES_MENU_ID);
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
        setCurrentGameId(GAMES_MENU_ID);

        setScore(score);
        setShowScoreModal(true);

      })
  }





  //Mock data
  const GAMES = [
    {
      name: "שיוך",
      description: "תיאור משחק זיכרון",
      id: 1,
      gameComponent: <GameTemplate ExitGame={ExitGame} CardsJSON={jsonMatchCards} EndGame={EndGame} GameId={9} GameComponent={MemoryGame} GameName="שיוך" />
    },
    {
      name: "הפכים",
      description: "תיאור הפכים",
      id: 2,
      gameComponent: <GameTemplate ExitGame={ExitGame} CardsJSON={jsonOppositesCards} EndGame={EndGame} GameId={10} GameComponent={MemoryGame} GameName="הפכים" />

    },
    {
      name: "מספר וכמות",
      description: "תיאור מספר וכמות",
      id: 3,
      gameComponent: <GameTemplate ExitGame={ExitGame} CardsJSON={jsonNumberAndCountCards} EndGame={EndGame} GameId={11} GameComponent={MemoryGame} GameName="מספר וכמות" />
    },
    {
      name: "המשך תבנית",
      description: "",
      id: 4,
      gameComponent: <GameTemplate ExitGame={ExitGame} EndGame={EndGame} GameId={8} GameComponent={MatchCardsGame} GameName="התאמה" />
    },
    {
      name: "מצא את ההבדלים",
      description: "תיאור מצא את ההבדלים",
      id: 5,
      gameComponent: <GameTemplate ExitGame={ExitGame} EndGame={EndGame} GameId={0} GameComponent={SpotTheDifference} GameName="מצא את ההבדלים" />
    },
  ];


  function HandlePlay(gameId) {
    setCurrentGameId(gameId);
  }


  function RenderCurrentGame() {
    let gameToRender = <div>Hello!</div>
    GAMES.forEach(game => {
      if (game.id === currentGameId) {
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

        //  Show grid
        return <GamePreviewCardsGrid HandlePlay={HandlePlay} Games={GAMES} />
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
          RenderGamesPage()
        }
        <ShowScoreModal ShowScoreModal={showScoreModal} CloseScoreModal={CloseScoreModal} Score={score} />


      </ParentMainPage>
    </div>
  )
}