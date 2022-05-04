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

import { GAMES_PAGE_SEARCH_VALUE_ALL, GAMES_PATH_PREFIX } from "../../Constants";
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
import { Button } from "react-bootstrap";

import GamesPageSearchField from "./GamesPage/GamesPageSearchField";
const DEFAULT_DIFFICULTY = GAME_DIFFICULTY.EASY;


//TODO: Get game names from db





export default function GamesPage({ GamesDifficulties, SetGamesDifficulties, LoadGamesFromApi, GamesSearchValue, SetGamesSearchValue }) {
  const [gamesToDisplay, setGamesToDisplay] = useState(JSON.parse(sessionStorage.getItem('games')));

  useEffect(() => {
    LoadGamesFromApi();
    setGamesToDisplay(JSON.parse(sessionStorage.getItem('games')));
  }, [])

  useEffect(() => {
    UpdateGamesToDisplayBySearchValue(GamesSearchValue);
  }, [GamesSearchValue])

  function ChangeDifficulty(gameId, selectedDifficulty) {
    let newDifficulties = [...GamesDifficulties];

    for (let difficulty of newDifficulties) {
      if (difficulty.gameId === gameId) {
        difficulty.difficultyLevel = selectedDifficulty;
      }
    }

    SetGamesDifficulties(newDifficulties)
  }


  function UserHasChildren() {
    let hasChildren = false;
    try {
      let children = JSON.parse(sessionStorage.getItem('children'));

      console.log(children);
      if (children && children.length > 0) {
        hasChildren = true;
      }
    }
    catch (e) {
      //  Do nothing
    }

    return hasChildren;
  }


  function UpdateSearchResult(event) {
    let searchValue = event.target.value;

    UpdateGamesToDisplayBySearchValue(searchValue);
    SetGamesSearchValue(searchValue)
    sessionStorage.setItem('gamesSearchValue', searchValue);
  }

  /**
   * Displays the games with the topic value given
   */
  function UpdateGamesToDisplayBySearchValue(value) {
    let games = JSON.parse(sessionStorage.getItem('games'));

    //  If the search is for all games, override the filter function
    if (value === GAMES_PAGE_SEARCH_VALUE_ALL) {
      setGamesToDisplay(games);
    }
    else {
      let filteredGames = FilterGamesByTopic(games, value);
      setGamesToDisplay(filteredGames)
    }
  }


  function FilterGamesByTopic(games, topic) {
    let filteredGames = [];

    //  If one of the game's topics is the searched value
    for (let game of games) {
      if (game.Topics.includes(topic)) {
        filteredGames.push(game);
      }
    }

    return filteredGames;
  }


  return (
    <div>
      <ParentMainPage>

        <h1>משחקים</h1>
        {
          UserHasChildren() === true
            ?
            <>
              <GamesPageSearchField
                UpdateSearchResult={UpdateSearchResult}
                GamesSearchValue={GamesSearchValue}
              />


              <GamePreviewCardsGrid
                Games={gamesToDisplay}
                ChangeDifficulty={ChangeDifficulty}
                GamesDifficulties={GamesDifficulties}
              />
            </>
            :
            <NoChildrenMessage />
        }
      </ParentMainPage>
    </div>
  )
}


export function GameRoutes({ Games, UpdateChildrenProfiles, GamesDifficulties }) {
  function GetGameDifficultyById(gameId) {
    for (let difficulty of GamesDifficulties) {
      if (difficulty.gameId === gameId) {
        return difficulty.difficultyLevel;
      }
    }

    //  Default back to easy difficulty
    return GAME_DIFFICULTY.EASY;
  }

  return (
    <>
      {
        Games.map((game, index) => {
          return (
            <ProtectedRoute key={index} exact path={GAMES_PATH_PREFIX + game.path} Component={
              () => <GameTemplate
                CardsJSON={game.jsonData}
                GameId={game.Id}
                GameComponent={game.component}
                GameName={game.name}
                Difficulty={GetGameDifficultyById(game.Id)}
                UpdateChildrenProfiles={UpdateChildrenProfiles}
              />
            } />
          )
        })
      }
    </>
  )
}