
import { Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../store/authSlice';

const Logout = () => {
    const isLoggedIn=useSelector(state=>state.auth.isLoggedIn)
    const dispatch=useDispatch()
    const history = useHistory(); 

    const logOutHandler = () => {
        dispatch(logout()) 
        localStorage.removeItem('idToken'); 
        history.push('/login'); 
    };

    return (
        <div style={{ margin: '10px' }}> 
            {isLoggedIn && ( 
                <Button variant='danger' onClick={logOutHandler}>Logout</Button>
            )}
        </div>
    );
};

export default Logout;
