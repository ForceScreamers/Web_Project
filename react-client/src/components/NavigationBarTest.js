import React from 'react'
import { Link } from 'react-router-dom'
import '../css/components-css/NavigationBarTest.css'

import InviteButton from './InviteButton'

import logoImage from '../images/download.jpg'


function NavigationBarTest({ children }) {

  return (
    <div className="main-navbar-container">



      <div className="top-container">

        <div className="logo-container flex-center"><img className="logo" src={logoImage} alt="Website logo" /></div>
        <div className="link-1-container flex-center"><Link to="/Games" className="page-link">Games</Link></div>
        <div className="link-2-container flex-center"><Link to="/MyProfile" className="page-link">Profile</Link></div>
        <div className="logout-button-container flex-center"><button className="logout-button" >Logout</button></div>
        <div className="loggedAs flex-center"><label className="logout-button" >Logged in as: </label></div>


      </div>

      <div className="left-container">
        <label>Friends List</label>
        <div className="friends-list-conatiner">
          <ul className="friends-list">
            <li><div className="friend-div"><div className="friend-name-container">xXProGaarmerXx</div> <InviteButton /></div></li>
            <li><div className="friend-div">TheKiller <button>invite +</button></div></li>
            <li><div className="friend-div">mangoman <button>invite +</button></div></li>
            <li><div className="friend-div">thelegend27 <button>invite +</button></div></li>
            <li><div className="friend-div">xXProGamerXx</div></li>
            <li><div className="friend-div">xXProGamerXx</div></li>
            <li><div className="friend-div">xXProGamerXx</div></li>
            <li><div className="friend-div friends-div-last--border">xXProGamerXx</div></li>


          </ul>
        </div>

      </div>


      <div className="content-wrapper">{children}</div>

    </div>
  )
}


export default NavigationBarTest;


{/* <div className="top-container__logo">
          <img className="logo-image" src={logoImage} alt="Website logo" />
        </div>

        <div className="top-container__controls top-container__controls-left">
          <Link to="/Games" className="page-link">Games</Link>
          <Link to="/MyProfile" className="page-link">Profile</Link>
        </div>

        <div className="top-container__controls top-container__controls-right">
          <button className="top-container__logout-button" >Logout</button>
        </div>
      </div >

  <div className="left-container">
    <label>Left side</label>
  </div> */}
