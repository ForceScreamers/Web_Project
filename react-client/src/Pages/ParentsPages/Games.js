import ParentNavigationBar from "../../Components/ParentsComponents/ParentNavigationBar";
import MemoryGame from "../../Games/MemoryGame/MemoryGame";
import ParentMainPage from "../../Components/ParentsComponents/ParentMainPage"
import GamePreviewCard from "../../Components/GeneralComponents/GamesComponents/GamePreviewCard";
import Img from '../../images/download.jpg'
import GamePreviewCardsGrid from "../../Components/GeneralComponents/GamesComponents/GamePreviewCardsGrid";

export default function Games() {

  const GAMES = ['', '', '', '', '', ''];

  return (
    <div>
      <ParentMainPage>

        <h1>Games</h1>

        {/* <GamePreviewCardsGrid /> */}
        {/* <GamePreviewCard Name="משחק הזיכרון" Description="תיאור" PreviewImage={Img} /> */}


        {/* <MemoryGame /> */}
      </ParentMainPage>
    </div>
  )
}