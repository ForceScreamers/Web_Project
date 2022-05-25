import { Col, Container, Row } from "react-bootstrap";
import GamePreviewCard from "./GamePreviewCard";
import Img from '../../../images/download.jpg'
import './GamePreviewCardsGrid.css'
import { GAME_DIFFICULTY } from "../../../Constants";

import Masonry from "react-masonry-css";


const breakpointColumnsObj = {
  default: 3,
  2000: 2,
  1300: 1,
};

export default function GamePreviewCardsGrid({ Games, ChangeDifficulty, GamesDifficulties }) {

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
    <div className="d-flex justify-content-center align-items-center">
      <Masonry className="game-preview-cards-grid" breakpointCols={breakpointColumnsObj}>
        {
          Games === null
            ? <></>
            :
            Games?.map((game, index) => {
              return (
                <GamePreviewCard
                  GamePath={game.path}
                  GameId={game.Id}
                  Name={game.Name}
                  Description={game.Description}
                  PreviewImage={Img}
                  Topics={game.Topics}
                  ChangeDifficulty={ChangeDifficulty}
                  SelectedDifficulty={GetGameDifficultyById(game.Id)}
                />
              )
            })
        }
      </Masonry>
    </div>
  )
}

