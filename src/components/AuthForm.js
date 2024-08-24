import React, { useRef, useState } from "react";
import { Button, Card, Container, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { login } from '../store/authSlice'

const AuthForm = (props) => {
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const confirmPasswordRef = useRef();
  const [isLoading, setIsLoading] = useState(false);
  
  const dispatch = useDispatch();
  
  const submitHandler = async (event) => {
    event.preventDefault();
    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    const enteredConfirmPassword = confirmPasswordRef.current.value;

    if (enteredPassword !== enteredConfirmPassword) {
      alert('Passwords do not match');
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyB7MGC9bOluOU6TIdOfP5N4JXykPe1u_QY', {
        method: 'POST',
        body: JSON.stringify({
          email: enteredEmail,
          password: enteredPassword,
          returnSecureToken: true
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      });

      setIsLoading(false);

      if (!response.ok) {
        const data = await response.json();
        let errorMessage = 'Authentication failed';
        if (data && data.error && data.error.message) {
          errorMessage = data.error.message;
        }
        alert(errorMessage);
      } else {
        const data = await response.json();
        
        // Store email and token in localStorage
        localStorage.setItem("userEmail", enteredEmail);
        localStorage.setItem("authToken", data.idToken);

        // Dispatch login action to store token and userId in Redux
        dispatch(login({ token: data.idToken, userId: data.localId }));

        alert('Sign up successful');
      }
    } catch (error) {
      setIsLoading(false);
      alert('Something went wrong');
    }
  };

  return (
    <Container className="mt-4">
      <Row className="justify-content-center">
        <Col xs={12} lg={4}>
          <Card
            style={{
              textAlign: "center",
              padding: "10px",
              borderRadius: "8px",
            }}
          >
            <Card.Body>
              <h2>Sign Up</h2>
              <form onSubmit={submitHandler}>
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
                <label style={{ display: "block", marginBottom: "5px" }}>
                  Confirm Password
                </label>
                <input
                  type="password"
                  style={{
                    width: "100%",
                    marginBottom: "10px",
                    padding: "8px",
                  }}
                  required
                  ref={confirmPasswordRef}
                />
                {!isLoading && <Button type="submit" variant="primary" className="mb-2">
                  Sign Up
                </Button>}
                {isLoading && <p>Sending request...</p>}
              </form>
              <Button onClick={props.switchToLogin} variant="link">
                Already have an account? Log In
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default AuthForm;
