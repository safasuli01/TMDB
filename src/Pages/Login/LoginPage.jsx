import React from 'react';
import Login from '../../components/Login/Login';

const LoginPage = () => {
  const handleLogin = (username, password) => {
    console.log('Login attempt:', { username, password });
  };

  return (
    <div className="login-page">
      <Login onLogin={handleLogin} />
    </div>
  );
};

export default LoginPage;
