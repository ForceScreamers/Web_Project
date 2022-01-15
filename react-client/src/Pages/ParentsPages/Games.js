import ParentNavigationBar from "../../Components/ParentsComponents/ParentNavigationBar";
import MemoryGame from "../../Games/MemoryGame/MemoryGame";
import ParentMainPage from "../../Components/ParentsComponents/ParentMainPage"
import GamePreviewCard from "../../Components/GeneralComponents/GamesComponents/GamePreviewCard";
import Img from '../../images/download.jpg'
import GamePreviewCardsGrid from "../../Components/GeneralComponents/GamesComponents/GamePreviewCardsGrid";
import { useState } from "react";

export default function Games() {

  const [currentGame, setCurrentGame] = useState();

  //TODO: get games from db
  const GAMES = [
    {
      gameName: "משחק הזיכרון",
      game: MemoryGame,
    },
    {
      gameName: "צורות",
      game: null,
    },
    {
      gameName: ""
    },



  ];


  return (
    <div>
      <ParentMainPage>

        <h1>Games</h1>


        <GamePreviewCardsGrid PreviewCards={GAMES} />


        {/* <GamePreviewCard Name="משחק הזיכרון" Description="תיאור" PreviewImage={Img} /> */}


        {/* <MemoryGame /> */}
      </ParentMainPage>
    </div>
  )
}