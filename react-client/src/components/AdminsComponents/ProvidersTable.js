import { Container } from "react-bootstrap";
import ProviderRow from "./ProviderRow";
import ProviderHeadersRow from "./ProviderHeadersRow";

const headers = ['שם מלא', 'כתובת מייל', 'מספר טלפון', 'תעסוקה', 'מקום עבודה', 'אישור'];

export default function ProvidersTable({ ProviderInfos, ConfirmProvider }) {

  return <Container fluid>
    {/* <Row>
      <Col>שם מלא</Col>
      <Col>שם מלא</Col>
      <Col>שם מלא</Col>
      <Col>שם מלא</Col>
    </Row> */}
    <ProviderHeadersRow Headers={headers} />

    {
      ProviderInfos.map((provider, index) => {
        return (
          <ProviderRow Provider={provider} ConfirmProvider={ConfirmProvider} key={index} Index={index} />
        )
      })
    }
  </Container>;
}
