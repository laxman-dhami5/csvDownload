import React, { useState } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import Login from "./components/Login";
import AuthForm from "./components/AuthForm";
import Profile from "./components/Profile";
import UpdateProfile from "./components/UpdateProfile";
import Forgot from "./components/Forgot";
import ExpenseForm from "./Expenses/ExpenseForm";

const App = () => {
  const [showLogin, setShowLogin] = useState(true);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  const switchToLogin = () => setShowLogin(true);
  const switchToSignUp = () => setShowLogin(false);

  return (
    <div style={{ backgroundColor: "blueviolet", height:"100vh"}}>
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
            <Route path="/expense-form" exact>
              <ExpenseForm />
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
