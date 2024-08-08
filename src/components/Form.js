import React, { useRef, useState } from "react";
import { Button, Card, Container, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";



const Form = () => {
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const confirmPasswordRef = useRef();
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const submitHandler = async (event) => {
    event.preventDefault();
    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    const enteredConfirmPassword = confirmPasswordRef.current.value;

    setError('');
    setSuccess('');

    if (!enteredEmail || !enteredPassword || !enteredConfirmPassword) {
      setError('All fields are required');
      return;
    }

    if (enteredPassword !== enteredConfirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const response = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyA8OdPjLGrNGUic4_wdHjLt3LX9VMsTQG0`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: enteredEmail,
          password: enteredPassword,
          returnSecureToken: true,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error.message || 'Something went wrong');
      }

      setSuccess('User has successfully signed up');
      console.log('User has successfully signed up');
    } catch (error) {
      setError(error.message);
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
              <h2>SignUp</h2>
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
                <Button type="submit" variant="primary">
                  SignUp
                </Button>
                {error && <div style={{ color: 'red', marginTop: '10px' }}>{error}</div>}
                {success && <div style={{ color: 'green', marginTop: '10px' }}>{success}</div>}
              </form>
            </Card.Body>
          </Card>
          <Button className="mt-3 w-100" type="button" variant="secondary">
            Have an account? Login
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default Form;
