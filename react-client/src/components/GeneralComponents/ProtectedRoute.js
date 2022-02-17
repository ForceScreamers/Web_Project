import React, { Suspense } from 'react';
import { Route, Redirect, useHistory } from 'react-router-dom';
import { fetchIsAuth } from './GetAuthenticated';
import axios from 'axios';
import { useEffect, useState } from 'react';


export default function ProtectedRoute({ Component, ...rest }) {
  const history = useHistory();

  function IsLoggedIn() {
    let token = sessionStorage.getItem('token');

    if (token !== null) {
      return true;
    }
    else {
      return false;
    }
  }

  function ForceLogout() {
    sessionStorage.clear();
    history.replace("/");
  }

  return (
    <Route {...rest} render={

      (props) => {
        if (IsLoggedIn()) {
          return <Component {...props} />
        }
        else {
          sessionStorage.clear();

          //Session timed out message

          return <Redirect to="/" />
        }
      }
    } />
  )
};