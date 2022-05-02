import { Col, Container, Row } from "react-bootstrap";
import GamePreviewCard from "./GamePreviewCard";
import Img from '../../../images/download.jpg'
import './GamePreviewCardsGrid.scss'
import { GAME_DIFFICULTY } from "../../../Constants";

export default function GamePreviewCardsGrid({ Games, ChangeDifficulty, GamesDifficulties }) {
  console.log(Games);

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
    <div >
      <Container fluid="sm" className="p-5">
        <Row className="gy-4">
          {
            Games === null
              ? <></>
              :
              Games?.map((game, index) => {
                return (
                  <Col md='4' key={index}>
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
                  </Col>
                )
              })
          }
        </Row>
      </Container>
    </div>
  )
}

