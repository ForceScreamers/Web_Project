import { Navbar, Container, Nav, NavDropdown, NavItem, Button } from 'react-bootstrap'
import { Link } from "react-router-dom"
import { useContext, useEffect, useState } from 'react'
import { NavBarContext } from '../../Contexts/NavBarContext'
import { useHistory } from 'react-router-dom'

//  היומן שלי, שינוי אווטר, עריכת פרופיל, משחקייה, מאמרים, אודותר
//  The main pages are: Games, info, about, edit profile, avatar, journal

export default function ParentNavigationBar() {

  const history = useHistory();

  function LogoutUser() {
    sessionStorage.clear();
    history.replace("/");
  }



  //  If there's no child
  console.log(useContext(NavBarContext))
  //const currentChildNameFromContext = useContext(NavBarContext).child.Name;
  const usernameFromContext = useContext(NavBarContext).username;
  const currentChildFromContext = useContext(NavBarContext).child;
  const isVisible = useContext(NavBarContext).isVisible;


  const S_CURRENT_CHILD = "ילד נוכחי";
  const S_NO_CHILD_SELECTED = "לא נבחר ילד";

  return (
    <div dir="rtl" >
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container fluid className="h-25">
          <Navbar.Brand href="/Parent/Home">כפתור בית</Navbar.Brand>
          <Navbar.Brand> מחובר בתור: {usernameFromContext}</Navbar.Brand>
          <Navbar.Brand>
            {/* {currentChildNameFromContext.length === 0 ? S_NO_CHILD_SELECTED : `${S_CURRENT_CHILD}:${currentChildNameFromContext}`} */}
            {currentChildFromContext === null ? S_NO_CHILD_SELECTED : `${S_CURRENT_CHILD}:${currentChildFromContext.Name}`}
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Link to="/Parent/Games" className="nav-link">משחקייה</Link>
              <Link to="/Parent/Info" className="nav-link">מאמרים</Link>
              <Link to="/Parent/About" className="nav-link">אודות</Link>
              <Link to="/Parent/EditProfile" className="nav-link">עריכת פרופיל</Link>
              <Link to="/Parent/Avatar" className="nav-link">שינוי אווטר</Link>
              <Link to="/Parent/Journal" className="nav-link">היומן שלי</Link>
              {/* <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">דברים</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">עוד דברים</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">עוד דברים</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
              </NavDropdown> */}

              <Button onClick={LogoutUser} variant='danger'>יציאה</Button>

            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div >
  )
}