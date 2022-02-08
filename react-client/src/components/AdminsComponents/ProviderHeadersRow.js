import { Row, Col } from 'react-bootstrap'

export default function ProviderTableHeaders({ Headers }) {
  return (
    <Row>
      {
        Headers.map((header, index) => {
          return (
            <Col key={index}>
              {header}
            </Col>
          )
        })
      }
    </Row>
  );
}
