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
      let password = e.target.loginEmailField.value;

      RequestLoginAsProvider(email, password)
        .then((response) => {
          //  If user exists
          //    Set needed items in session storage
          //    Redirect to homepage (providers)
        })
    }
  }

  return <div>
    <PublicRoute exact path="/Providers/Login" component={ProviderLogin} HandleProviderLogin={HandleProviderLogin} />
    <PublicRoute exact path="/Providers/Register" component={ProviderRegister} />

  </div>;
}
