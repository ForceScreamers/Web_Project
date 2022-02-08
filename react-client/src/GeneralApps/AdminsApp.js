import ProvidersTable from "../Components/AdminsComponents/ProvidersTable";

import { useState } from "react";

import axios from "axios";
import { Suspense } from "react";
import { useEffect } from "react";

const providers = [
  {
    name: "shalom",
    email: "lalalala",
    phone: "123456",
  },
  {
    name: "ssrtstfjgshtrfghsrtfh",
    email: "arsfdgarg",
    phone: "12312313542345",
  },
  {
    name: "shalom",
    email: "lalalala",
    phone: "123456",
  },
  {
    name: "shalom",
    email: "lalalala",
    phone: "123456",
  },
  {
    name: "shalom",
    email: "lalalala",
    phone: "123456",
  },
]




export default function AdminsApp() {
  const [providerInfos, setProviderInfos] = useState([])

  async function LoadProviders() {
    return axios({
      method: 'GET',
      hostname: 'localhost',
      url: "http://localhost:5000/api/Provider/GetProviders",
      port: 5000,
      timeout: process.env.REACT_APP_REQUEST_TIMEOUT_LENGTH,
    })
      .catch(err => console.log(err))
      .then(response => {
        console.log(response);
        setProviderInfos(response.data);
      })
  }

  useEffect(() => {
    console.log('Loading providers');
    LoadProviders();
  }, [])


  return <div>
    <h1>דף מנהל</h1>
    <h2>בעלי מקצוע לאשר</h2>

    <ProvidersTable ProviderInfos={providerInfos} />
  </div>;
}
