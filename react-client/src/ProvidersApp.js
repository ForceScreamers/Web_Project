import { Route } from "react-router-dom";
import { PublicRoute } from "./Components/GeneralComponents/PublicRoute";
import { useHistory } from "react-router-dom";
import ProviderLogin from "./Pages/ProvidersPages/ProviderLogin";
import { useEffect } from "react";
import ProviderRegister from "./Pages/ProvidersPages/ProviderRegister";
import { RequestLoginAsProvider } from "./LoginAndRegisterHandlers/LoginHandler";
import { RequestRegisterAsProvider } from "./LoginAndRegisterHandlers/RegisterHandler";
import utf8 from 'utf8'

export default function ProvidersApp() {
  const history = useHistory();
  useEffect(() => {
    console.log(history.location)
  })


  function HandleProviderLogin(e, formValid) {

    if (formValid) {
      let email = e.target.loginEmailField.value;
      let password = e.target.loginPasswordField.value;

      RequestLoginAsProvider(email, password)
        .then((response) => {

          if (response.data.AllowedToLogin) {
            //    Set needed items in session storage
            //    Redirect to homepage (providers)
            console.log("Logged as provider!");
          }
          else {
            console.log("Provider isn't permitted to login")
          }
        })
    }
  }

  function HandleProviderRegister(e, formValid) {
    //! Need to finish provider register
    //TODO: Move encoding into the request function
    if (formValid) {

      let fullName = utf8.encode(e.target.fullNameField.value);
      let email = e.target.emailField.value;
      let occupation = utf8.encode(e.target.occupationField.value);
      let password = e.target.passwordField.value;

      //  fullname, occupation, email, password
      RequestRegisterAsProvider(fullName, email, password, occupation)
        .then(response => {
          console.log(response);
          if (response.data.UserExists === true) {
            //  User already exists
          }
          else if (response.data.Registered === true) {
            //  Redirect provider
          }
          else {
            //  Something went wrong
          }
        })
    }
  }

  return <div>
    <PublicRoute exact path="/Providers/Login" component={() => <ProviderLogin HandleProviderLogin={HandleProviderLogin} />} />
    <PublicRoute exact path="/Providers/Register" component={() => <ProviderRegister HandleProviderRegister={HandleProviderRegister} />} />

  </div>;
}
