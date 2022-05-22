import { Navbar, Container, Nav } from 'react-bootstrap'
import { Link, NavLink } from "react-router-dom"
import { useContext } from 'react'
import { NavBarContext } from '../../Contexts/NavBarContext'
import LogoutButton from '../GeneralComponents/LogoutButton'

import logoImage from '../../website-images/logo.png'

import './ParentNavigationBar/ParentNavBarStyles.css'

//  היומן שלי, שינוי אווטר, עריכת פרופיל, משחקייה, מאמרים, אודותר
//  The main pages are: Games, info, about, edit profile, avatar, journal

export default function ParentNavigationBar() {

  const usernameFromContext = useContext(NavBarContext).username;
  const currentChildFromContext = useContext(NavBarContext).child;

  const STRING_CURRENT_CHILD = "פרופיל נוכחי";
  const STRING_NO_CHILD_SELECTED = "לא נבחר ילד";

  function IsChildSelected() {
    return currentChildFromContext === null;
  }

  return (
    <div dir="rtl">
      <Navbar className="parent-navbar-main" collapseOnSelect navbarScroll expand="lg" variant="dark">

        <Container fluid className="parent-navbar-container" >


          <div >
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav" >
              <Nav className="parent-navbar-tabs-container">
                <NavLink activeClassName='active-nav-bar-link' to="/Parent/Games" className="nav-bar-link">משחקייה</NavLink>
                <NavLink activeClassName='active-nav-bar-link' to="/Parent/Info" className="nav-bar-link">מאמרים</NavLink>
                <NavLink activeClassName='active-nav-bar-link' to="/Parent/About" className="nav-bar-link">אודות</NavLink>
                <NavLink activeClassName='active-nav-bar-link' to="/Parent/EditProfile" className="nav-bar-link">עריכת פרופיל</NavLink>
                <NavLink hidden={IsChildSelected()} activeClassName='active-nav-bar-link' to="/Parent/Journal" className="nav-bar-link" >
                  {IsChildSelected() ? STRING_NO_CHILD_SELECTED : `היומן של ${currentChildFromContext.Name}`}
                </NavLink>



                <div>
                  <LogoutButton />
                </div>

                <Navbar.Brand> מחובר בתור: {usernameFromContext}</Navbar.Brand>
                <Navbar.Brand> {IsChildSelected() ? STRING_NO_CHILD_SELECTED : `${STRING_CURRENT_CHILD}: ${currentChildFromContext.Name}`} </Navbar.Brand>

              </Nav>
            </Navbar.Collapse>
          </div>

        </Container>
        <div >
          <img width={300} alt="logo" src={logoImage} />
        </div>
      </Navbar>
    </div >
  )
}