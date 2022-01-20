import ParentNavigationBar from "../../Components/ParentsComponents/ParentNavigationBar";
import MemoryGame from "../../Games/MemoryGame/MemoryGame";
import ParentMainPage from "../../Components/ParentsComponents/ParentMainPage"
import GamePreviewCard from "../../Components/GeneralComponents/GamesComponents/GamePreviewCard";
import Img from '../../images/download.jpg'
import GamePreviewCardsGrid from "../../Components/GeneralComponents/GamesComponents/GamePreviewCardsGrid";
import { useState, useEffect } from "react";
import axios from "axios";
import GameTemplate from "../../Games/GameTemplate";

export default function GamesPage() {

  const [currentGameId, setCurrentGameId] = useState(-1);


  console.log(process.env.REACT_APP_REQUEST_TIMEOUT_LENGTH)
  //TODO: get games from db
  const GetGamesFromApi = async () => {
    return axios({
      method: 'GET',
      url: "http://localhost:5000/api/Parent/GetGames",
      timeout: process.env.REACT_APP_REQUEST_TIMEOUT_LENGTH,
    })
      .catch(err => console.log(err))
      .then(response => {
        console.log(response)

      })

  }

  useEffect(() => {
    console.log("Getting games...")

  }, [])



  //TODO: Create game template
  //TODO: Add ADDeval when leaving or finishing 
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
      .then(response => {
        console.log(response)

      })
    //  Send the game score to the webapi
    //  Game score: The time it took the player to complete
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

        <h1>Games</h1>


        {
          currentGameId === -1 ?
            <GamePreviewCardsGrid HandlePlay={HandlePlay} Games={GAMES} />
            :
            RenderCurrentGame()
        }


        {/* <GamePreviewCard Name="משחק הזיכרון" Description="תיאור" PreviewImage={Img} /> */}


        {/* <MemoryGame /> */}
      </ParentMainPage>
    </div>
  )
}