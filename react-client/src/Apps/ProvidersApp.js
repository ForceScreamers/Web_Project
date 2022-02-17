import { useHistory } from "react-router-dom";
import { useEffect } from "react";

//  Import components
import utf8 from 'utf8';

//  Import main pages
import ProviderRegister from "../Pages/ProvidersPages/ProviderRegister";
import ProviderLogin from "../Pages/ProvidersPages/ProviderLogin";
import ProviderGames from "../Pages/ProvidersPages/ProviderGames";
import { PublicRoute } from "../Components/GeneralComponents/PublicRoute";
import { ProvidersApiRequest } from "../RequestHeadersToWebApi";

export default function ProvidersApp() {
  const history = useHistory();
  useEffect(() => {
    console.log(history.location)
  })

  function HandleProviderLoginResponse(response) {
    sessionStorage.setItem('Info', JSON.stringify(response.data.Info));
    history.push("/Providers/Games");
  }

  async function HandleProviderLogin(e, formValid) {

    if (formValid) {
      let loginData = {
        email: e.target.loginEmailField.value,
        password: e.target.loginPasswordField.value,
      }

      try {
        let response = await ProvidersApiRequest('POST', 'ProviderLogin', loginData);

        if (response.data.AllowedToLogin) {
          HandleProviderLoginResponse(response);
        }
        else if (response.data.IsAdmin) {
          console.log("Admin");
          history.push("/Admins");
        }
        else {
          alert("בעל מקצוע לא מורשה להתחבר")
          console.log("Provider isn't permitted to login")
        }
      }
      catch (err) {
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
        // RequestRegisterAsProvider(fullName, email, password, occupation)
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
      }
      catch (err) {
        console.log(err);
      }
    }
  }

  return <div>
    <PublicRoute exact path="/Providers/Login" component={() => <ProviderLogin HandleProviderLogin={HandleProviderLogin} />} />
    <PublicRoute exact path="/Providers/Register" component={() => <ProviderRegister HandleProviderRegister={HandleProviderRegister} />} />

    <PublicRoute exact path="/Providers/Games" component={ProviderGames} />

  </div>;
}
