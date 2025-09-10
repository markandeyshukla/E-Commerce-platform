import { useState } from "react";
import './forgotpassword.css';

function ForgotPassword() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({ email: "", otp: "", newPassword: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  }

  const sendOtp = async () => {
    if (!formData.email) return alert("Enter email");
    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/forgot-password/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: formData.email })
      });
      const data = await res.json();
      if (data.success) {
        alert("OTP sent to your email");
        setStep(2);
      } else {
        alert(data.message);
      }
    } catch (err) {
      console.error(err);
      alert("Server error");
    }
    setLoading(false);
  }

  const verifyOtp = async (e) => {
    e.preventDefault();
    if (!formData.otp || !formData.newPassword) return alert("Fill all fields");

    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/forgot-password/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (data.success) {
        alert("Password reset successful! Login with new password");
        window.location.href = "/login"; // redirect to login
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
    <div className="forgot-password-main">
      {step === 1 && (
        <div className="forgot-password-form">
          <h3>Forgot Password</h3>
          <input type="email" name="email" placeholder="Enter your email" value={formData.email} onChange={handleChange} />
          <button onClick={sendOtp} disabled={loading}>{loading ? "Sending OTP..." : "Send OTP"}</button>
        </div>
      )}
      {step === 2 && (
        <form onSubmit={verifyOtp} className="forgot-password-form">
          <h3>Reset Password</h3>
          <input type="text" name="otp" placeholder="Enter OTP" value={formData.otp} onChange={handleChange} />
          <input type="password" name="newPassword" placeholder="New Password" value={formData.newPassword} onChange={handleChange} />
          <button type="submit" disabled={loading}>{loading ? "Resetting..." : "Reset Password"}</button>
        </form>
      )}
    </div>
  )
}

export default ForgotPassword;
