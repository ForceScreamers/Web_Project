import ParentNavigationBar from "../Components/ParentsComponents/ParentNavigationBar";
import MemoryGame from "../../Games/MemoryGame/MemoryGame";

export default function Games() {

  return (
    <div>
      <ParentNavigationBar />
      <h1>Games</h1>
      <MemoryGame />
    </div>
  )
}