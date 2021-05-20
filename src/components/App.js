import React from "react";
import SignUp from "./SignUp";
import { AuthProvider } from "../contexts/AuthContext";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Dashboard from "./Dashboard";
import Login from "./Login";
import PrivateRoute from "./PrivateRoute";
import ForgetPassword from "./ForgetPassword";
import UpdateProfile from "./UpdateProfile";
import Home from "./Home";
import Events from "./Events";
import BookEvent from "./BookEvent";
import ViewEvent from "./ViewEvent";
import AddEvent from "./AddEvent";
import OtpVerification from "./OtpVerification";

function App() {
  return (
    <>
      <Router>
        <AuthProvider>
          <Switch>
            <PrivateRoute exact path="/" component={Dashboard} />
            <Route path="/signup" component={SignUp} />
            <Route path="/forget-password" component={ForgetPassword} />
            <PrivateRoute path="/update-profile" component={UpdateProfile} />
            <Route path="/login" component={Login} />
            <Route path="/home" component={Home} />
            <Route path="/events" component={Events} />
            <PrivateRoute path="/book-event/:id" component={BookEvent} />
            <Route path="/view-event/:id" component={ViewEvent} />
            <PrivateRoute path="/add-event" component={AddEvent} />
            <Route path="/otp-verification" component={OtpVerification} />
          </Switch>
        </AuthProvider>
      </Router>
    </>
  );
}

export default App;
