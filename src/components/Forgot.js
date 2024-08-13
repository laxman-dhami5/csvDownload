import React, { useState, useEffect } from 'react';
import { Button, Form, Alert } from 'react-bootstrap';

const Forgot = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  // Retrieve the stored email from localStorage when the component mounts
  useEffect(() => {
    const storedEmail = localStorage.getItem('forgotEmail');
    if (storedEmail) {
      setEmail(storedEmail);
    }
  }, []);

  // Store the email in localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('forgotEmail', email);
  }, [email]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyB7MGC9bOluOU6TIdOfP5N4JXykPe1u_QY', {
        method: 'POST',
        body: JSON.stringify({
          requestType: 'PASSWORD_RESET',
          email: email
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        const data = await response.json();
        let errorMsg = 'Failed to send password reset email.';
        if (data && data.error && data.error.message) {
          errorMsg = data.error.message;
        }
        setError(errorMsg);
        setMessage('');
      } else {
        setMessage('Password reset email sent successfully. Please check your inbox.');
        setError('');
        setEmail(''); // Clear the email field after successful submission
        localStorage.removeItem('forgotEmail'); // Clear the email from localStorage
      }
    } catch (error) {
      console.error('Error:', error.message);
      setError('An unexpected error occurred. Please try again.');
      setMessage('');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Forgot Password</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Send Password Reset Email
        </Button>
      </Form>
      {message && <Alert variant="success" style={{ marginTop: '20px' }}>{message}</Alert>}
      {error && <Alert variant="danger" style={{ marginTop: '20px' }}>{error}</Alert>}
    </div>
  );
};

export default Forgot;
