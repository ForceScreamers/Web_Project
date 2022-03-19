import { Col, Container, Row } from "react-bootstrap";
import GamePreviewCard from "./GamePreviewCard";
import Img from '../../../images/download.jpg'
import './GamePreviewCardsGrid.scss'

export default function GamePreviewCardsGrid({ Games, HandlePlay }) {



  return (
    <div >
      <Container fluid="sm" className="p-5">
        <Row className="gy-4">
          {
            Games.map((game, index) => {
              return (
                <Col md='4' key={index}>
                  <GamePreviewCard
                    HandlePlay={HandlePlay}
                    Name={game.name}
                    Description={game.description}
                    GameId={game.id}
                    PreviewImage={Img} />
                </Col>
              )
            })
          }
        </Row>
      </Container>
    </div>
  )
}

