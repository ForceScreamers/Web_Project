import ParentNavigationBar from "../../Components/ParentsComponents/ParentNavigationBar";
import MemoryGame from "../../Games/MemoryGame/MemoryGame";
import ParentMainPage from "../../Components/ParentsComponents/ParentMainPage"

export default function Games() {

  return (
    <div>
      <ParentMainPage>
        <h1>Games</h1>
        <MemoryGame />
      </ParentMainPage>
    </div>
  )
}