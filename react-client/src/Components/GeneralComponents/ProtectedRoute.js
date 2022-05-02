import { Route, Redirect, useHistory } from 'react-router-dom';

export default function ProtectedRoute({ UserType, Component, ...rest }) {
  const history = useHistory();

  function IsLoggedIn() {
    console.log("check")
    return DoesHaveToken() && IsMatchingUserType();
  }

  function DoesHaveToken() {
    let token = sessionStorage.getItem('token');

    if (token !== null) {
      return true;
    }
    else {
      return false;
    }
  }

  function IsMatchingUserType() {
    let userTypeByPath = history.location.pathname.split('/')[1];
    let userType = JSON.parse(sessionStorage.getItem('userType'));

    console.log(userTypeByPath)
    console.log(userType)

    return userTypeByPath === userType;
  }


  function ForceLogout() {
    sessionStorage.clear();
    history.replace("/");
  }

  return (
    <Route {...rest} render={

      (props) => {
        console.log(IsLoggedIn())
        if (IsLoggedIn()) {
          return <Component {...props} />
        }
        else {
          sessionStorage.clear();

          //Session timed out message

          return <Redirect to="/" />
        }
      }
    } />
  )
};