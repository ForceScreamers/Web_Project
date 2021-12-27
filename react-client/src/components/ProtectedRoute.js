import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Route, Redirect } from 'react-router-dom';

const ProtectedRoute = ({ component: Component, ...rest }) => {

  console.log("hello")

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    console.log("Ya")
    axios({
      method: 'get',
      url: "http://localhost:5001/is-auth",
      timeout: 2000,
      headers: {
        "x-access-token": localStorage.getItem('token'),
      }
    })
      .catch(err => console.log(err))
      .then((response) => {
        console.log(response.data);

        if (response.data.isAuth) {
          console.log("Setting auth");
          setIsAuthenticated(response.data.isAuth);
        }
      })
  }, []);

  if (isAuthenticated === null) {
    return <Redirect to='/no-token' />
  }

  return (
    <Route {...rest} render={props => {
      console.log(isAuthenticated);
      !isAuthenticated ? (
        <Redirect to='/' />
      ) : (
        <Component {...props} />
      )
    }
    }
    />
  );
};

export default ProtectedRoute;