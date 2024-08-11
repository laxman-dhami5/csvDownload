import React from 'react';

import { Link } from 'react-router-dom';

const Profile = () => {
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <p>Welcome to Expense Tracker!!!</p>
        <p>
         Your Profile is incomplete,
          <Link to="/complete-profile">Complete now</Link>
        </p>
      </div><hr />
      
    </div>
  );
};

export default Profile;
