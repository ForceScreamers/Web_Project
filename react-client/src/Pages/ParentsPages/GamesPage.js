import ParentNavigationBar from "../../Components/ParentsComponents/ParentNavigationBar";
import MemoryGame from "../../Games/MemoryGame/MemoryGame";
import ParentMainPage from "../../Components/ParentsComponents/ParentMainPage"
import GamePreviewCard from "../../Components/GeneralComponents/GamesComponents/GamePreviewCard";
import Img from '../../images/download.jpg'
import GamePreviewCardsGrid from "../../Components/GeneralComponents/GamesComponents/GamePreviewCardsGrid";
import { useState, useEffect } from "react";
import axios from "axios";
import GameTemplate from "../../Games/GameTemplate";

const GAMES_MENU_ID = -1;

export default function GamesPage() {

  const [currentGameId, setCurrentGameId] = useState(GAMES_MENU_ID);


  console.log(process.env.REACT_APP_REQUEST_TIMEOUT_LENGTH)
  //TODO: Create game template
  //TODO: Add return to games menu when clicking the games page


  function HandleExit(score, gameId) {
    alert("testing" + score);
    console.log(score);

    axios({
      method: 'POST',
      url: "http://localhost:5000/api/Parent/UpdateEvaluationScore",
      timeout: process.env.REACT_APP_REQUEST_TIMEOUT_LENGTH,
      headers: {
        'childId': JSON.parse(sessionStorage.getItem('currentChild')).Id,
        'gameId': gameId,
        'gameScore': score,
      }
    })
      .catch(err => console.log(err))
      .then(() => {

        //  Reset the current game id
        setCurrentGameId(GAMES_MENU_ID);
      })
  }



  //Mock data
  const GAMES = [
    {
      name: "משחק הזיכרון",
      description: "תיאור משחק זיכרון",
      id: 1,
      gameComponent: <GameTemplate HandleExit={HandleExit} GameId={4}>
        <MemoryGame />
      </GameTemplate>
    },
    {
      name: "צורות",
      description: "תיאור צורות",
      id: 2,
    },
    {
      name: "פאזל",
      description: "תיאור פאזל",
      id: 3,
    },
  ];


  const HandlePlay = (gameId) => {
    //  Play the game by the given id
    //  the ids come from the db

    setCurrentGameId(gameId);
    console.log(gameId);
  }



  const RenderCurrentGame = () => {
    let gameToRender = <div>Hello!</div>
    GAMES.forEach(game => {
      if (game.id === currentGameId) {
        gameToRender = game.gameComponent;
      }
    })

    return gameToRender;
  }

  return (
    <div>
      <ParentMainPage>

        <h1>משחקים</h1>

        {
          currentGameId === GAMES_MENU_ID ?
            <GamePreviewCardsGrid HandlePlay={HandlePlay} Games={GAMES} />
            :
            RenderCurrentGame()
        }

      </ParentMainPage>
    </div>
  )
}