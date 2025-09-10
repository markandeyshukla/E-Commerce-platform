import { useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { CartContext } from "../../component/CartContext";
import "./cart.css";

function Cart() {
  // ✅ Provide default empty array to avoid runtime errors
  const { cartItems = [], removeFromCart, updateQuantity } = useContext(CartContext);
  const navigate = useNavigate();

  // ✅ Calculate total safely
  const total = Array.isArray(cartItems)
    ? cartItems.reduce((sum, item) => sum + (item.productId?.price || 0) * item.quantity, 0)
    : 0;

  // ✅ Checkout handler
  const handleCheckout = () => {
    if (!Array.isArray(cartItems) || cartItems.length === 0) {
      alert("Your cart is empty!");
      return;
    }
    navigate("/payment");
  };

  return (
    <div className="cart-main-div">
      <h2 className="cart-title">Your Cart</h2>

      {/* ✅ Show empty message */}
      {Array.isArray(cartItems) && cartItems.length === 0 && (
        <p className="cart-empty">No items in cart.</p>
      )}

      {/* ✅ Render cart items safely */}
      {Array.isArray(cartItems) &&
        cartItems.map((item) => (
          <div key={item._id} className="cart-card">
            <Link to={`/detail/${item.productId?._id}`}>
              <img
                src={item.productId?.imgUrl || ""}
                alt={item.productId?.productName || "Product"}
                className="cart-img"
              />
            </Link>

            <div className="cart-info">
              <h3 className="cart-product-name">{item.productId?.productName || "Product"}</h3>
              <p className="cart-product-price">₹{item.productId?.price || 0}</p>

              <div className="cart-actions">
                <button
                  onClick={() =>
                    updateQuantity(item.productId?._id, Math.max(1, item.quantity - 1))
                  }
                  disabled={item.quantity === 1}
                  className="cart-qty-btn"
                >
                  -
                </button>
                <span className="cart-qty">{item.quantity}</span>
                <button
                  onClick={() =>
                    updateQuantity(item.productId?._id, item.quantity + 1)
                  }
                  className="cart-qty-btn"
                >
                  +
                </button>
              </div>

              <button
                className="cart-remove-btn"
                onClick={() => removeFromCart(item.productId?._id)}
              >
                Remove
              </button>

              <Link to={`/payment/${item.productId?._id}`}>
                <button className="cart-Buynow-btn">Buy</button>
              </Link>
            </div>
          </div>
        ))}

      {/* ✅ Cart summary */}
      {Array.isArray(cartItems) && cartItems.length > 0 && (
        <div className="cart-summary">
          <h3 className="cart-total">Total: ₹{total}</h3>
          <button className="cart-payment-btn" onClick={handleCheckout}>
            Proceed to Payment
          </button>
        </div>
      )}
    </div>
  );
}

export default Cart;
