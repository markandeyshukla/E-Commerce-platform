import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {Link} from 'react-router-dom';
import './login.css';

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    emailOrPhone: "",
    password: ""
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/user/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if(data.success){
        alert("Login successful");

        // Save token & user info in localStorage
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));

        // Role-based redirect
        if(data.user.role === "seller"){
          navigate("/sellerdashboard");
        } else {
          navigate("/"); // buyer or default
        }

      } else {
        alert(data.message);
      }

    } catch (err) {
      console.error(err);
      alert("Server error");
    }

    setLoading(false);
  }

  return (
    <div className="login-container">
      {/* Left side branding */}
      <div className="img-login">
        <h2 className="brand-text">Viamart</h2>
        <p className="brand-subtext">Your trusted marketplace for Buyers & Sellers</p>
      </div>

      {/* Right side login form */}
      <div className="login-details">
        <form className="form-login" onSubmit={handleSubmit}>
          <h2 className="login-title">Welcome Back 👋</h2>
          <p className="login-subtitle">Login to continue shopping</p>

          <input
            type="email"
            name="emailOrPhone"
            placeholder="Enter Email"
            className="input-detail-login"
            value={formData.emailOrPhone}
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            placeholder="Enter Password"
            className="input-detail-login"
            value={formData.password}
            onChange={handleChange}
          />

          <button type="submit" className="input-detail-login-btn" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>

          <div className="form-extra">
            <a href="/forgot-password" className="forgot-link">Forgot Password?</a>
            <p className="signup-text">
              Don’t have an account? <a href="/phone">Sign Up</a>
            </p>
          </div>
{/* 
          <div className="google-login">
            <button className="google-login-btn">
              <img 
                src="https://developers.google.com/identity/images/g-logo.png" 
                alt="Google" 
                className="google-icon" 
              />
              <span>Login with Google</span> 
            </button> */}
            <p style={{ textAlign: "center", marginTop: "10px" }}>
  <Link to="/forgot-password">Forgot Password?</Link>
</p>
        </form>
      </div>
    </div>
  )
}

export default Login;
