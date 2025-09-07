import { BsShopWindow } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import './sellersignup.css';

function Sellersignup() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1); // Track step

  const handleNext = (e) => {
    e.preventDefault();
    setStep(step + 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // last step -> redirect to dashboard
    navigate("/sellerdashboard");
  };

  return (
    <div className='payment-main-div'>
      <div className='product-summary-payment'>
        <BsShopWindow className='payment-img-product' />
        <h1 className='payment-product-name'>Welcome On Board</h1>
      </div>

      {step === 1 && (
        <>
          <h2>Step 1: Create Account</h2>
          <form onSubmit={handleNext} className='payment-address'>
            <input type="email" placeholder="Enter Email" className='payment-form-input'/>
            <input type="password" placeholder="Enter password" className='payment-form-input'/>
            <input type="password" placeholder="Enter Again Password" className='payment-form-input'/>
            <button type='submit' className='payment-form-btn'>Next</button>
          </form>
        </>
      )}

      {step === 2 && (
        <>
          <h2>Step 2: Business Details</h2>
          <form onSubmit={handleNext} className='payment-address'>
            <input type="text" placeholder="Name" className='payment-form-input'/>
            <input type="number" placeholder="Enter 10-digit phone number" className='payment-form-input'/>
            <input type="number" placeholder="Alternative Number" className='payment-form-input'/>
            <input type="text" placeholder="Pancard Number" className='payment-form-input'/>
            <input type="text" placeholder="GSTIN (optional)" className='payment-form-input'/>
            <input type="text" placeholder="Pickup Address Line 1" className='payment-form-input'/>
            <input type="text" placeholder="Pickup Address Line 2" className='payment-form-input'/>
            <input type="text" placeholder="State" className='payment-form-input'/>
            <input type="text" placeholder="City" className='payment-form-input'/>
            <input type="number" placeholder="Pincode" className='payment-form-input'/>
            <button type='submit' className='payment-form-btn'>Next</button>
          </form>
        </>
      )}

      {step === 3 && (
        <>
          <h2>Step 3: Bank Details</h2>
          <form onSubmit={handleSubmit} className='payment-address'>
            <input type="number" placeholder="Enter Account Number" className='payment-form-input'/>
            <input type="number" placeholder="Enter Again Account Number" className='payment-form-input'/>
            <input type="text" placeholder="IFSC CODE" className='payment-form-input'/>
            <input type="text" placeholder="Account Holder Name same As in Passbook" className='payment-form-input'/>

            <label htmlFor="passbook">Upload Passbook / Cancelled Cheque</label>
            <input type="file" id="passbook" accept="image/*,.pdf" className='payment-form-input'/>

            <button type='submit' id="sellerdashboardlogin" className='payment-form-btn'>
              Signup as Seller
            </button>
          </form>
        </>
      )}
    </div>
  );
}

export default Sellersignup;
