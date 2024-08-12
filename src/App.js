import React, { useContext, useState } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Login from "./components/Login";
import AuthForm from "./components/AuthForm";
import Profile from "./components/Profile";
import AuthContext from "./store/auth-context";
import UpdateProfile from "./components/UpdateProfile";
import Forgot from "./components/Forgot";

const App = () => {
  const [showLogin, setShowLogin] = useState(true);
  const ctx = useContext(AuthContext);
  const isLoggedIn = ctx.isLoggedIn;

  const switchToLogin = () => setShowLogin(true);
  const switchToSignUp = () => setShowLogin(false);

  return (
    <div>
      <Switch>
        {!isLoggedIn && (
          <>
            <Route path="/login" exact>
              {showLogin ? (
                <Login switchToSignUp={switchToSignUp} />
              ) : (
                <AuthForm switchToLogin={switchToLogin} />
              )}
            </Route>
            <Route path="/forgot-password" exact>
              <Forgot />
            </Route>
            <Route path="*">
              <Redirect to="/login" />
            </Route>
          </>
        )}
        {isLoggedIn && (
          <>
            <Route path="/profile" exact>
              <Profile />
            </Route>
            <Route path="/complete-profile" exact>
              <UpdateProfile />
            </Route>
            <Route path="*">
              <Redirect to="/profile" />
            </Route>
          </>
        )}
      </Switch>
    </div>
  );
};

export default App;
