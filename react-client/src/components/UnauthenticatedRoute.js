//TODO: Deal with this mess
import { Route, Redirect, useLocation } from "react-router-dom";

function UnauthenticatedRoute({ setIsAuth, isAuth, component: Component, ...rest }) {
  return (
    <div>
      <Route
        {...rest}
        render={(props) => {
          if (isAuth) {
            //The user is already logged
            //alert('If you go back, you will be logged out')

            return <Component />
          }
          else {
            { console.log("Is authenticated: " + isAuth) }

            return <Redirect to={{ pathname: "/", state: { from: props.location } }} />
          }
        }}
      />
    </div>
  )
}

export default UnauthenticatedRoute
