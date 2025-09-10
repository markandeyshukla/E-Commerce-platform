// import { Link, useNavigate } from "react-router-dom";
// import { useState } from "react";
// import './signupphone.css';

// function SignupPhone() {
//   const navigate = useNavigate();
//   const [step, setStep] = useState(1);
//   const [formData, setFormData] = useState({
//     phone: "",
//     otp: "",
//     password: "",
//     confirmPassword: "",
//     username: ""   // optional
//   });
//   const [loading, setLoading] = useState(false);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//   }

//   // Step 1: Send OTP
//   const sendOtp = async () => {
//     if (!formData.phone) {
//       alert("Please enter phone number");
//       return;
//     }

//     let phoneNumber = formData.phone.trim();
//     // +91 automatically prepend if not there
//     if (!phoneNumber.startsWith("+")) phoneNumber = "+91" + phoneNumber;

//     setLoading(true);
//     try {
//       const res = await fetch("http://localhost:5000/api/user/signup/phone/send-otp", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ phone: phoneNumber })
//       });
//       const data = await res.json();
//       if (data.success) {
//         alert("OTP sent to your phone!");
//         setStep(2);
//       } else {
//         alert(data.message || "Failed to send OTP");
//       }
//     } catch (err) {
//       console.error(err);
//       alert("Server error");
//     }
//     setLoading(false);
//   }

//   // Step 2: Verify OTP & Signup
//   const verifyOtp = async (e) => {
//     e.preventDefault();
//     if (formData.password !== formData.confirmPassword) {
//       alert("Passwords do not match");
//       return;
//     }

//     let phoneNumber = formData.phone.trim();
//     if (!phoneNumber.startsWith("+")) phoneNumber = "+91" + phoneNumber;

//     setLoading(true);
//     try {
//       const res = await fetch("http://localhost:5000/api/user/signup/phone", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           phone: phoneNumber,
//           otp: formData.otp,
//           password: formData.password,
//           username: formData.username || phoneNumber
//         })
//       });
//       const data = await res.json();
//       if (data.success) {
//         alert("Signup successful!");
//         localStorage.setItem("token", data.token);
//         localStorage.setItem("user", JSON.stringify(data.user));
//         navigate("/"); // buyer dashboard
//       } else {
//         alert(data.message || "OTP verification failed");
//       }
//     } catch (err) {
//       console.error(err);
//       alert("Server error");
//     }
//     setLoading(false);
//   }

//   return (
//     <div className='main-div-signupphone'>
//       <div className='img-signupphone'>
//         <h2 className="brand-text-signupphone">Viamart</h2>
//         <p className="brand-subtext-signupphone">Your trusted marketplace for Buyers & Sellers</p>
//       </div>

//       <div className='signupphone-details'>
//         {step === 1 && (
//           <div className='form-signupphone'>
//             <h3>Signup With Phone Number</h3>
//             <input type="text" name="phone" placeholder='Enter Phone (+91 optional)' className='input-detail-signupphone' value={formData.phone} onChange={handleChange} />
//             <button className='input-detail-signupphone-btn' onClick={sendOtp} disabled={loading}>
//               {loading ? "Sending OTP..." : "Send OTP"}
//             </button>
//           </div>
//         )}

//         {step === 2 && (
//           <form className='form-signupphone' onSubmit={verifyOtp}>
//             <h3>Verify OTP & Set Password</h3>
//             <input type="text" name="otp" placeholder='Enter OTP' className='input-detail-signupphone' value={formData.otp} onChange={handleChange} />
//             <input type="text" name="username" placeholder='Enter Name (optional)' className='input-detail-signupphone' value={formData.username} onChange={handleChange} />
//             <input type="password" name="password" placeholder='Enter Password' className='input-detail-signupphone' value={formData.password} onChange={handleChange} />
//             <input type="password" name="confirmPassword" placeholder='Confirm Password' className='input-detail-signupphone' value={formData.confirmPassword} onChange={handleChange} />
//             <button className='input-detail-signupphone-btn' type='submit' disabled={loading}>
//               {loading ? "Verifying..." : "Verify & Signup"}
//             </button>
//           </form>
//         )}

//         <p style={{textAlign:"center"}}><Link to='/email'>Signup With E-mail</Link></p>

//         <div className='google-signupphone'>
//           <button className='google-signupphone-btn'>
//             <img src="https://developers.google.com/identity/images/g-logo.png" alt="" className='google-icon' />
//             <span>Signup With Google</span>
//           </button>
//         </div>

//         <p style={{textAlign:"end"}}><Link to='/login'>Already Have an Account? Login</Link></p>
//       </div>
//     </div>
//   )
// }

// export default SignupPhone;
