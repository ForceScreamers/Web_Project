//	#region Imports

//	Import hooks
import React from 'react';
import { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";

//  Import components
import { Link } from 'react-router-dom';

//	Import main pages as components
import Welcome from './Pages/GeneralPages/Welcome'
import About from './Pages/GeneralPages/About';
import ParentRegister from './Pages/ParentsPages/ParentRegister';
import ParentLogin from './Pages/ParentsPages/ParentLogin';
import EditProfilePage from './Pages/ParentsPages/EditProfilePage';
import GamesPage from './Pages/ParentsPages/GamesPage'
import InfoPage from './Pages/ParentsPages/InfoPage';
import AvatarPage from './Pages/ParentsPages/AvatarPage';
import JournalPage from './Pages/ParentsPages/JournalPage';
import HomePage from './Pages/ParentsPages/HomePage';
import ProviderLogin from './Pages/ProvidersPages/ProviderLogin';


//import AuthenticatedRoute from "./components/ProtectedRoute";
import { ProtectedRoute } from './Components/GeneralComponents/ProtectedRoute'
import { PublicRoute } from './Components/GeneralComponents/PublicRoute'


//	Bootstrap css import
import 'bootstrap/dist/css/bootstrap.min.css';


//	Other libraries
import axios from 'axios';
import utf8 from 'utf8';


//	Import Contexts
import { LogoutContext } from './Contexts/LogoutContext';
import { NavBarContext } from './Contexts/NavBarContext';

//  Import helper classes
import { ChildHandler } from './ChildHandler';




//	#endregion

/**
 * normal comment
 * *Important highlighted
 * ! Warning
 * ? Query
 * TODO: todo comment
 * @param myParameter The parameter for something
 */



const RequestRegister = async (userData) => {
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

const RequestLogin = async (userData) => {
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
//* DONE: Validate login input at client
//* DONE: Fix input validation at add child,
//TODO: Add text to input error
//TODO: Add errors in login and register as text to screen
//TODO: HandleLogin and HandleRegister are too long
//TODO: Combine contexts
//* DONE: Fix handle when token is expired
//TODO: Remove unnecessary e parameter from various functions 
//* DONE: Finish updating the game scores when the user leaves a game
//TODO: Swap all anonymously declared functions to "function(){}"
//TODO: Handle user doesn't exist
//TODO: Update games page to load all children

// * React app component
export default function ParentsApp() {
  const [currentChild, setCurrentChild] = useState({});
  const [username, setUsername] = useState('no username');
  //const history = useHistory();
  let history = useHistory();

  /**Gets the children belonging to the logged parent
   * Set current children profiles to the matching children
   */
  const LoadChildrenFromServer = () => {

    let parentId = JSON.parse(sessionStorage.getItem('userId'));

    console.log(parentId);
    if (parentId) {
      axios({
        method: 'POST',
        url: "http://localhost:5000/api/Parent/GetChildren",
        timeout: process.env.REACT_APP_REQUEST_TIMEOUT_LENGTH,
        headers: {
          'parentId': parentId,
        }
      })
        .catch(err => console.log(err))
        .then(res => {
          if (res) {
            console.log("CHILDREN:")
            console.log(res)
            sessionStorage.setItem('children', JSON.stringify(res.data));
            let children = JSON.parse(sessionStorage.getItem('children'));

            console.log(children);
            if (children.length === 0) {
              console.log(children);
              setCurrentChild(null);
              sessionStorage.setItem('currentChild', 'null')
            }
            else {
              sessionStorage.setItem('currentChild', JSON.stringify(GetSelectedChild(children)))
              setCurrentChild(JSON.parse(sessionStorage.getItem('currentChild')));
            }
          }
        })
    }
  }


  const GetSelectedChild = (childrenArray) => {
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
  const HandleAddChild = async (e, formValid) => {
    e.preventDefault();

    console.log(`Add child? ${formValid}`)

    if (formValid) {

      let formChildName = e.target.childNameField.value;
      let formChildAge = e.target.childAgeSelect.value;


      //Send request to server to add child
      axios({

        method: 'post',
        url: "http://localhost:5000/api/Parent/AddChild",
        timeout: process.env.REACT_APP_REQUEST_TIMEOUT_LENGTH,
        headers: {
          'parentId': JSON.parse(sessionStorage.getItem('userId')),
          'childName': utf8.encode(formChildName),
          'childAge': formChildAge
        }
      })
        .catch(err => console.log(err))

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
  const HandleSelectChild = (e, childToSelect) => {

    ChildHandler.SelectChild(e, childToSelect)
      .catch(err => console.log(err))
      .then(() => {
        LoadChildrenFromServer();
      })
  }

  const HandleDeleteChild = (e, childId) => {
    // Get the delete confirmation from the server then delete 
    //	the child from the state array
    axios({
      method: 'POST',
      url: "http://localhost:5000/api/Parent/DeleteChild",
      timeout: process.env.REACT_APP_REQUEST_TIMEOUT_LENGTH,
      headers: {
        'childId': childId,
        'parentId': JSON.parse(sessionStorage.getItem('userId'))

      }
    }).catch(err => console.log(err))
      .then((response) => {
        //TODO: User verify delete child

        LoadChildrenFromServer(e);
      })
  }




  const HandleLogin = async (e, formValid) => {

    e.preventDefault();

    console.log(formValid);

    if (formValid) {

      let userData = {
        email: e.target.loginEmailField.value,
        password: e.target.loginPasswordField.value,
      };


      //! For debugging
      // let userData = {
      // 	email: "test@test.com",
      // 	password: "1234",
      // };


      //TODO: Deal with unable to connect
      RequestLogin(userData)
        .catch(err => console.log(err))
        .then((response) => {

          if (response) {
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
              //	TODO Handle user doesn't exist
              alert("user not found");
            }
          }
          else {
            console.error("server error, maybe webapi")
          }
        });
    }
  }

  const HandleRegister = async (e, formValid) => {
    e.preventDefault();



    console.log("Form valid: " + formValid)
    if (formValid) {//	If the form is valid (Writing here !valid because the validation works the opposite way)

      let userData = {
        username: e.target.registerUsernameField.value,
        email: e.target.registerEmailField.value,
        password: e.target.registerPasswordField.value,
        confirmPassword: e.target.registerPasswordConfirmField.value,
      };
      //!	Note, i'm sending the confirm password too

      let response = await RequestRegister(userData);
      if (response) {
        console.log(response);

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
          //	TODO Handle user doesn't exist
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

  const LogoutUser = () => {
    sessionStorage.clear();
    history.replace("/");
  }

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
      <LogoutContext.Provider value={LogoutUser}>
        <NavBarContext.Provider value={{
          child: currentChild,
          username: username,
        }}>

          <ProtectedRoute exact path="/Parents/Welcome" component={Welcome} />
          <ProtectedRoute exact path="/ParentsAbout" component={About} />

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

      </LogoutContext.Provider>
      {/* //  The main pages are: Games, info, about, edit profile, avatar, journal */}




      {/* </Router> */}
    </div >
  );
}