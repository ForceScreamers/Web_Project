import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Route, Redirect } from 'react-router-dom';


const PublicRoute = ({ DumpToken, component: Component, ...rest }) => {

  return (
    <Route {...rest} render={
      (props) => {
        console.log("Logging out...")
        return <Component {...props} />
      }
    } />
  )
}

export default PublicRoute