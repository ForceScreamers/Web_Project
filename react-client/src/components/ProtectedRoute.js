import axios from 'axios';
import React, { useEffect, useState, Suspense } from 'react';
import { Route, Redirect, withRouter } from 'react-router-dom';

//TODO: Find a way to create a protected route
export const ProtectedRoute = ({ component: Component, ...rest }) => {
  //let isAuth = false;
  const [isAuth, setIsAuth] = useState(false);

  const GetIsAuth = () => {

  }

  return (
    <Route {...rest} render={
      (props) => {

        axios({
          method: 'get',
          url: "http://localhost:5001/is-auth",
          timeout: 2000,
          headers: {
            "x-access-token": localStorage.getItem('token'),
          }
        })
          .then((response) => {
            setIsAuth(response.data.isAuth);
          })

        console.log(isAuth)
        if (isAuth) {
          console.log("Logged in!")

          return (
            <Suspense fallback={<h1>Loading...</h1>}>
              <Component {...props} />
            </Suspense>
          )

        }
        else {
          console.log("Unauth");

          return (
            <Suspense fallback={<h1>Loading...</h1>}>
              <Redirect to="/" />;
            </Suspense>
          )

        }
      }
    } />
  )
};