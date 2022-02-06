import { Col, Button, Row } from 'react-bootstrap';

export default function ProviderRow({ Provider, Index }) {
  return <Row style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: Index % 2 == 0 ? 'skyblue' : 'lightblue', marginTop: 3 }}>
    <Col>{Provider.name}</Col>
    <Col>{Provider.email}</Col>
    <Col>{Provider.phone}</Col>
    <Col style={{ marginRight: 300 }}>
      <Button>confirm</Button>
    </Col>
  </Row>;
}
