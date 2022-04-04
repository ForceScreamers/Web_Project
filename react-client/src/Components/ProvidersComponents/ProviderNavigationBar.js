import { Navbar, Container, Nav } from 'react-bootstrap'
import { Link } from "react-router-dom"
import LogoutButton from '../GeneralComponents/LogoutButton';

export default function ProviderNavigationBar() {

  return (
    <div dir="rtl" >
      <Navbar collapseOnSelect expand="lg" bg="secondary" variant="dark">
        <Container fluid className="h-25">

          <Navbar.Brand style={{ fontSize: 35, color: 'black', }} className="fw-bold" href="">בעלי מקצוע</Navbar.Brand>

          {/* <Navbar.Brand href="">כפתור בית</Navbar.Brand> */}

          <Navbar.Brand> מחובר בתור: {JSON.parse(sessionStorage.getItem('Info')).FullName}</Navbar.Brand>


          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Link to="/Provider/Games" className="nav-link">משחקים</Link>
              <Link to="/Provider/PublishArticle" className="nav-link">פרסום מאמר</Link>
              {/* <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">דברים</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">עוד דברים</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">עוד דברים</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
              </NavDropdown> */}

              {/* <Button onClick={LogoutUser} variant='danger'>יציאה</Button> */}
              <LogoutButton />

            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div >
  )
}