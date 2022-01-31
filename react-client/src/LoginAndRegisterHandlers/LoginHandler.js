import axios from "axios";

export async function RequestLoginAsProvider(email, password) {
  return axios({
    method: 'POST',
    hostname: 'localhost',
    url: `http://localhost:5000/api/Provider/ProviderLogin`,
    port: 5000,
    timeout: process.env.REACT_APP_REQUEST_TIMEOUT_LENGTH,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
      'email': email,
      'password': password,
    }
  })
    .catch(err => console.log(err))
}

export async function RequestLoginAsParent(email, password) {
  return axios({
    method: 'POST',
    hostname: 'localhost',
    url: `http://localhost:5000/api/Parent/ParentLogin`,
    port: 5000,
    timeout: process.env.REACT_APP_REQUEST_TIMEOUT_LENGTH,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
      'email': email,
      'password': password,
    }
  })
    .catch(err => console.log(err))
}