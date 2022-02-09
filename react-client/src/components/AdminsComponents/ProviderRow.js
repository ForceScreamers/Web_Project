import { Col, Button, Row } from 'react-bootstrap';

export default function ProviderRow({ Provider, Index, ConfirmProvider }) {
  return <Row style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: Index % 2 == 0 ? 'skyblue' : 'lightblue', marginTop: 3 }}>
    <ProviderTableCol Text={Provider.FullName} />
    <ProviderTableCol Text={Provider.Email} />
    <ProviderTableCol Text={Provider.PhoneNumber} />
    <ProviderTableCol Text={Provider.Occupation} />
    <ProviderTableCol Text={Provider.Workplace} />
    <Col>
      <Button onClick={() => ConfirmProvider(Provider.Id)}>confirm</Button>
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

//  The provider object contains
// Email
// Experience
// FullName
// Id
// Occupation
// PhoneNumber
// Posts
// Workplace
