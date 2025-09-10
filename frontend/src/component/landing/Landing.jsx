import { useEffect, useState, useContext } from "react";
import { IoHeartOutline, IoHeartSharp } from "react-icons/io5";
import { MdAddShoppingCart } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { WishlistContext } from "../../component/WishlistContext";
import { CartContext } from "../../component/CartContext";
import "./landing.css";

function Landing() {
  const [products, setProducts] = useState([]);
  const { addToWishlist, removeFromWishlist, isInWishlist } = useContext(WishlistContext);
  const { addToCart, cartItems } = useContext(CartContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("https://e-commerce-platform-5c4x.onrender.com/api/products");
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchProducts();
  }, []);

  const token = localStorage.getItem("token"); 

  const handleWishlist = (product) => {
    if (!token) {
      alert("Please login first to manage your wishlist!");
      return;
    }
    if (isInWishlist(product._id)) removeFromWishlist(product._id);
    else addToWishlist(product._id);
  };

  const handleAddToCart = (productId) => {
    if (!token) {
      alert("Please login first to add products to cart!");
      return;
    }
    addToCart(productId);
  };

  const handleBuyNow = (productId) => {
    if (!token) {
      alert("Please login first to buy!");
      navigate("/login");
      return;
    }
    navigate(`/payment/${productId}`);
  };

  const isInCart = (productId) => cartItems.some(item => item.productId._id === productId);

  return (
    <div className="product-main-div-landing">
      {products.map((product) => (
        <div key={product._id} className="product-card-landing">
          <div className="product-img-wrapper-landing">
            <img src={product.imgUrl} alt={product.productName} className="product-img-landing" />
            <span className="wishlist-icon-landing" onClick={() => handleWishlist(product)}>
              {isInWishlist(product._id) ? (
                <IoHeartSharp className="heart-filled-landing" />
              ) : (
                <IoHeartOutline className="heart-outline-landing" />
              )}
            </span>
          </div>

          <div className="product-info-landing">
            <h4 className="product-name-landing">{product.productName}</h4>
            <p className="product-price-landing">₹{product.price}</p>
            <p className="product-desc-landing">
              <strong>Size:</strong> {product.size || "N/A"} <br />
              <strong>Color:</strong> {product.color || "N/A"} <br />
              {product.description?.substring(0, 60) || "..."}
            </p>

            <div className="product-actions-landing">
              <button
                className="cart-btn-landing"
                onClick={() => handleAddToCart(product._id)}
              >
                <MdAddShoppingCart /> {isInCart(product._id) ? "Added" : ""}
              </button>
              <button className="buy-btn-landing" onClick={() => handleBuyNow(product._id)}>
                Buy Now
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Landing;
