import axios from 'axios'

export const fetchIsAuth = () => {
  const userPromise = GetIsAuth();
  return {
    isAuth: wrapPromise(userPromise),
  }
}

const wrapPromise = (promise) => {
  //  Set initial status
  let status = 'pending';
  //  Store result
  let result;
  //Wait for promise
  let suspender = promise.then(

    res => {
      status = 'success';
      result = res;
      console.log(res);
    },
    err => {
      status = 'error';
      result = err;
      console.log(err);
    }
  );

  return {
    read() {
      if (status === 'pending') {
        throw suspender;
      }
      else if (status === 'error') {
        throw result;
      }
      else if (status === 'success') {
        return result;
      }
    }
  }
}

const GetIsAuth = async () => {
  return axios({
    method: 'POST',
    // url: "http://localhost:5000/api/Auth/IsAuth",
    url: `http://${process.env.REACT_APP_DOMAIN_NAME}/api/Auth/IsAuth`,
    timeout: process.env.REACT_APP_REQUEST_TIMEOUT_LENGTH,
    headers: {
      "x-access-token": sessionStorage.getItem('token'),
    }
  }).then(res => res.data.IsAuth)
}