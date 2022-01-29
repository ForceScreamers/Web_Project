import { Navbar, Container, Nav, NavDropdown, NavItem, Button } from 'react-bootstrap'
import { Link } from "react-router-dom"
import { useContext, useEffect, useState } from 'react'
import { LogoutContext } from '../../Contexts/LogoutContext'
import { NavBarContext } from '../../Contexts/NavBarContext'

//  היומן שלי, שינוי אווטר, עריכת פרופיל, משחקייה, מאמרים, אודותר
//  The main pages are: Games, info, about, edit profile, avatar, journal

export default function ParentNavigationBar() {
  const LogoutUser = useContext(LogoutContext);

  //  If there's no child
  console.log(useContext(NavBarContext))
  const usernameFromContext = useContext(NavBarContext).username;
  const childrenFromContext = useContext(NavBarContext).childrenProfiles;


  const [currentChildName, setCurrentChildName] = useState("לא בחרת בילד");

  const GetSelectedChild = (childrenArray) => {
    let tempArray = childrenArray;
    let child = undefined;

    if (tempArray) {
      tempArray.forEach((tempChild) => {
        if (tempChild.IsSelected) {
          child = tempChild;
        }
      });
    }

    return child;
  }

  useEffect(() => {
    console.log("Update navbar");
    console.log(GetCurrentChildName());
  }, [])

  function GetCurrentChildName() {
    //let children = sessionStorage.getItem('children');
    //let children = childrenFromContext.read();
    //console.log(childrenFromContext.read());

    if (childrenFromContext !== null) {
      if (childrenFromContext.length > 0) {
        //let parsedChildren = JSON.parse(children);
        //let selectedChild = GetSelectedChild(childrenFromContext);
        setCurrentChildName(GetSelectedChild(childrenFromContext).Name);

        console.log(currentChildName)
      }
    }


    return currentChildName;
  }

  function NavBarChildText() {
    let text = S_NO_CHILD_SELECTED;
    text = S_CURRENT_CHILD + GetCurrentChildName();
    return <label>{text}</label>;
    // return "HEllo";
  }


  const S_CURRENT_CHILD = "ילד נוכחי: ";
  const S_NO_CHILD_SELECTED = "לא נבחר ילד";

  //TODO: Fix collapse or navbar width when resizing the window
  return (
    <div dir="rtl" >
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container fluid className="h-25">
          <Navbar.Brand href="/Home">כפתור בית</Navbar.Brand>
          <Navbar.Brand> מחובר בתור: {usernameFromContext}</Navbar.Brand>
          <Navbar.Brand>
            {/* {currentChildNameFromContext.length === 0 ? S_NO_CHILD_SELECTED : `${S_CURRENT_CHILD}:${currentChildNameFromContext}`} */}
            {/* {currentChildFromContext === null ? S_NO_CHILD_SELECTED : `${S_CURRENT_CHILD}:${currentChildFromContext.Name}`} */}
            {/* {() => GetCurrentChildName() === null ? S_NO_CHILD_SELECTED : `${S_CURRENT_CHILD}:${currentChildName}`} */}
            <NavBarChildText />

          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Link to="/Parents/Games" className="nav-link">משחקייה</Link>
              <Link to="/Parents/Info" className="nav-link">מאמרים</Link>
              <Link to="/Parents/About" className="nav-link">אודות</Link>
              <Link to="/Parents/EditProfile" className="nav-link">עריכת פרופיל</Link>
              <Link to="/Parents/Avatar" className="nav-link">שינוי אווטר</Link>
              <Link to="/Parents/Journal" className="nav-link">היומן שלי</Link>
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