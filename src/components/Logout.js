import React, { useContext } from 'react';
import { Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import AuthContext from '../store/auth-context';

const Logout = () => {
    const ctx = useContext(AuthContext);
    const history = useHistory(); 

    const logOutHandler = () => {
        ctx.logOut(); 
        localStorage.removeItem('idToken'); 
        history.push('/login'); 
    };

    return (
        <div style={{ margin: '10px' }}> 
            {ctx.isLoggedIn && ( 
                <Button onClick={logOutHandler}>Logout</Button>
            )}
        </div>
    );
};

export default Logout;
