import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Route, Redirect, withRouter } from 'react-router-dom';
import history from '../History';


export const ProtectedRoute = ({ component: Component, ...rest }) => {
  const isAuth = true;

  return (
    <Route {...rest} render={
      (props) => {
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