import React, { Suspense } from 'react';
import { Route, Redirect, useHistory } from 'react-router-dom';
import { fetchIsAuth } from './GetAuthenticated';
import axios from 'axios';
import { useEffect, useState } from 'react';


export const PublicRoute = ({ component: Component, ...rest }) => {

  //let reasource = fetchIsAuth();
  const history = useHistory();
  const [data, updateData] = useState();

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

  useEffect(() => {
    const getData = async () => {
      const resp = await GetIsAuth();
      //const json = await resp.json()
      updateData(resp);
    }
    getData();
  }, []);

  return data && <Component />
  // return (
  //   <Suspense fallback={<Component />}>
  //     <Route {...rest} render={

  //       (props) => {
  //         let isAuth = fetchIsAuth();
  //         console.log(isAuth)

  //         //  If the sessionStorage is clear
  //         if (sessionStorage.length === 0 && history.location.pathname !== "/") {

  //           sessionStorage.clear();
  //           return <Redirect to="/" />
  //         }

  //         //  If the user is authenticated
  //         if (isAuth.isAuth.read() === true) {
  //           return <Component {...props} />
  //         }
  //         else {
  //           sessionStorage.clear();
  //           history.replace("/");
  //           return <Redirect to="/" />
  //         }
  //       }
  //     } />
  //   </Suspense >
  // )
};