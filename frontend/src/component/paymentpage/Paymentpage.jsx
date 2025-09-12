import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { QRCodeSVG } from "qrcode.react";
import { CartContext } from "../../component/CartContext";
import { Link } from "react-router-dom";
import './paymentpage.css';

function PaymentPage() {
  const { id } = useParams();
  const { cartItems, setCartItems } = useContext(CartContext);
  const [step, setStep] = useState(1);
  const [product, setProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",  
    phone: "",
    altPhone: "",
    address1: "",
    address2: "",
    state: "",
    city: "",
    pincode: "",
    txnid:"",
    payerName:"",
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      fetch(`https://e-commerce-platform-5c4x.onrender.com/api/payment/${id}`)
        .then(res => res.json())
        .then(data => setProduct(data))
        .catch(err => console.error(err));
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStep(2);
  };

  const itemsToPay = id
    ? product ? [{ ...product, quantity: 1 }] : []
    : cartItems.map(item => ({ ...item.productId, quantity: item.quantity }));

  const totalAmount = itemsToPay.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const upiLink = `upi://pay?pa=btw.its.markandey@okaxis&pn=ViaMart&am=${totalAmount}&cu=INR`;



  const handleConfirmPayment = async () => {
    try {
      const ordersToSend = itemsToPay.map(item => ({
        productId: item._id || item.productId,
        productName: item.productName,
        email: formData.email,
        productPrice: item.price,
        userName: formData.name,
        userPhone: formData.phone,
        altPhone: formData.altPhone || "",
        addressLine1: formData.address1,
        addressLine2: formData.address2 || "",
        state: formData.state,
        city: formData.city,
        pincode: formData.pincode,
        txnid: formData.txnid,
        payerName: formData.payerName
      }));

      for (const order of ordersToSend) {
        const res = await fetch("https://e-commerce-platform-5c4x.onrender.com/api/payment", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(order)
        });
        if (!res.ok) throw new Error("Order creation failed");
      }

      alert("Order Confirmed! Payment Successful.");
      if (setCartItems) setCartItems([]); 
      navigate("/"); 
    } catch (err) {
      console.error("Order placement error:", err);
      alert("Error placing order.");
    }
  };

  if (id && !product) return <p>Loading product...</p>;

  return (
    <div className='payment-main-div'>
      {step === 1 && (
        <>
          <div className='product-summary-payment'>
            {itemsToPay.map(item => (
              <div key={item._id || item.productId}>
                <Link to={`/detail/${item._id}`}><img src={item.imgUrl} alt={item.productName} className='payment-img-product' /></Link>
                <h1 className='payment-product-name'>{item.productName}</h1>
                <p className='payment-product-price'>
                  ₹{item.price} x {item.quantity} = ₹{item.price * item.quantity}
                </p>
              </div>
            ))}
            <h3 className='payment-total-amount'>Total: ₹{totalAmount}</h3>
          </div>

          <h2 className='payment-form-title'>Enter Your Details</h2>
          <form onSubmit={handleSubmit} className='payment-address'>
            <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} className='payment-form-input' required />
            <input 
  type="email" 
  name="email" 
  placeholder="Email for order Details (optional)" 
  value={formData.email} 
  onChange={handleChange} 
  className='payment-form-input' 
/>

            <input type="number" name="phone" placeholder="10-digit phone number" value={formData.phone} onChange={handleChange} className='payment-form-input' required />
            <input type="number" name="altPhone" placeholder="Alternative Number" value={formData.altPhone} onChange={handleChange} className='payment-form-input' />
            <input type="text" name="address1" placeholder="Address Line 1" value={formData.address1} onChange={handleChange} className='payment-form-input' required />
            <input type="text" name="address2" placeholder="Address Line 2" value={formData.address2} onChange={handleChange} className='payment-form-input' />
            <input type="text" name="state" placeholder="State" value={formData.state} onChange={handleChange} className='payment-form-input' required />
            <input type="text" name="city" placeholder="City" value={formData.city} onChange={handleChange} className='payment-form-input' required />
            <input type="number" name="pincode" placeholder="Pincode" value={formData.pincode} onChange={handleChange} className='payment-form-input' required />
            <button type='submit' className='payment-form-btn'>Next</button>
          </form>
        </>
      )}

      {step === 2 && (
        <div className='payment-step2-div'>
          <h2 className='payment-step2-title'>Step 2: Payment</h2>
          <p>Scan QR code to pay 👇</p>
          <QRCodeSVG value={upiLink} size={200} fgColor="#000000" className='payment-qr-code'/>
          <a href={upiLink} className="payment-upi-btn">Pay with UPI App</a>
          <p className='payment-total-amount'>Total Amount: ₹{totalAmount}</p>
          <input type="text" name="txnid" placeholder="Enter UPI tnxid" value={formData.txnid} onChange={handleChange} className='payment-form-input' required />
            <input type="text" name="payerName" placeholder="Enter Account Holder Name" value={formData.payerName} onChange={handleChange} className='payment-form-input' required />
          <button onClick={handleConfirmPayment} className="payment-form-btn">
            Confirm Payment
          </button>
        </div>
      )}
    </div>
  );
}

export default PaymentPage;