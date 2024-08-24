import React, { useRef, useState } from "react";
import { Button, Card, Container, Row, Col } from "react-bootstrap";
import { useHistory, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../store/authSlice";

const Login = (props) => {
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();
  const dispatch = useDispatch();

  const loginHandler = async (event) => {
    event.preventDefault();
    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    setIsLoading(true);
    try {
      const response = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyB7MGC9bOluOU6TIdOfP5N4JXykPe1u_QY",
        {
          method: "POST",
          body: JSON.stringify({
            email: enteredEmail,
            password: enteredPassword,
            returnSecureToken: true,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      setIsLoading(false);

      if (!response.ok) {
        const data = await response.json();
        let errorMsg = "Login failed";
        if (data && data.error && data.error.message) {
          errorMsg = data.error.message;
        }
        alert(errorMsg);
      } else {
        const data = await response.json();
        
        // Store user email and auth token in localStorage
        localStorage.setItem("userEmail", enteredEmail);
        localStorage.setItem("authToken", data.idToken);

        // Dispatch the login action with token and user ID
        dispatch(login({ idToken: data.idToken, userId: data.localId }));
        
        // Redirect to profile page
        history.replace("/profile");
      }
    } catch (error) {
      setIsLoading(false);
      alert("Something went wrong");
    }
  };

  return (
    <Container className="mt-4">
      <Row className="justify-content-center">
        <Col xs={12} lg={4}>
          <h1 style={{ color: "black", fontFamily: "serif" }}>
            Expense Tracker
          </h1>
          <Card
            style={{
              textAlign: "center",
              padding: "10px",
              borderRadius: "8px",
            }}
          >
            <Card.Body>
              <h2>Login</h2>
              <form onSubmit={loginHandler}>
                <label style={{ display: "block", marginBottom: "5px" }}>
                  Email
                </label>
                <input
                  type="email"
                  style={{
                    width: "100%",
                    marginBottom: "10px",
                    padding: "8px",
                  }}
                  required
                  ref={emailInputRef}
                />
                <label style={{ display: "block", marginBottom: "5px" }}>
                  Password
                </label>
                <input
                  type="password"
                  style={{
                    width: "100%",
                    marginBottom: "10px",
                    padding: "8px",
                  }}
                  required
                  ref={passwordInputRef}
                />
                {!isLoading && (
                  <Button type="submit" variant="primary" className="mb-2">
                    Login
                  </Button>
                )}
                {isLoading && <p>Sending request...</p>}
              </form>
              <Link to="/forgot-password">Forgot Password</Link>
              <Button onClick={props.switchToSignUp} variant="link">
                Don't have an account? Sign Up
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
