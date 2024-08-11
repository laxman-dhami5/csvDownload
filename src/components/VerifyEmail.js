import React, { useContext, useState } from 'react';
import { Button } from 'react-bootstrap';
import AuthContext from '../store/auth-context';

const VerifyEmail = () => {
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const ctx = useContext(AuthContext);

  const sendVerificationEmail = async () => {
    const idToken = ctx.token;

    try {
      const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyB7MGC9bOluOU6TIdOfP5N4JXykPe1u_QY', {
        method: 'POST',
        body: JSON.stringify({
          requestType: 'VERIFY_EMAIL',
          idToken: idToken
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        const data = await response.json();
        let errorMsg = 'Failed to send verification email';
        if (data && data.error && data.error.message) {
          errorMsg = data.error.message;
        }
        setError(errorMsg);
      } else {
        setSuccess('Verification email sent! Check your inbox.');
      }
    } catch (error) {
      console.error('Error:', error.message);
      setError('An unexpected error occurred. Please try again.');
    }
  };

  return (
    <div>
      <Button variant='primary' onClick={sendVerificationEmail}>
        Verify Email ID
      </Button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}
    </div>
  );
}

export default VerifyEmail;
