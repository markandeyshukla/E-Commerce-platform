import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import './signupemail.css';

function SignupEmail() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(formData.password !== formData.confirmPassword){
      alert("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/user/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: formData.username,
          email: formData.email,
          password: formData.password
        })
      });

      const data = await res.json();

      if(data.success){
        // Backend should return token, role, username, email
        const { token, user } = data; // user = { username, email, role }

        // Save token & user info in localStorage
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));

        alert("Signup successful!");

        // Role-based navigation
        if(user.role === "seller"){
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
    <div className='main-div-signupemail'>
      <div className='img-signupemail'>
        <h2 className="brand-text-signupemail">Viamart</h2>
        <p className="brand-subtext-signupemail">Your trusted marketplace for Buyers & Sellers</p>
      </div>

      <div className='signupemail-details'>
        <form onSubmit={handleSubmit} className='form-signupemail'>
          <h3>Signup With E-mail</h3>
          <input type="text" name="username" placeholder='Enter Name' className='input-detail-signupemail' value={formData.username} onChange={handleChange} />
          <input type="email" name="email" placeholder='Enter Email' className='input-detail-signupemail' value={formData.email} onChange={handleChange} />
          <input type="password" name="password" placeholder='Enter Password' className='input-detail-signupemail' value={formData.password} onChange={handleChange} />
          <input type="password" name="confirmPassword" placeholder='Confirm Password' className='input-detail-signupemail' value={formData.confirmPassword} onChange={handleChange} />
          <button type="submit" className='input-detail-signupemail-btn' disabled={loading}>
            {loading ? "Signing up..." : "Signup"}
          </button>
        </form>

        <p style={{textAlign:"center"}}><Link to='/phone'>Signup With Phone</Link></p>

        <div className='google-signupemail'>
          <button className='google-signupemail-btn'>
            <img src="https://developers.google.com/identity/images/g-logo.png" alt="" className='google-icon' />
            <span>Signup With Google</span>
          </button>
        </div>

        <p style={{textAlign:"end"}}><Link to='/login'>Already Have an Account? Login</Link></p>
      </div>
    </div>
  )
}

export default SignupEmail;
