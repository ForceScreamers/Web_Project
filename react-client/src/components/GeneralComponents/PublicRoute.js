import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Route, Redirect } from 'react-router-dom';


export const PublicRoute = ({ component: Component, ...rest }) => {

  return (
    <Route {...rest} render={
      (props) => {
        console.log("hello")
        return <Component {...props} />
      }
    } />
  )
}

