import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap'

function NavigationBar() {
  return (
    <div dir="rtl">
      <Navbar bg="danger" variant="dark">
        <Container fluid className="h-25">
          <Navbar.Brand href="#home">בית</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#home">משחקייה</Nav.Link>
            <Nav.Link href="#features">פניות</Nav.Link>
            <Nav.Link href="#pricing">אודות</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </div>
  )
}

export default NavigationBar