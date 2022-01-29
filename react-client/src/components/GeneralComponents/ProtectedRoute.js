import React, { Suspense } from 'react';
import { Route, Redirect, useHistory } from 'react-router-dom';
import { fetchIsAuth } from './GetAuthenticated';




//TODO: Find a way to create a protected route
export const ProtectedRoute = ({ component: Component, ...rest }) => {

  let reasource = fetchIsAuth();
  let history = useHistory();


  return (
    <Suspense fallback={<Component />}>
      <Route {...rest} render={

        (props) => {
          let isAuth = reasource.isAuth.read();
          console.log(isAuth)
          console.log(reasource)

          // If the sessionStorage is clear
          // if (sessionStorage.length === 0 && history.location.pathname !== "/") {

          //   sessionStorage.clear();
          //   return <Redirect to="/" />
          // }

          //  If the user is authenticated
          if (isAuth) {
            return <Component {...props} />
          }
          else {
            //sessionStorage.clear();
            return <Redirect to="/" />
          }
        }
      } />
    </Suspense >
  )
};