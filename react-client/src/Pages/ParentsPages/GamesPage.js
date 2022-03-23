import MemoryGame from "../../Games/MemoryGame/MemoryGame";
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

// import jsonNumberAndCount from '../../Games/MemoryGame/CardLists/NumberAndCountCardsList.json'

//  JSON Cards list
import jsonMatchCards from '../../Games/MemoryGame/CardLists/MatchCardsList.json'
import jsonOppositesCards from '../../Games/MemoryGame/CardLists/OppositesCardsList.json'
import jsonNumberAndCountCards from '../../Games/MemoryGame/CardLists/NumberAndCountCardsList.json'
import jsonSpotTheDifferences from "../../Games/SpotTheDifference/SpotTheDifference";
// import SpotTheDifference from "../../Games/SpotTheDifference/SpotTheDifference";
import SpotTheDifference from "../../Games/SpotTheDifference/SpotTheDifference";


import { useHistory } from "react-router-dom";
import { useEffect } from "react";

const GAMES_MENU_ID = 0;
//TODO: Match id to database id
const GAMES = [
  {
    name: "שיוך",
    description: "תיאור משחק זיכרון",
    id: 1,
    path: "/Match",
    component: MemoryGame,
    jsonData: jsonMatchCards,
  },
  {
    name: "הפכים",
    description: "תיאור הפכים",
    path: "/Opposites",
    id: 2,
    component: MemoryGame,
    jsonData: jsonOppositesCards,
  },
  {
    name: "מספר וכמות",
    description: "תיאור מספר וכמות",
    path: "/NumberAndCount",
    id: 18,
    component: MemoryGame,
    jsonData: jsonNumberAndCountCards,
  },
  {
    name: "חשבון?",
    description: "",
    path: "/yee",
    id: 4,
    component: MatchCardsGame,
    jsonData: jsonMatchCards,
  },
  {
    name: "מצא את ההבדלים",
    description: "תיאור מצא את ההבדלים",
    id: 5,
    path: "/SpotTheDifferences",
    component: SpotTheDifference,
    jsonData: jsonSpotTheDifferences,
  },
];


export default function GamesPage({ UpdateChildrenProfiles }) {
  // const [showScoreModal, setShowScoreModal] = useState(false);
  // const [score, setScore] = useState(0);
  // const history = useHistory();

  // async function EndGame(score, gameId) {

  //   history.push('/Parent/Games')

  //   let evaluationScoreData = {
  //     childId: JSON.parse(sessionStorage.getItem('currentChild')).Id,
  //     gameId: gameId,
  //     gameScore: score,
  //   }

  //   ParentsApiRequest('POST', 'UpdateEvaluationScore', evaluationScoreData)
  //     .catch(err => console.log(err))
  //     .then(() => {

  //       // setScore(score);
  //       // setShowScoreModal(true);

  //     })
  // }



  function UserHasChildren() {
    let children = JSON.parse(sessionStorage.getItem('children'));
    let hasChildren = false;

    console.log(children);
    if (children && children.length > 0) {
      hasChildren = true;
    }

    return hasChildren;
  }

  // function CloseScoreModal() {
  //   setShowScoreModal(false);
  //   UpdateChildrenProfiles();
  // }


  return (
    <div>
      <ParentMainPage>

        <h1>משחקים</h1>

        {
          UserHasChildren() === true
            ?
            <GamePreviewCardsGrid Games={GAMES} />
            :
            <NoChildrenMessage />
        }


      </ParentMainPage>
    </div>
  )
}


export function GameRoutes() {
  return (
    <>
      {
        GAMES.map((game, index) => {
          return (
            <ProtectedRoute key={index} exact path={GAMES_PATH_PREFIX + game.path} Component={
              () => <GameTemplate CardsJSON={game.jsonData} GameId={game.id} GameComponent={game.component} GameName={game.name} />
            } />
          )
        })
      }
    </>
  )
}