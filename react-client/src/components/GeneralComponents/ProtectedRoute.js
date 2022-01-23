import React, { Suspense, useEffect } from 'react';
import { Route, Redirect, useHistory } from 'react-router-dom';
import { fetchIsAuth } from './GetAuthenticated';
import axios from 'axios';

//TODO: Find a way to create a protected route
export const ProtectedRoute = ({ component: Component, ...rest }) => {

  let history = useHistory();
  let reasource = fetchIsAuth();

  // useEffect(() => {
  //   reasource = ;

  // }, [])

  return (
    <Suspense fallback={<Component />}>
      <Route {...rest} render={

        (props) => {



          //console.log(reasource.isAuth)
          //let isAuth = fetchIsAuth().isAuth.read();
          //let isAuth = GetIsAuth();
          console.log()
          let isAuth = reasource.isAuth.read();

          //  If the sessionStorage is clear
          if (sessionStorage.length === 0 && history.location.pathname !== "/") {

            sessionStorage.clear();
            return <Redirect to="/" />
          }

          //  If the user is authenticated
          if (isAuth) {
            return <Component {...props} />
          }
          else {
            sessionStorage.clear();
            return <Redirect to="/" />
          }
        }
      } />
    </Suspense >
  )
};