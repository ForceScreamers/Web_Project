import { Route } from "react-router-dom";
import { PublicRoute } from "./Components/GeneralComponents/PublicRoute";
import { useHistory } from "react-router-dom";
import ProviderLogin from "./Pages/ProvidersPages/ProviderLogin";
import { useEffect } from "react";
import ProviderRegister from "./Pages/ProvidersPages/ProviderRegister";

export default function ProvidersApp() {
  const history = useHistory();
  useEffect(() => {
    console.log(history.location)
  })

  console.log("Providers login")
  return <div>
    <PublicRoute exact path="/Providers/Login" component={ProviderLogin} />
    <PublicRoute exact path="/Providers/Register" component={ProviderRegister} />

  </div>;
}
