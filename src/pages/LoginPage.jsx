import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../redux/authSlice";
import { useNavigate } from "react-router-dom";
import "../css/login.css";
import bg from "../assets/bg.png";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Redux state
  const { loading, error } = useSelector((state) => state.auth);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      await dispatch(loginUser({ email, password })).unwrap();
      navigate("/dashboard");
    } catch (err) {
      console.error("Login failed:", err);
    }
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

        {/* Error Message */}
        {error && <p className="error-text">{error}</p>}

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

          <button className="btn" type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;

