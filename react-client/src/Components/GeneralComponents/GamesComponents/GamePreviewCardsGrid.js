import { Col, Container, Row } from "react-bootstrap";
import GamePreviewCard from "./GamePreviewCard";
import Img from '../../../images/download.jpg'
import './GamePreviewCardsGrid.scss'

export default function GamePreviewCardsGrid({ Games, SetDifficultyLevel }) {



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
                    Name={game.name}
                    Description={game.description}
                    PreviewImage={Img}
                    SetDifficultyLevel={SetDifficultyLevel}
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

