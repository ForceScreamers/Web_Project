//	#region Imports

//	Import hooks
import React from 'react';
import { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";

//	Import main pages as components
import Welcome from '../Pages/GeneralPages/Welcome'
import About from '../Pages/GeneralPages/About';
import ParentRegister from '../Pages/ParentsPages/ParentRegister';
import ParentLogin from '../Pages/ParentsPages/ParentLogin';
import EditProfilePage from '../Pages/ParentsPages/EditProfilePage';
import GamesPage from '../Pages/ParentsPages/GamesPage'
import InfoPage from '../Pages/ParentsPages/InfoPage';
import AvatarPage from '../Pages/ParentsPages/AvatarPage';
import JournalPage from '../Pages/ParentsPages/JournalPage';
import HomePage from '../Pages/ParentsPages/HomePage';
// import ProviderLogin from './Pages/ProvidersPages/ProviderLogin';



//import AuthenticatedRoute from "./components/PublicRoute";
import { PublicRoute } from '../Components/GeneralComponents/PublicRoute'


//	Bootstrap css import
import 'bootstrap/dist/css/bootstrap.min.css';


//	Other libraries
import axios from 'axios';
import utf8 from 'utf8';


//	Import Contexts
import { NavBarContext } from '../Contexts/NavBarContext';

//  Import helper classes
import { ChildrenHandlerApi } from '../ChildrenHandlerApi';
import { RequestLoginAsParent } from "../LoginAndRegisterHandlers/LoginHandler";
import PageDoesntExist from '../PageDoesntExist';
import { ParentsApiRequest } from '../RequestHeadersToWebApi';
import ProtectedRoute from '../Components/GeneralComponents/ProtectedRoute';




//	#endregion

/**
 * normal comment
 * *Important highlighted
 * ! Warning
 * ? Query
 * TODO: todo comment
 * @param myParameter The parameter for something
 */


/** */


// * React app component
export default function ParentsApp() {

  const [currentChild, setCurrentChild] = useState({});
  const [username, setUsername] = useState('no username');

  let history = useHistory();

  /**Gets the children belonging to the logged parent
   * Set current children profiles to the matching children
   */
  async function LoadChildrenFromServer() {

    let parentId = JSON.parse(sessionStorage.getItem('userId'));

    console.log(parentId);
    if (parentId) {
      //ChildrenHandlerApi.GetChildren(parentId)
      let res = await ParentsApiRequest('GET', 'GetChildren', { parentId: parentId }).catch(err => console.log(err))

      //  Set children
      sessionStorage.setItem('children', JSON.stringify(res.data));
      let children = JSON.parse(sessionStorage.getItem('children'));

      //  Set current child
      if (children.length === 0) {
        sessionStorage.setItem('currentChild', 'null');
        console.log('EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE')
        setCurrentChild(null);
      }
      else {
        sessionStorage.setItem('currentChild', JSON.stringify(GetSelectedChild(children)))
        setCurrentChild(JSON.parse(sessionStorage.getItem('currentChild')));
      }

    }
  }


  function GetSelectedChild(childrenArray) {
    let tempArray = [...childrenArray];
    let child = undefined;

    tempArray.forEach((tempChild) => {
      console.log(child);
      console.log(tempArray);
      if (tempChild.IsSelected) {
        child = tempChild;
      }
    });
    console.log(childrenArray);

    return child;
  }

  function HandleLoginResponse(response) {
    //  Clear previous data
    sessionStorage.clear();

    //	Set sessionStorage items and states
    sessionStorage.setItem("token", response.data.token);
    sessionStorage.setItem("userId", response.data.FromParent.ParentInfo.Id);
    sessionStorage.setItem("username", response.data.FromParent.ParentInfo.Username);
    setUsername(sessionStorage.getItem("username"));

    //  Load children
    LoadChildrenFromServer();

    //	Redirect to welcome page
    history.push("/Parents/Welcome");
  }


  async function HandleParentLogin(e, formValid) {

    e.preventDefault();

    if (formValid) {

      let email = e.target.loginEmailField.value;
      let password = e.target.loginPasswordField.value;

      let loginResponse = await RequestLoginAsParent(email, password).catch(err => console.log(err))
      console.log(loginResponse);

      if (loginResponse.data.FromParent.UserExists === true) {
        HandleLoginResponse(loginResponse);
      }
      else {
        alert("user not found");
      }



    }
  }

  async function HandleParentRegister(e, formValid) {
    e.preventDefault();

    if (formValid) {

      let userData = {
        username: e.target.registerUsernameField.value,
        email: e.target.registerEmailField.value,
        password: e.target.registerPasswordField.value,
        confirmPassword: e.target.registerPasswordConfirmField.value,
      };
      //!	Note, i'm sending the confirm password too

      let response = await ParentsApiRequest('POST', 'ParentRegister', userData).catch(err => console.log(err));
      if (response) {

        //	If the user is authorized
        if (response.data.Registered === true) {

          //	Log in the newly registered user
          //? Check properties
          // let loginResponse = await RequestLogin(userData)
          let loginResponse = await ParentsApiRequest('POST', 'ParentLogin', userData);
          console.log(loginResponse)

          HandleLoginResponse(response);

        }
        else if (response.data.FromParent.UserExists) {
          alert("User already exists");
        }
        else {
          console.error("ERROR IN REGISTER USER");
        }
      }
    }
  }


  useEffect(() => {
    //	Load username and current child
    setUsername(sessionStorage.getItem('username'));
    setCurrentChild(JSON.parse(sessionStorage.getItem('currentChild')));

    LoadChildrenFromServer();
  }, [])


  return (

    <div>

      <PublicRoute exact path="/" component={() =>
        <ParentLogin
          HandleLogin={(e, isValid) => HandleParentLogin(e, isValid)}
        />} />

      <PublicRoute exact path="/Parents/Register" component={() =>
        <ParentRegister
          HandleRegister={(e, isValid) => HandleParentRegister(e, isValid)}
        />} />

      {/* //TODO: NEED TO CALL THE ROUTES ONLY WHEN THE WELCOME PAGE LOADS*/}
      <NavBarContext.Provider value={{
        child: currentChild,
        username: username,
      }}>

        <ProtectedRoute exact path="/Parents/Welcome" Component={Welcome} />

        <ProtectedRoute exact path="/Parents/About" Component={About} />

        <ProtectedRoute exact path="/Parents/EditProfile" Component={() =>
          <EditProfilePage
            // HandleSelectChild={HandleSelectChild}
            // HandleDeleteChild={HandleDeleteChild}
            // HandleAddChild={(e, isValid) => HandleAddChild(e, isValid)}
            LoadChildrenFromServer={LoadChildrenFromServer}
          />}
        />
        <ProtectedRoute exact path="/Parents/Games" Component={() => <GamesPage LoadChildrenFromServer={LoadChildrenFromServer} />} />
        <ProtectedRoute exact path="/Parents/Info" Component={InfoPage} />
        <ProtectedRoute exact path="/Parents/Avatar" Component={AvatarPage} />
        <ProtectedRoute exact path="/Parents/Journal" Component={JournalPage} />
        <ProtectedRoute exact path="/Parents/Home" Component={HomePage} />


      </NavBarContext.Provider>


    </div>
  );
}