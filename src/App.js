import React, {  useState } from 'react';
import Login from './components/Login';
import AuthForm from './components/AuthForm';



const App = () => {
  const [showLogin, setShowLogin] = useState(true);
  
  const switchToLogin=()=>{
    setShowLogin(true)
  }
  const switchToSignUp = () =>{
    setShowLogin(false)
  }

  return (
    <div >
      
      
      {showLogin ? <Login switchToSignUp={switchToSignUp} /> : <AuthForm switchToLogin={switchToLogin} />}
    </div>
  );
};

export default App;
