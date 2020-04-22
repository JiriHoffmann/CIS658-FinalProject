import React from "react";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import {
  About,
  Home,
  Feed,
  MyItems,
  NewItem,
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
            <Route path="/about" component={About} exact />
            <Route path="/feed" component={Feed} />
            <PrivateRoute path="/my_items" component={MyItems} />
            <PrivateRoute path="/new_item" component={NewItem} />
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
