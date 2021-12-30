import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Route, Redirect, withRouter } from 'react-router-dom';

//TODO: Find a way to create a protected route
export const ProtectedRoute = ({ component: Component, ...rest }) => {
  const [isAuth, setIsAuth] = useState(false);


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



        if (isAuth) {
          console.log("Logged in!")
          return <Component {...props} />
        }
        else {
          console.log("Unauth")
          return <Redirect to="/" />;
        }
      }
    } />
  )
};