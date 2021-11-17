
import { Route, Redirect, useLocation } from "react-router-dom";

function AuthenticatedRoute({ isAuth, component: Component, ...rest }) {
  return (
    <div>
      <Route
        {...rest}
        render={(props) => {
          if (isAuth) {
            { console.log("Is authenticated: " + isAuth) }
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

export default AuthenticatedRoute
