import { Col, Container, Row } from "react-bootstrap";
import GamePreviewCard from "./GamePreviewCard";
import Img from '../../../images/download.jpg'
import './GamePreviewCardsGrid.scss'

export default function GamePreviewCardsGrid({ PreviewCards }) {



  return (
    <div >
      <Container fluid="sm" className="p-5">
        <Row className="gy-4">
          {
            PreviewCards.map((card, index) => {
              return (
                <Col md='4'>
                  <GamePreviewCard key={index} Name={card.gameName} Description="תיאור" PreviewImage={Img} />
                </Col>
              )
            })
          }
        </Row>
      </Container>
      {/* <Container fluid>
        <Row>
          <Col>hello</Col>
          <Col>hello</Col>
          <Col>hello</Col>
          <Col>hello</Col>
          <Col>hello</Col>
        </Row>
        <Row>
          <Col>hello</Col>
          <Col>hello</Col>
          <Col>hello</Col>
          <Col>hello</Col>
          <Col>hello</Col>
        </Row> */}
      {/* <Row>
          {PreviewCards.map(card => (
            <div key={card.id} id="cardItem" className="col-xs-1">
              {/* <MovieCard film={card} /> */}
      {/* <GamePreviewCard Name="משחק הזיכרון" Description="תיאור" PreviewImage={Img} /> */}

      {/* </div>
          ))}
        </Row> */}
      {/* </Container> */}
    </div>
  )
}

