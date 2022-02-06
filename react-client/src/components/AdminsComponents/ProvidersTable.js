import { Col } from "react-bootstrap";
import { Row, Container } from "react-bootstrap";
import ProviderRow from "./ProviderRow";

export default function ProvidersTable({ Providers }) {
  return <Container fluid>

    {
      Providers.map((provider, index) => {
        return (
          <ProviderRow Provider={provider} key={index} Index={index} />
        )
      })
    }
  </Container>;
}
