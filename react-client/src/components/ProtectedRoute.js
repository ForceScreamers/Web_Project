import axios from 'axios';
import React, { useEffect, useState, Suspense } from 'react';
import { Route, Redirect, withRouter } from 'react-router-dom';
import { fetchIsAuth } from './GetAuthenticated';




//TODO: Find a way to create a protected route
export const ProtectedRoute = ({ component: Component, ...rest }) => {

  const reasource = fetchIsAuth();

  return (
    <Suspense fallback={<h1>Loading...</h1>}>
      <Route {...rest} render={
        (props) => {
          let isAuth = reasource.isAuth.read();
          console.log(reasource.isAuth)

          if (isAuth) {
            return <Component {...props} />
          }
          else {
            localStorage.clear();
            return <Redirect to="/" />
          }
        }
      } />
    </Suspense>
  )
};