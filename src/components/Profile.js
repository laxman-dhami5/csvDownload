import React from 'react';
import { Link } from 'react-router-dom';
import VerifyEmail from './VerifyEmail'; 
import Logout from './Logout';

const Profile = () => {
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between',fontFamily:'sans-serif',fontSize:'30px' }}>
        <p>Welcome to Expense Tracker!!!</p>
        <p>
          Your Profile is incomplete,
          <Link to="/complete-profile" style={{color:'white'}}>Complete now</Link>
        </p>
        <Logout/>
      </div>
      <VerifyEmail />
      <hr />
      <Link to="/expense-form" style={{color:'white',fontSize:'30px'}}>Daily Expenses</Link>
    </div>
  );
};

export default Profile;
