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

import { GAMES_PATH_PREFIX } from "../../Constants";
import ProtectedRoute from "../../Components/GeneralComponents/ProtectedRoute";


//  JSON Cards list
import jsonMatchCards from '../../Games/MemoryGame/CardLists/MatchCardsList.json'
import jsonOppositesCards from '../../Games/MemoryGame/CardLists/OppositesCardsList.json'
import jsonNumberAndCountCards from '../../Games/MemoryGame/CardLists/NumberAndCountCardsList.json'
import jsonSpotTheDifferences from '../../Games/SpotTheDifference/SpotTheDifferenceSetsList.json'
import jsonAssociationsGame from '../../Games/AssociationsGame/AssociationsGameCards.json'
import CardMatchList from '../../Games/MatchCardsGame/CardMatchList.json'

//  Import Games
import SpotTheDifference from '../../Games/SpotTheDifference/SpotTheDifference'
import MemoryGame from "../../Games/MemoryGame/MemoryGame";


import { useHistory } from "react-router-dom";
import { useEffect } from "react";


import { GAME_DIFFICULTY } from "../../Constants";
import AssociationsGame from "../../Games/AssociationsGame/AssociationsGame";

const DEFAULT_DIFFICULTY = GAME_DIFFICULTY.EASY;

//TODO: Get game names from db

class Game {
  constructor(name, description, dbId, path, component, jsonData) {
    this.name = name;
    this.description = description;
    this.dbId = dbId;
    this.path = path;
    this.component = component;
    this.jsonData = jsonData;
    this.selectedDifficulty = DEFAULT_DIFFICULTY;
  }

  SelectDifficulty(difficulty) {
    this.selectedDifficulty = difficulty;
  }
}

let games = [
  new Game("שיוך", "תיאור משחק זיכרון", 12, "/Match", MemoryGame, jsonMatchCards),
  new Game("הפכים", "תיאור הפכים", 13, "/Opposites", MemoryGame, jsonOppositesCards),
  new Game("מספר וכמות", "תיאור מספר וכמות", 14, "/NumberAndCount", MemoryGame, jsonNumberAndCountCards),
  new Game("תרגילי כפל", "", 15, "/yee", MatchCardsGame, CardMatchList),
  new Game("מצא את ההבדלים", "", 16, "/SpotTheDifferences", SpotTheDifference, jsonSpotTheDifferences),
  new Game("אסוסיאציות", "", 17, "/AssociationsGame", AssociationsGame, jsonAssociationsGame),
]


// sessionStorage.setItem('games', JSON.stringify(presetGames));

export default function GamesPage() {

  const [displayGames, setDisplayGames] = useState(JSON.parse(sessionStorage.getItem('games')));


  useEffect(() => {
    //  Save games to session storage
    sessionStorage.setItem('games', JSON.stringify(displayGames));

    //setDisplayGames(JSON.parse(sessionStorage.getItem('games')));
  }, [])

  function ChangeDifficulty(gameId, newDifficulty) {

    let cloneGames = [...games];
    console.log(newDifficulty);

    for (let cloneGame of cloneGames) {
      //console.log(cloneGame.dbId, gameId)

      if (cloneGame.dbId === gameId) {
        //console.log("He")
        //cloneGame.selectedDifficulty = selectedDifficulty;
        cloneGame.SelectDifficulty(newDifficulty)
        console.log(cloneGame.selectedDifficulty)
      }
    }

    games = cloneGames;

    //  Save games with the new chosen difficulty
    sessionStorage.setItem('games', JSON.stringify(cloneGames));

    //  Update display
    setDisplayGames(JSON.parse(sessionStorage.getItem('games')));
  }


  function UserHasChildren() {
    let children = JSON.parse(sessionStorage.getItem('children'));
    let hasChildren = false;

    console.log(children);
    if (children && children.length > 0) {
      hasChildren = true;
    }

    return hasChildren;
  }


  return (
    <div>
      <ParentMainPage>

        <h1>משחקים</h1>

        {
          UserHasChildren() === true
            ?
            <GamePreviewCardsGrid
              Games={displayGames}
              ChangeDifficulty={ChangeDifficulty}
            />
            :
            <NoChildrenMessage />
        }


      </ParentMainPage>
    </div>
  )
}


export function GameRoutes({ UpdateChildrenProfiles }) {
  const [gamesData, setGamesData] = useState(games);
  console.log(gamesData);

  useEffect(() => {
    setGamesData(JSON.parse(sessionStorage.getItem('games')));
  }, [])


  return (
    <>
      {
        games.map((game, index) => {
          console.log(gamesData)
          return (
            <ProtectedRoute key={index} exact path={GAMES_PATH_PREFIX + game.path} Component={
              () =>
                <GameTemplate
                  CardsJSON={game.jsonData}
                  GameId={game.dbId}
                  GameComponent={game.component}
                  GameName={game.name}
                  Difficulty={game.selectedDifficulty}
                  UpdateChildrenProfiles={UpdateChildrenProfiles}
                />
            } />
          )
        })
      }
    </>
  )
}