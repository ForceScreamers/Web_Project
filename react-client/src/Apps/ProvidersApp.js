import { useHistory } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react"

//  Import components
import utf8 from 'utf8';

//  Import main pages
import ProviderRegister from "../Pages/ProvidersPages/ProviderRegister";
import ProviderLogin from "../Pages/ProvidersPages/ProviderLogin";
import ProviderGames from "../Pages/ProvidersPages/ProviderGames";
import { PublicRoute } from "../Components/GeneralComponents/PublicRoute";
import { ProvidersApiRequest } from "../RequestHeadersToWebApi";
import ProtectedRoute from "../Components/GeneralComponents/ProtectedRoute";
import ProviderPublishArticle from "../Pages/ProvidersPages/ProviderPublishArticle";

export default function ProvidersApp() {
  const history = useHistory();

  const [userExistsError, setUserExistsError] = useState(null);

  function RedirectToWelcome() {
    history.push("/Provider/Games");
  }

  function SetSessionStorageItems(data) {
    sessionStorage.setItem('Info', JSON.stringify(data.Info));
    sessionStorage.setItem('token', JSON.stringify("Logged in token"));
    sessionStorage.setItem('userType', JSON.stringify("Provider"));
  }

  function SetSessionStorageAndRedirect(data) {
    SetSessionStorageItems(data);
    RedirectToWelcome();
  }

  async function HandleProviderLogin(e, formValid) {

    if (formValid) {
      let loginData = {
        email: e.target.loginEmailField.value,
        password: e.target.loginPasswordField.value,
      }
      console.log(loginData);

      try {
        let loginResponse = await ProvidersApiRequest('POST', 'ProviderLogin', loginData);

        console.log(loginResponse);
        if (loginResponse.data.IsAdmin) {
          sessionStorage.setItem('token', JSON.stringify("Logged in token"));
          sessionStorage.setItem('userType', JSON.stringify("Admin"));

          console.log("Admin");
          history.push("/Admin");
        }
        else if (loginResponse.data.AllowedToLogin) {
          SetSessionStorageAndRedirect(loginResponse.data);
        }
        else {
          //alert("בעל מקצוע לא מורשה להתחבר")
          console.log("Provider isn't permitted to login")
          setUserExistsError(true);
        }
      }
      catch (err) {
        // Do nothing
        console.log(err);
      }

    }
  }

  async function HandleProviderRegister(e, formValid) {
    if (formValid) {
      let registerData = {
        fullName: utf8.encode(e.target.fullNameField.value),
        email: e.target.emailField.value,
        occupation: utf8.encode(e.target.occupationField.value),
        password: e.target.passwordField.value,
      }

      try {
        let response = await ProvidersApiRequest('POST', 'ProviderRegister', registerData)

        if (response.data.UserExists === true) {
          //  User already exists
          setUserExistsError(true);
        }
        else if (response.data.Registered === true) {
          alert('חכה לאישור כניסה');
        }
        else {
          //  Something went wrong
        }
      }
      catch (err) {
        //  Do nothing
        console.log(err);
      }
    }
  }

  return <div>
    <PublicRoute exact path="/Provider/Login" component={() =>
      <ProviderLogin
        HandleProviderLogin={HandleProviderLogin}
        UserExistsError={userExistsError}
      />}
    />

    <PublicRoute exact path="/Provider/Register" component={() =>
      <ProviderRegister
        HandleProviderRegister={HandleProviderRegister}
        UserExistsError={userExistsError}
      />}
    />

    <ProtectedRoute exact path="/Provider/Games" Component={ProviderGames} />
    <ProtectedRoute exact path="/Provider/PublishArticle" Component={ProviderPublishArticle} />

  </div>;
}
