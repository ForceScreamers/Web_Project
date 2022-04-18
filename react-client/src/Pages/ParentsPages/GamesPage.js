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


//  Import Games
import SpotTheDifference from '../../Games/SpotTheDifference/SpotTheDifference'
import MemoryGame from "../../Games/MemoryGame/MemoryGame";


import { useHistory } from "react-router-dom";
import { useEffect } from "react";


import { GAME_DIFFICULTY } from "../../Constants";
import AssociationsGame from "../../Games/AssociationsGame/AssociationsGame";

const DEFAULT_DIFFICULTY = GAME_DIFFICULTY.EASY;

//TODO: Get game names from db

let presetGames = [
  {
    name: "שיוך",
    description: "תיאור משחק זיכרון",
    id: 12,
    path: "/Match",
    component: MemoryGame,
    jsonData: jsonMatchCards,
    selectedDifficulty: DEFAULT_DIFFICULTY,
  },
  {
    name: "הפכים",
    description: "תיאור הפכים",
    path: "/Opposites",
    id: 13,
    component: MemoryGame,
    jsonData: jsonOppositesCards,
    selectedDifficulty: DEFAULT_DIFFICULTY,

  },
  {
    name: "מספר וכמות",
    description: "תיאור מספר וכמות",
    path: "/NumberAndCount",
    id: 14,
    component: MemoryGame,
    jsonData: jsonNumberAndCountCards,
    selectedDifficulty: DEFAULT_DIFFICULTY,

  },
  {
    name: "תרגילי כפל",
    description: "",
    path: "/yee",
    id: 15,
    component: MatchCardsGame,
    jsonData: jsonMatchCards,
    selectedDifficulty: DEFAULT_DIFFICULTY,

  },
  {
    name: "מצא את ההבדלים",
    description: "תיאור מצא את ההבדלים",
    id: 16,
    path: "/SpotTheDifferences",
    component: SpotTheDifference,
    jsonData: jsonSpotTheDifferences,
    selectedDifficulty: DEFAULT_DIFFICULTY,

  },
  {
    name: "אסוסיאציות",
    description: "תיאור אסוסיאציות",
    id: 16,
    path: "/AssociationsGame",
    component: AssociationsGame,
    jsonData: jsonAssociationsGame,
    selectedDifficulty: DEFAULT_DIFFICULTY,
  },
]

export default function GamesPage() {
  const [games, setGames] = useState(presetGames);

  function ChangeDifficulty(gameId, selectedDifficulty) {

    let cloneGames = [...games];

    for (let cloneGame of cloneGames) {
      console.log(cloneGame.id, gameId)

      if (cloneGame.id === gameId) {
        cloneGame.selectedDifficulty = selectedDifficulty;
      }
    }

    setGames(cloneGames)
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
              Games={games}
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
  return (
    <>
      {
        presetGames.map((game, index) => {
          return (
            <ProtectedRoute key={index} exact path={GAMES_PATH_PREFIX + game.path} Component={
              () => <GameTemplate
                CardsJSON={game.jsonData}
                GameId={game.id}
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