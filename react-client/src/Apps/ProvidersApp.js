import { useHistory } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react"

//  Import components
import utf8 from 'utf8';

//  Import main pages
import ProviderRegister from "../Pages/ProvidersPages/ProviderRegister";
import ProviderLogin from "../Pages/ProvidersPages/ProviderLogin";
import { PublicRoute } from "../Components/GeneralComponents/PublicRoute";
import { ProvidersApiRequest } from "../RequestHeadersToWebApi";
import ProtectedRoute from "../Components/GeneralComponents/ProtectedRoute";
import ProviderArticles from "../Pages/ProvidersPages/ProviderArticles";
import ProviderProfile from "../Pages/ProvidersPages/ProviderProfile";

import PublishArticleModal from "../Pages/ProvidersPages/PublishArticleModal";
import EditArticleModal from "../Pages/ProvidersPages/EditArticleModal";

import { ParentsApiRequest } from "../RequestHeadersToWebApi";

export default function ProvidersApp() {
  const history = useHistory();

  const [userExistsError, setUserExistsError] = useState(null);

  const [showWaitForConfirmationModal, setShowWaitForConfirmationModal] = useState(false);


  //  Edit and publish article states
  const [titleValue, setTitleValue] = useState("");
  const [contentValue, setContentValue] = useState("");
  const [topicValue, setTopicValue] = useState("");
  const [overridenArticleId, setOverridenArticleId] = useState(0);


  const [showPublishArticleModal, setShowPublishArticleModal] = useState(false);

  const [showEditArticleModal, setShowEditArticleModal] = useState(false);
  const [articleToEditId, setArticleToEditId] = useState(0);

  function RedirectToWelcome() {
    history.push("/Provider/Articles");
  }

  async function OpenArticleInEditor(articleId) {
    let apiResponse = await ProvidersApiRequest("GET", "GetArticleById", { articleId: articleId });
    let articleData = JSON.parse(apiResponse.data);

    setTitleValue(articleData[0].article_title)
    setContentValue(articleData[0].article_content)
    setTopicValue(articleData[0].topic_title)

    //  Redirect to publish page
    history.push("/Provider/PublishArticle");
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

  function OpenPublishArticleModal() { setShowPublishArticleModal(true) };
  function ClosePublishArticleModal() { setShowPublishArticleModal(false) };

  function OpenEditArticleModal() { setShowEditArticleModal(true) };
  function CloseEditArticleModal() { setShowEditArticleModal(false) };

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


      <PublishArticleModal
        ShowPublishArticleModal={showPublishArticleModal}
        ClosePublishArticleModal={ClosePublishArticleModal}
        LoadArticlesFromApi={LoadArticlesFromApi}
      />

      <EditArticleModal
        ShowEditArticleModal={showEditArticleModal}
        CloseEditArticleModal={CloseEditArticleModal}
        LoadArticlesFromApi={LoadArticlesFromApi}
      />

      <ProtectedRoute exact path="/Provider/Articles" Component={() =>
        <ProviderArticles
          OpenPublishArticleModal={OpenPublishArticleModal}
          OpenEditArticleModal={OpenArticleInEditor}

          LoadArticlesFromApi={LoadArticlesFromApi}
        />}
      />

      <ProtectedRoute exact path="/Provider/MyProfile" Component={() =>
        <ProviderProfile />
      } />


    </div>
    // </div>
  )

}
