import { Col, Button, Row } from 'react-bootstrap';

export default function ProviderRow({ Provider, Index }) {
  return <Row style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: Index % 2 == 0 ? 'skyblue' : 'lightblue', marginTop: 3 }}>
    <ProviderTableCol Text={Provider.FullName} />
    <ProviderTableCol Text={Provider.Email} />
    <ProviderTableCol Text={Provider.PhoneNumber} />
    <ProviderTableCol Text={Provider.Occupation} />
    <ProviderTableCol Text={Provider.Workplace} />
    {/* <Col>{Provider.Workplace === null ? "-" : Provider.Workplace}</Col> */}
    <Col>
      <Button>confirm</Button>
    </Col>
  </Row>;
}

function ProviderTableCol({ Text }) {
  return (
    <Col>
      {Text === null ? "-" : Text}
    </Col>
  )
}


// Email: "TestEmail"
// Experience: null
// FullName: "TestUsername"
// Id: 9
// Occupation: "Child devourer"
// PhoneNumber: null
// Posts: null
// Workplace: null
