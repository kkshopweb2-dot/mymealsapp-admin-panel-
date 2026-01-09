import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../redux/authSlice";
import "../css/login.css";
import bg from "../assets/bg.png";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const { status, error, isAuthenticated } = useSelector((state) => state.auth);

  console.log("Login Page render - isAuthenticated:", isAuthenticated, "status:", status);

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      console.log("Authenticated detected, navigating to /dashboard");
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    // Use the thunk which now uses axios internally
    dispatch(loginUser({ email, password }));
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

        {status === 'failed' && <p className="error-text">{error}</p>}

        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label className="sub-title">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-style"
              required
            />
          </div>

          <div className="form-group">
            <label className="sub-title">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-style"
              required
            />
          </div>

          <button className="btn" type="submit" disabled={status === 'loading'}>
            {status === 'loading' ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;