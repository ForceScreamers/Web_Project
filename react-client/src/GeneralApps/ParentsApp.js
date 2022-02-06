//	#region Imports

//	Import hooks
import React from 'react';
import { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";

//  Import components
import { Link } from 'react-router-dom';

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



//import AuthenticatedRoute from "./components/ProtectedRoute";
import { ProtectedRoute } from '../Components/GeneralComponents/ProtectedRoute'
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
async function RequestRegister(userData) {
  // Register req
  console.log("Requesting reg...")

  //	Encode the username
  userData.username = utf8.encode(userData.username)

  return axios({
    method: 'POST',
    url: "http://localhost:5000/api/Parent/ParentRegister",
    timeout: process.env.REACT_APP_REQUEST_TIMEOUT_LENGTH,
    headers: {
      // data: JSON.stringify(userData),
      'username': userData.username,
      'email': userData.email,
      'password': userData.password,
    }
  })
}

async function RequestLogin(userData) {
  return axios({
    method: 'POST',
    hostname: 'localhost',
    url: "http://localhost:5000/api/Parent/ParentLogin",
    port: 5000,
    timeout: process.env.REACT_APP_REQUEST_TIMEOUT_LENGTH,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
      data: JSON.stringify(userData),
      'email': userData.email,
      'password': userData.password,
    }
  })
    .catch(err => console.log(err))
}


//TODO: Fix - Protected route sends 30 requests to authenticate, it needs to send one
//TODO: Fix - Login and register response have unnessesary headers i.e. \/	\/	\/
// Data: {
// 		FromParent: {
// 				ParentInfo: {
// 					some data
// 				},
// 			more data
// 		}
// }
//TODO: Add text to input error
//TODO: Add errors in login and register as text to screen
//TODO: HandleLogin and HandleRegister are too long
//TODO: Combine contexts
//TODO: Swap all anonymously declared functions to "function(){}"
//TODO: Handle user doesn't exist
//TODO: Update games page to load all children
//TODO: User verify delete child
//TODO: Deal with unable to connect
//TODO Handle user doesn't exist


// * React app component
export default function ParentsApp() {
  const [currentChild, setCurrentChild] = useState({});
  const [username, setUsername] = useState('no username');

  let history = useHistory();

  /**Gets the children belonging to the logged parent
   * Set current children profiles to the matching children
   */
  function LoadChildrenFromServer() {

    let parentId = JSON.parse(sessionStorage.getItem('userId'));

    console.log(parentId);
    if (parentId) {
      ChildrenHandlerApi.GetChildren(parentId)
        .then(res => {

          //  Set children
          sessionStorage.setItem('children', JSON.stringify(res.data));
          let children = JSON.parse(sessionStorage.getItem('children'));

          //  Set current child
          if (children.length === 0) {
            sessionStorage.setItem('currentChild', 'null');
            setCurrentChild(null);
          }
          else {
            sessionStorage.setItem('currentChild', JSON.stringify(GetSelectedChild(children)))
            setCurrentChild(JSON.parse(sessionStorage.getItem('currentChild')));
          }
        })
    }
  }


  function GetSelectedChild(childrenArray) {
    let tempArray = childrenArray;
    let child = undefined;

    tempArray.forEach((tempChild) => {
      if (tempChild.IsSelected) {
        child = tempChild;
      }
    });
    console.log(childrenArray);

    return child;
  }

  //  Handles child add logic
  function HandleAddChild(e, formValid) {
    e.preventDefault();

    console.log(`Add child? ${formValid}`)

    if (formValid) {

      let childAge = e.target.childAgeSelect.value;
      let parentId = JSON.parse(sessionStorage.getItem('userId'));
      let childName = utf8.encode(e.target.childNameField.value);

      //Send request to server to add child
      ChildrenHandlerApi.AddChild(parentId, childName, childAge)

        .then((response) => {//	Get confirmation that the child was added
          console.log(response);
          //	Response will be HasAddedChild
          if (response) {
            LoadChildrenFromServer(e);
          }
          else { console.log("No response from server") }
        })
    }
  }

  /**
   * Changes the selected child from edit profile to the current child
   * Used to keep track of progress for this child
   */
  function HandleSelectChild(e, childToSelect) {

    ChildrenHandlerApi.SelectChild(e, childToSelect)
      .catch(err => console.log(err))
      .then(() => {
        LoadChildrenFromServer();
      })
  }

  function HandleDeleteChild(e, childId) {

    let parentId = JSON.parse(sessionStorage.getItem('userId'));

    ChildrenHandlerApi.DeleteChild(childId, parentId)
      .then(() => {
        LoadChildrenFromServer(e);
      })
  }


  function HandleLogin(e, formValid) {

    e.preventDefault();

    console.log(formValid);

    if (formValid) {

      let email = e.target.loginEmailField.value;
      let password = e.target.loginPasswordField.value;

      RequestLoginAsParent(email, password)
        .then((response) => {

          console.log(response);

          //	If the user is authorized
          if (response.data.FromParent.UserExists === true) {

            //	Set sessionStorage items and states
            sessionStorage.setItem("token", response.data.token);
            sessionStorage.setItem("userId", response.data.FromParent.ParentInfo.Id);
            sessionStorage.setItem("username", response.data.FromParent.ParentInfo.Username);
            setUsername(sessionStorage.getItem("username"));

            LoadChildrenFromServer(e)

            //	Redirect to welcome page
            history.push("/Parents/Welcome");
          }
          else {
            alert("user not found");
          }
        });
    }
  }

  const HandleRegister = async (e, formValid) => {
    e.preventDefault();


    console.log("Form valid: " + formValid)
    if (formValid) {

      let userData = {
        username: e.target.registerUsernameField.value,
        email: e.target.registerEmailField.value,
        password: e.target.registerPasswordField.value,
        confirmPassword: e.target.registerPasswordConfirmField.value,
      };
      //!	Note, i'm sending the confirm password too

      let response = await RequestRegister(userData);
      if (response) {

        //	If the user is authorized
        if (response.data.Registered === true) {

          //	Log in the newly registered user
          //? Check properties
          RequestLogin(userData)
            .then((loginResponse) => {
              console.log(loginResponse)
              //	Set sessionStorage items and states
              sessionStorage.setItem("token", loginResponse.data.token);
              sessionStorage.setItem("userId", loginResponse.data.FromParent.ParentInfo.Id);
              sessionStorage.setItem("username", loginResponse.data.FromParent.ParentInfo.Username);
              setUsername(sessionStorage.getItem("username"));
              history.push("/Welcome");
            });
        }
        else if (response.data.FromParent.UserExists) {
          alert("User already exists");
        }
        else {
          console.error("ERROR IN REGISTER USER");
        }
      }
      else {
        console.error("server error, maybe webapi")
      }
    }
  }

  useEffect(() => {
    //	Load username and current child
    setUsername(sessionStorage.getItem('username'));
    console.log(sessionStorage.getItem('currentChild'));
    setCurrentChild(JSON.parse(sessionStorage.getItem('currentChild')));

    LoadChildrenFromServer();
  }, [])

  //#region	Control the website zoom level
  useEffect(() => {
    const initialValue = document.body.style.zoom;

    // Change zoom level on mount
    document.body.style.zoom = "125%";

    return () => {
      // Restore default value
      document.body.style.zoom = initialValue;
    };
  }, []);
  //#endregion



  return (

    <div>

      <PublicRoute exact path="/" component={() =>
        <ParentLogin
          HandleLogin={(e, isValid) => HandleLogin(e, isValid)}
        />} />

      <PublicRoute exact path="/Parents/Register" component={() =>
        <ParentRegister
          HandleRegister={(e, isValid) => HandleRegister(e, isValid)}
        />} />

      {/* //TODO: NEED TO CALL THE ROUTES ONLY WHEN THE WELCOME PAGE LOADS*/}
      <NavBarContext.Provider value={{
        child: currentChild,
        username: username,
      }}>

        <ProtectedRoute exact path="/Parents/Welcome" component={Welcome} />
        <ProtectedRoute exact path="/Parents/About" component={About} />

        <ProtectedRoute exact path="/Parents/EditProfile" component={() =>
          <EditProfilePage
            HandleSelectChild={HandleSelectChild}
            HandleDeleteChild={HandleDeleteChild}
            HandleAddChild={(e, isValid) => HandleAddChild(e, isValid)}
          />}
        />
        <ProtectedRoute exact path="/Parents/Games" component={GamesPage} />
        <ProtectedRoute exact path="/Parents/Info" component={InfoPage} />
        <ProtectedRoute exact path="/Parents/Avatar" component={AvatarPage} />
        <ProtectedRoute exact path="/Parents/Journal" component={JournalPage} />
        <ProtectedRoute exact path="/Parents/Home" component={HomePage} />


      </NavBarContext.Provider>


    </div>
  );
}