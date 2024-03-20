import React from "react";
import './index.css';
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const onSubmit = (event) => {
    event.preventDefault();
    // Here you can add your authentication logic
    // After successful authentication, navigate to the Home page
    navigate('/home');
  };

  return (
    <div className="container">
      <div className="login-page">
        <form className="login-form" onSubmit={onSubmit}>
          <label htmlFor="username">Username:</label>
          <input type="text" id="username" placeholder="Enter your username" name="username" required />

          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Enter your password"
            required
          />

          <input type="submit" value="Submit" className="submit-button" />
        </form>
      </div>
    </div>
  );
}

export default Login;
