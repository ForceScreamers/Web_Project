import ProvidersTable from "../Components/AdminsComponents/ProvidersTable";

import { useState } from "react";

import axios from "axios";
import { useEffect } from "react";


export default function AdminsApp() {
  const [providerInfos, setProviderInfos] = useState([])

  async function LoadProviders() {
    return axios({
      method: 'GET',
      hostname: 'localhost',
      // url: "http://localhost:5000/api/Provider/GetProviders",
      url: `http://${process.env.REACT_APP_DOMAIN_NAME}/api/Provider/GetProviders`,
      port: 5000,
      timeout: process.env.REACT_APP_REQUEST_TIMEOUT_LENGTH,
    })
      .catch(err => console.log(err))
      .then(response => {
        if (response) {
          console.log("EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE");
          console.log(response);
          setProviderInfos(response.data);
        }
      })
  }

  async function ConfirmProvider(providerId) {
    return axios({
      method: 'POST',
      hostname: 'localhost',
      url: `http://${process.env.REACT_APP_DOMAIN_NAME}/api/Admin/ConfirmProvider`,
      port: 5000,
      timeout: process.env.REACT_APP_REQUEST_TIMEOUT_LENGTH,
      headers: {
        'providerId': providerId,
      }
    })
      .catch(err => console.log(err))
      .then(() => {
        LoadProviders();
      })
  }

  useEffect(() => {
    console.log('Loading providers');
    LoadProviders();
  }, [])


  return <div>
    <h1>דף מנהל</h1>
    <h2>בעלי מקצוע לאשר</h2>

    <ProvidersTable ProviderInfos={providerInfos} ConfirmProvider={ConfirmProvider} />
  </div>;
}
