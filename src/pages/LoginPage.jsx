import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../redux/authSlice';
import { Link, useNavigate } from 'react-router-dom';
import "../css/login.css";
import bg from "../assets/bg.png";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(login({ email, password }))
      .unwrap()
      .then(() => {
        navigate('/dashboard');
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <div
      className="login-container"
      style={{
        backgroundImage: `url(${bg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <h1 className="login-title">My Meals</h1>
      <div className="form-area">
        <p className="form-title">LOGIN</p>
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label className="sub-title" htmlFor="email">Email</label>
            <input
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              id="email"
              className="form-style"
              type="email"
            />
          </div>
          <div className="form-group">
            <label className="sub-title" htmlFor="password">Password</label>
            <input
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              id="password"
              className="form-style"
              type="password"
            />
          </div>
          <button className="btn" type="submit">Login</button>
        </form>
        
      </div>
    </div>
  );
};

export default Login;