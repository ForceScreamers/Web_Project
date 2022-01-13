import ParentNavigationBar from "../../Components/ParentsComponents/ParentNavigationBar";
import MemoryGame from "../../Games/MemoryGame/MemoryGame";
import ParentMainPage from "../../Components/ParentsComponents/ParentMainPage"
import GamePreviewCard from "../../Components/GeneralComponents/GamesComponents/GamePreviewCard";
import Img from '../../images/download.jpg'

export default function Games() {

  return (
    <div>
      <ParentMainPage>

        <h1>Games</h1>

        <GamePreviewCard Name="משחק הזיכרון" Description="תיאור" PreviewImage={Img} />


        <MemoryGame />
      </ParentMainPage>
    </div>
  )
}