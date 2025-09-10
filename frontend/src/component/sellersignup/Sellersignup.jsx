import { BsShopWindow } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import './sellersignup.css';

function Sellersignup() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    username: "",
    phone: "",
    altPhone: "",
    panCard: "",
    gstin: "",
    addressLine1: "",
    addressLine2: "",
    state: "",
    city: "",
    pincode: "",
    accountNumber: "",
    confirmAccountNumber: "",
    ifscCode: "",
    accountHolderName: "",
    file: null
  });

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) setFormData({ ...formData, [name]: files[0] });
    else setFormData({ ...formData, [name]: value });
  };

  // Move to Step 2
  const handleNextStep1 = (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password || !formData.confirmPassword) {
      alert("Please fill all fields");
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    setStep(2);
  };

  // Move to Step 3
  const handleNextStep2 = (e) => {
    e.preventDefault();
    setStep(3);
  };

  // Final submit (Step 3)
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.accountNumber && formData.accountNumber !== formData.confirmAccountNumber) {
      alert("Account numbers do not match!");
      return;
    }

    try {
      const data = new FormData();
      Object.keys(formData).forEach(key => {
        if (formData[key]) data.append(key, formData[key]);
      });

      const res = await fetch("http://localhost:5000/api/user/seller/signup", {
        method: "POST",
        body: data
      });

      const result = await res.json();
      if (result.success) {
        localStorage.setItem("token", result.token);
        localStorage.setItem("user", JSON.stringify(result.user));
        alert("Signup successful!");
        navigate("/sellerdashboard");
      } else {
        alert(result.message || "Signup failed");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    }
  };

  return (
    <div className='seller-main-div'>
      <div className='product-summary-seller'>
        <BsShopWindow className='seller-img-product' />
        <h1 className='seller-product-name'>Welcome On Board</h1>
      </div>

      {step === 1 && (
        <form onSubmit={handleNextStep1} className='seller-address'>
          <h2>Step 1: Create Account</h2>
          <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" className='seller-form-input' />
          <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Password" className='seller-form-input' />
          <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} placeholder="Confirm Password" className='seller-form-input' />
          <button type='submit' className='seller-form-btn'>Next</button>
        </form>
      )}

      {step === 2 && (
        <form onSubmit={handleNextStep2} className='seller-address'>
          <h2>Step 2: Business Details</h2>
          <input type="text" name="username" value={formData.username} onChange={handleChange} placeholder="Name" className='seller-form-input' />
          <input type="number" name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone" className='seller-form-input' />
          <input type="number" name="altPhone" value={formData.altPhone} onChange={handleChange} placeholder="Alternative Phone" className='seller-form-input' />
          <input type="text" name="panCard" value={formData.panCard} onChange={handleChange} placeholder="Pancard" className='seller-form-input' />
          <input type="text" name="gstin" value={formData.gstin} onChange={handleChange} placeholder="GSTIN (optional)" className='seller-form-input' />
          <input type="text" name="addressLine1" value={formData.addressLine1} onChange={handleChange} placeholder="Address Line 1" className='seller-form-input' />
          <input type="text" name="addressLine2" value={formData.addressLine2} onChange={handleChange} placeholder="Address Line 2" className='seller-form-input' />
          <input type="text" name="state" value={formData.state} onChange={handleChange} placeholder="State" className='seller-form-input' />
          <input type="text" name="city" value={formData.city} onChange={handleChange} placeholder="City" className='seller-form-input' />
          <input type="number" name="pincode" value={formData.pincode} onChange={handleChange} placeholder="Pincode" className='seller-form-input' />
          <button type='submit' className='seller-form-btn'>Next</button>
        </form>
      )}

      {step === 3 && (
        <form onSubmit={handleSubmit} className='seller-address'>
          <h2>Step 3: Bank Details</h2>
          <input type="number" name="accountNumber" value={formData.accountNumber} onChange={handleChange} placeholder="Account Number" className='seller-form-input' />
          <input type="number" name="confirmAccountNumber" value={formData.confirmAccountNumber} onChange={handleChange} placeholder="Confirm Account Number" className='seller-form-input' />
          <input type="text" name="ifscCode" value={formData.ifscCode} onChange={handleChange} placeholder="IFSC" className='seller-form-input' />
          <input type="text" name="accountHolderName" value={formData.accountHolderName} onChange={handleChange} placeholder="Account Holder Name" className='seller-form-input' />
          <label htmlFor="file">Upload Passbook/Cancelled Cheque</label>
          <input type="file" name="file" onChange={handleChange} id="file" accept="image/*,.pdf" className='seller-form-input' />
          <button type='submit' className='seller-form-btn'>Submit</button>
        </form>
      )}
    </div>
  );
}

export default Sellersignup;
