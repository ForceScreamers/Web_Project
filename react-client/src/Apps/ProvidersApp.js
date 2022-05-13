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
import ProviderArticles from "../Pages/ProvidersPages/ProviderArticles";

export default function ProvidersApp() {
  const history = useHistory();

  const [userExistsError, setUserExistsError] = useState(null);

  const [showWaitForConfirmationModal, setShowWaitForConfirmationModal] = useState(false);

  function RedirectToWelcome() {
    history.push("/Provider/Games");
  }



  useEffect(() => {
  }, [])

  function SetSessionStorageItems(data) {
    sessionStorage.setItem('Info', JSON.stringify(data.Info));
    sessionStorage.setItem('token', JSON.stringify("Logged in token"));
    sessionStorage.setItem('userType', JSON.stringify("Provider"));
  }

  async function LoadArticlesFromApi() {
    let providerId = JSON.parse(sessionStorage.getItem("Info"))?.Id;
    let response = await ProvidersApiRequest("GET", "GetArticlesForProvider", { providerId: providerId })
    let articles = JSON.parse(response.data).Articles;

    sessionStorage.setItem("articles", JSON.stringify(articles))
    console.log(articles)
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

      try {
        let loginResponse = await ProvidersApiRequest('POST', 'ProviderLogin', loginData);

        if (loginResponse.data.IsAdmin) {
          sessionStorage.setItem('token', JSON.stringify("Logged in token"));
          sessionStorage.setItem('userType', JSON.stringify("Admin"));

          history.push("/Admin");
        }
        else if (loginResponse.data.AllowedToLogin) {// If the user isn't an admin, proceed as a provider
          SetSessionStorageAndRedirect(loginResponse.data);
          LoadArticlesFromApi();
        }
        else {
          // User doesn't exist in the system
          setUserExistsError(true);
        }
      }
      catch (err) {
        // Do nothing
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
          OpenWaitForConfirmationModal();
          // alert('חכה לאישור כניסה');
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

  function CloseWaitForConfirmationModal() { setShowWaitForConfirmationModal(false); }
  function OpenWaitForConfirmationModal() { setShowWaitForConfirmationModal(true); }

  return (

    // <div className="provider-background-image">
    <div>
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
          ShowWaitForConfirmationModal={showWaitForConfirmationModal}
          CloseWaitForConfirmationModal={CloseWaitForConfirmationModal}
        />}
      />

      <ProtectedRoute exact path="/Provider/Games" Component={ProviderGames} />

      <ProtectedRoute exact path="/Provider/PublishArticle" Component={() =>
        <ProviderPublishArticle
          LoadArticlesFromApi={LoadArticlesFromApi}
        />}
      />

      <ProtectedRoute exact path="/Provider/Articles" Component={() =>
        <ProviderArticles
          LoadArticlesFromApi={LoadArticlesFromApi}
        />}
      />




    </div>
    // </div>
  )

}
