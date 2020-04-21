import React from "react";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import {
  Home,
  Feed,
  Map,
  MyItems,
  User,
  Error,
  SignUp,
  LogIn,
  ForgotPassword,
} from "./routes";
import { NavBar } from "./components";
import { AuthProvider } from "./context/AuthContext";
import { LogedInRoute, PrivateRoute } from "./routes/Routers";

function App() {
  return (
    <main>
      <AuthProvider>
        <BrowserRouter>
          <NavBar />
          <Switch>
            <Route path="/" component={Home} exact />
            <Route path="/feed" component={Feed} />
            <Route path="/map" component={Map} />
            <Route path="/my_items" component={MyItems} />
            <PrivateRoute path="/user" component={User} />
            <LogedInRoute path="/signup" component={SignUp} />
            <LogedInRoute path="/login" component={LogIn} />
            <LogedInRoute path="/forgot_password" component={ForgotPassword} />
            <Route component={Error} />
          </Switch>
        </BrowserRouter>
      </AuthProvider>
    </main>
  );
}

export default App;
