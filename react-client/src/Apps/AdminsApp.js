import ProvidersTable from "../Components/AdminsComponents/ProvidersTable";

import { useState } from "react";

import axios from "axios";
import { useEffect } from "react";
import { ProvidersApiRequest } from "../RequestHeadersToWebApi";
import LogoutButton from "../Components/GeneralComponents/LogoutButton";


export default function AdminsApp() {
  const [providerInfos, setProviderInfos] = useState([])

  async function LoadProviders() {
    try {
      let response = await ProvidersApiRequest('GET', 'GetProviders', null)
      setProviderInfos(response.data);
    }
    catch (err) {
      console.log(err);
    }
  }

  async function ConfirmProvider(providerId) {
    let confirmProviderData = {
      providerId: providerId,
    }

    try {
      ProvidersApiRequest('POST', 'ConfirmProvider', confirmProviderData)
        .then(() => {
          LoadProviders();
        })
    }
    catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    console.log('Loading providers');
    LoadProviders();
  }, [])


  return <div>
    <h1>דף מנהל</h1>
    <h2>בעלי מקצוע לאשר</h2>

    <ProvidersTable ProviderInfos={providerInfos} ConfirmProvider={ConfirmProvider} />


    <LogoutButton />
  </div>;
}
