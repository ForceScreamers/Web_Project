import ParentNavigationBar from "../../Components/ParentsComponents/ParentNavigationBar";
import MemoryGame from "../../Games/MemoryGame/MemoryGame";
import ParentMainPage from "../../Components/ParentsComponents/ParentMainPage"
import GamePreviewCard from "../../Components/GeneralComponents/GamesComponents/GamePreviewCard";
import Img from '../../images/download.jpg'
import GamePreviewCardsGrid from "../../Components/GeneralComponents/GamesComponents/GamePreviewCardsGrid";
import { useState, useEffect } from "react";
import axios from "axios";

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


  GetGamesFromApi();

  const DatabaseGamesTo = () => {
    //  foreach game
    //  if the game id of the component matches 

    //  Send the data from the game with the matching id to the database upon exiting or finishing the game

  }


  //TODO: Create game template
  //TODO: Add ADDeval when leaving or finishing 
  //TODO: Add return to games menu when clicking the games page

  //Mock data
  const GAMES = [
    {
      name: "משחק הזיכרון",
      description: "תיאור משחק זיכרון",
      id: 1,
      gameComponent: <MemoryGame />
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