import { PublicRoute } from "../Components/GeneralComponents/PublicRoute";
import { useHistory } from "react-router-dom";
import { useEffect } from "react";
import { RequestLoginAsProvider } from "../LoginAndRegisterHandlers/LoginHandler";
import { RequestRegisterAsProvider } from "../LoginAndRegisterHandlers/RegisterHandler";


//  Import main pages
import ProviderRegister from "../Pages/ProvidersPages/ProviderRegister";
import ProviderLogin from "../Pages/ProvidersPages/ProviderLogin";
import ProviderGames from "../Pages/ProvidersPages/ProviderGames";

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
      let email = e.target.loginEmailField.value;
      let password = e.target.loginPasswordField.value;

      let response = await RequestLoginAsProvider(email, password)
      if (response) {
        console.log(response.data);

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


    }
  }

  // TODO: Finish provider register
  function HandleProviderRegister(e, formValid) {
    if (formValid) {

      let fullName = e.target.fullNameField.value;
      let email = e.target.emailField.value;
      let occupation = e.target.occupationField.value;
      let password = e.target.passwordField.value;

      //  fullname, occupation, email, password
      RequestRegisterAsProvider(fullName, email, password, occupation)
        .then(response => {
          console.log(response);
          if (response) {
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
        })
    }
  }

  return <div>
    <PublicRoute exact path="/Providers/Login" component={() => <ProviderLogin HandleProviderLogin={HandleProviderLogin} />} />
    <PublicRoute exact path="/Providers/Register" component={() => <ProviderRegister HandleProviderRegister={HandleProviderRegister} />} />

    <PublicRoute exact path="/Providers/Games" component={ProviderGames} />

  </div>;
}
