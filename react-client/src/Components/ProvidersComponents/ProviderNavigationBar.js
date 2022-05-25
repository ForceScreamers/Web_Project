import { Navbar, Container, Nav } from 'react-bootstrap'
import { Link, NavLink } from "react-router-dom"
import LogoutButton from '../GeneralComponents/LogoutButton';

import './ProviderNavBarStyles.css'

import logoImage from '../../website-images/logo.png'

export default function ProviderNavigationBar() {

  return (
    <div dir="rtl" className="provider-navbar-fade">
      <Navbar className="provider-navbar-main" collapseOnSelect expand="lg" variant="dark">
        <Container fluid className="provider-navbar-container">



          <div>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="me-auto">
                <NavLink activeClassName='active-nav-bar-link' className="nav-bar-link" to="/Provider/Articles">המאמרים שלי</NavLink>
                <NavLink activeClassName='active-nav-bar-link' className="nav-bar-link" to="/Provider/MyProfile">הפרופיל שלי</NavLink>

                <div>
                  <LogoutButton />
                </div>

                <Navbar.Brand> מחובר בתור: {JSON.parse(sessionStorage.getItem('Info')).FullName}</Navbar.Brand>

              </Nav>
            </Navbar.Collapse>
          </div>
        </Container>
        <div >
          <img width={300} alt="logo" src={logoImage} />
        </div>
      </Navbar >
    </div >
  )
}