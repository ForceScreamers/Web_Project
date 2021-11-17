import React from 'react'
import { Link } from 'react-router-dom'
import '../css/components-css/NavBarStyle.css'


function NavigationBar() {

  return (

    <div className="NavBarContainer">

      <div className="ControlContainer LeftContainer">
        <Link to="/Games" className="PageLink">Games</Link>
        <Link to="/MyProfile" className="PageLink">Profile</Link>
      </div>

      <div className="ControlContainer RightContainer">
        <button className="LogoutButton" >Logout</button>
      </div>


    </div >

  )
}


export default NavigationBar;
