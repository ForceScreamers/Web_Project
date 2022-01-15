//import routes

import { Router } from "react-router-dom"
import { Route } from "react-router-dom"
import ParentRegister from "./Pages/ParentsPages/ParentRegister"

export default function createRoutes() {
  <Router>
    <Route exact path="/" component={() => {
      <ParentRegister />
    }} />

  </Router>
  // <Router>
  //   <PublicRoute exact path="/" component={() =>
  //     <ParentLogin HandleLogin={(e, isValid) => HandleLogin(e, isValid)} />}
  //   />

  //   <PublicRoute exact path="/Register" component={() =>
  //     <ParentRegister
  //       HandleRegister={(e, isValid) => HandleRegister(e, isValid)}
  //     />} />

  //   {/* //TODO: NEED TO CALL THE ROUTES ONLY WHEN THE WELCOME PAGE LOADS*/}
  //   <LogoutContext.Provider value={LogoutUser}>
  //     <NavBarContext.Provider value={{
  //       child: currentChild,
  //       username: username,
  //     }}>

  //       <ProtectedRoute exact path="/Welcome" component={Welcome} />
  //       <ProtectedRoute exact path="/About" component={About} />

  //       <ProtectedRoute path="/EditProfile" component={() =>
  //         <EditProfile
  //           HandleSelectChild={HandleSelectChild}
  //           HandleDeleteChild={HandleDeleteChild}
  //           HandleAddChild={(e, isValid) => HandleAddChild(e, isValid)}
  //         />}
  //       />
  //       <ProtectedRoute exact path="/Games" component={Games} />
  //       <ProtectedRoute exact path="/Info" component={Info} />
  //       <ProtectedRoute exact path="/Avatar" component={Avatar} />
  //       <ProtectedRoute exact path="/Journal" component={Journal} />
  //       <ProtectedRoute exact path="/Home" component={Home} />
  //     </NavBarContext.Provider>

  //   </LogoutContext.Provider>
  // </Router>
}