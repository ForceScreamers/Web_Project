import axios from "axios"

// function GetParentsRequestHeaders(additionalHeaders) {
//   return {
//     method: 'POST',
//     hostname: 'localhost',
//     url: `http://${process.env.REACT_APP_DOMAIN_NAME}/api/Parent/ParentLogin`,
//     port: 5000,
//     timeout: process.env.REACT_APP_REQUEST_TIMEOUT_LENGTH,
//     headers: {
//       'Access-Control-Allow-Origin': '*',
//       'Content-Type': 'application/json',
//       'email': email,
//       'password': password,
//     }
//   }
// }


async function ApiRequest(httpMethod, request, headers, apiSection) {
  return axios({
    method: httpMethod,
    url: `http://${process.env.REACT_APP_DOMAIN_NAME}/api/${apiSection}/${request}`,
    port: 5000,
    timeout: process.env.REACT_APP_REQUEST_TIMEOUT_LENGTH,
    headers: {
      ...headers,
      ...DEFAULT_HEADERS
    }
  })
}


export async function ParentsApiRequest(httpMethod, request, headers) {
  return ApiRequest(httpMethod, request, headers, 'Parent');
}



export async function ProvidersApiRequest(httpMethod, request, headers) {
  return ApiRequest(httpMethod, request, headers, 'Provider');
}



const DEFAULT_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Content-Type': 'application/json',
}