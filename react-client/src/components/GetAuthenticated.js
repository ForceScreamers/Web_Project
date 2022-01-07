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
    },
    err => {
      status = 'error';
      result = err;
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
    method: 'get',
    url: "http://localhost:5001/is-auth",
    timeout: 2000,
    headers: {
      "x-access-token": sessionStorage.getItem('token'),
    }
  }).then(res => res.data.isAuth)
}