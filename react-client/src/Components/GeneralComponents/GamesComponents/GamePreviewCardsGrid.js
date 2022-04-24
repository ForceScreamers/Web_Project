import { Col, Container, Row } from "react-bootstrap";
import GamePreviewCard from "./GamePreviewCard";
import Img from '../../../images/download.jpg'
import './GamePreviewCardsGrid.scss'

export default function GamePreviewCardsGrid({ Games, ChangeDifficulty }) {



  return (
    <div >
      <Container fluid="sm" className="p-5">
        <Row className="gy-4">
          {
            Games.map((game, index) => {
              return (
                <Col md='4' key={index}>
                  <GamePreviewCard
                    GamePath={game.path}
                    GameId={game.dbId}
                    Name={game.name}
                    Description={game.description}
                    PreviewImage={Img}
                    ChangeDifficulty={ChangeDifficulty}
                    SelectedDifficulty={game.selectedDifficulty}
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

