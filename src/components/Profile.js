import React from 'react';
import { Link } from 'react-router-dom';
import VerifyEmail from './VerifyEmail'; // Import the VerifyEmail component

const Profile = () => {
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <p>Welcome to Expense Tracker!!!</p>
        <p>
          Your Profile is incomplete,
          <Link to="/complete-profile">Complete now</Link>
        </p>
      </div>
      <VerifyEmail /> {/* Add the VerifyEmail component here */}
      <hr />
    </div>
  );
};

export default Profile;
