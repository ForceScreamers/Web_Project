import { Route } from "react-router-dom";
import { PublicRoute } from "./Components/GeneralComponents/PublicRoute";
import { useHistory } from "react-router-dom";
import ProviderLogin from "./Pages/ProvidersPages/ProviderLogin";
import { useEffect } from "react";
import ProviderRegister from "./Pages/ProvidersPages/ProviderRegister";
import { RequestLoginAsProvider } from "./LoginAndRegisterHandlers/LoginHandler";

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
          // console.log(response);
          if (response.data.AllowedToLogin) {
            //    Set needed items in session storage
            //    Redirect to homepage (providers)
            console.log("Logged as provider!");
          }
          else {
            console.log("Provider isn't permitted to login")
          }
          //  If user exists

        })
    }
  }

  function HandleProviderRegister(e, formValid) {
    //! Need to finish provider register
  }

  return <div>
    <PublicRoute exact path="/Providers/Login" component={() => <ProviderLogin HandleProviderLogin={HandleProviderLogin} />} />
    <PublicRoute exact path="/Providers/Register" component={ProviderRegister} />

  </div>;
}
