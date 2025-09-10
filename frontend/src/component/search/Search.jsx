import { useEffect, useState, useContext } from "react";
import { IoHeartOutline, IoHeartSharp } from "react-icons/io5";
import { MdAddShoppingCart } from "react-icons/md";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { WishlistContext } from "../../component/WishlistContext";
import { CartContext } from "../../component/CartContext";
import "./search.css";

function Search() {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const keyword = queryParams.get("q") || "";

  const [products, setProducts] = useState([]);
  const { addToWishlist, removeFromWishlist, isInWishlist } = useContext(WishlistContext);
  const { addToCart, cartItems } = useContext(CartContext);

  useEffect(() => {
    if (keyword) {
      fetch(`https://e-commerce-platform-5c4x.onrender.com/api/products/search?q=${keyword}`)
        .then(res => res.json())
        .then(data => setProducts(data))
        .catch(err => console.error(err));
    }
  }, [keyword]);

  const token = localStorage.getItem("token"); // check login

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
    <div className="product-main-div-searchpage">
      {products.length > 0 ? (
        products.map((product) => (
          <div key={product._id} className="product-card-searchpage">
            <div className="product-img-wrapper-searchpage">
              <Link to={`/detail/${product._id}`}>
                <img src={product.imgUrl} alt={product.productName} className="product-img-searchpage" />
              </Link>
              <span className="wishlist-icon-searchpage" onClick={() => handleWishlist(product)}>
                {isInWishlist(product._id) ? (
                  <IoHeartSharp className="heart-filled-searchpage" />
                ) : (
                  <IoHeartOutline className="heart-outline-searchpage" />
                )}
              </span>
            </div>

            <div className="product-info-searchpage">
              <h4 className="product-name-searchpage">{product.productName}</h4>
              <p className="product-price-searchpage">₹{product.price}</p>
              <Link to={`/detail/${product._id}`}>
                <p className="product-desc-searchpage">
                  <strong>Size:</strong> {product.size || "N/A"} <br />
                  <strong>Color:</strong> {product.color || "N/A"} <br />
                  {product.description?.substring(0, 50) || "..."}
                </p>
              </Link>

              <div className="product-actions-searchpage">
                <button className="cart-btn-searchpage" onClick={() => handleAddToCart(product._id)}>
                  <MdAddShoppingCart /> {isInCart(product._id) ? "Added" : ""}
                </button>
                <button className="buy-btn-searchpage" onClick={() => handleBuyNow(product._id)}>
                  Buy Now
                </button>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p>No products found for "{keyword}"</p>
      )}
    </div>
  );
}

export default Search;
