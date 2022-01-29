import { Route } from "react-router-dom";
import { PublicRoute } from "./Components/GeneralComponents/PublicRoute";
import { useHistory } from "react-router-dom";
import ProviderLogin from "./Pages/ProvidersPages/ProviderLogin";
import { useEffect } from "react";
import ProviderRegister from "./Pages/ProvidersPages/ProviderRegister";
import { ProtectedRoute } from "./Components/GeneralComponents/ProtectedRoute";


export default function ProvidersApp() {

  console.log("Providers login")



  // const RequestRegister = async (userData) => {
  //   // Register req
  //   console.log("Requesting reg...")

  //   //	Encode the username
  //   userData.username = utf8.encode(userData.username)

  //   return axios({
  //     method: 'POST',
  //     url: "http://localhost:5000/api/Parent/ParentRegister",
  //     timeout: process.env.REACT_APP_REQUEST_TIMEOUT_LENGTH,
  //     headers: {
  //       // data: JSON.stringify(userData),
  //       'username': userData.username,
  //       'email': userData.email,
  //       'password': userData.password,
  //     }
  //   })
  // }




  return <div>
    <PublicRoute exact path="/Providers/Register" component={ProviderRegister} />
    <ProtectedRoute exact path="/Providers/Welcome" component={ProviderWelcome} />

  </div>;
}


function ProviderWelcome() {

  return (
    <h1>
      Hello Provider!
    </h1>
  )
}