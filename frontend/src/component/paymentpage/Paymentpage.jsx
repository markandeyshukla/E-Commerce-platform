import { useState } from "react";
import Fownload from './download.jpg';
import './paymentpage.css';

function Paymentpage() {
  const [step, setStep] = useState(1);

  return (
    <div className='payment-main-div'>
      {step === 1 && (
        <>
          <div className='product-summary-payment'>
            <img src={Fownload} alt="" className='payment-img-product' />
            <h1 className='payment-product-name'>Name OF Product</h1>
            <p className='payment-product-price'>price</p>
          </div>
          <h2>Enter Your Details</h2>
          <form 
            onSubmit={(e) => {
              e.preventDefault();
              setStep(2); // next step par le jao
            }}
            className='payment-address'
          >
            <input type="text" placeholder="name" className='payment-form-input'/>
            <input type="number" placeholder="Enter 10-digit phone number" className='payment-form-input'/>
            <input type="number" placeholder="Alternative Number" className='payment-form-input'/>
            <input type="text" placeholder="Address Line 1" className='payment-form-input'/>
            <input type="text" placeholder="Address Line 2" className='payment-form-input'/>
            <input type="text" placeholder="State" className='payment-form-input'/>
            <input type="text" placeholder="City" className='payment-form-input'/>
            <input type="number" placeholder="Pincode" className='payment-form-input'/>
            <button type='submit' className='payment-form-btn'> Next </button>
          </form>
        </>
      )}

      {step === 2 && (
        <div>
          <h2>Step 2: Payment</h2>
          <p>QR code lag jayega yahan 👇</p>
          <img src="/qrcode.png" alt="QR Code" style={{width: "200px"}} />
          upi app se payment 
          gpay icon
          phonepay icon
          paytm icon
            <p>After payment, click the button below to confirm.</p>
        </div>
      )}
    </div>
  );
}

export default Paymentpage;
