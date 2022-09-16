import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import Users from "./layouts/users";
import Login from "./layouts/login";
import Main from "./layouts/main";
import NavBar from "./components/ui/navBar";

function App() {
  return (
    <>
      <NavBar />
      <Switch>
        <Route path="/login:type?" component={Login} />
        <Route path="/users/:userId?" component={Users} />
        <Route path="/" exact component={Main} />
        <Redirect to="/" />
      </Switch>
    </>
  );
}

export default App;
