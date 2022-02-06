import axios from 'axios'
import utf8 from 'utf8'

export async function RequestRegisterAsParent({ username, email, password }) {
  return axios({
    method: 'POST',
    hostname: 'localhost',
    url: 'http://localhost:5000/api/Parent/ParentRegister',
    port: 5000,
    timeout: process.env.REACT_APP_REQUEST_TIMEOUT_LENGTH,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
      'username': username,
      'email': email,
      'password': password,
    }
  })
    .catch(err => console.log(err))
}

export async function RequestRegisterAsProvider(fullName, email, password, occupation) {
  return axios({
    method: 'POST',
    hostname: 'localhost',
    url: 'http://localhost:5000/api/Provider/ProviderRegister',
    port: 5000,
    timeout: process.env.REACT_APP_REQUEST_TIMEOUT_LENGTH,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
      'fullName': utf8.encode(fullName),
      'email': email,
      'password': password,
      'occupation': utf8.encode(occupation),
    }
  })
    .catch(err => console.log(err))
}