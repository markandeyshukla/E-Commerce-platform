import { BsShopWindow } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import './sellersignup.css';
function Sellersignup() {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // form data collect karke backend bhejna hota hai
    // abhi demo ke liye direct redirect kar dete hain
    navigate('/sellerdashboard');  
  };

  return (
    <div className='payment-main-div'>
      <div className='product-summary-payment'>
        <BsShopWindow className='payment-img-product' />
        <h1 className='payment-product-name'>Welcome On Board</h1>
      </div>

      <h2>Enter Your Details</h2>
      <form onSubmit={handleSubmit} className='payment-address'>
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
        
        <button type='submit' className='payment-form-btn'>
          Signup as Seller
        </button>
      </form>
    </div>
  );
}

export default Sellersignup;
// 3064 3065