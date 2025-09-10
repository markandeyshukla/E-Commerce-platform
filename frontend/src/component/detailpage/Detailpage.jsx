import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { CartContext } from "../../component/CartContext"; 
import "./detailpage.css";

function Detailpage() {
  const { id } = useParams(); 
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const { cartItems, addToCart } = useContext(CartContext);

  const isInCart = cartItems.some(item => item.productId._id === id);

  const token = localStorage.getItem("token"); 

  const handleAddToCart = () => {
    if (!token) {
      alert("Please login first to add products to cart!");
      return;
    }
    addToCart(product._id);
  };

  const handleBuyNow = () => {
    if (!token) {
      alert("Please login first to buy!");
      navigate("/login");
      return;
    }
    navigate(`/payment/${product._id}`);
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`https://e-commerce-platform-5c4x.onrender.com/api/products/${id}`);
        const data = await res.json();
        setProduct(data);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };
    fetchProduct();
  }, [id]);

  if (!product) {
    return <h2>Loading product details...</h2>;
  }

  return (
    <div className="detailpage-main-div">
      <div className="detailpage-img-div">
        <img src={product.imgUrl} alt={product.productName} className="detailpage-img" />
        <h2 className="name-product-detailpage">{product.productName}</h2>

       <button
          className="detailpage-buy-btn"
          onClick={handleAddToCart}
          disabled={isInCart} 
        >
          {isInCart ? "Added to Cart" : "Add to Cart"}
        </button>

        
        <button className="detailpage-buy-btn" onClick={handleBuyNow}>
          Buy {product.productName}
        </button>
      </div>

      <div className="detailpage-feature-div">
        <div className="detailpage-inside-div">
          <h2 className="name-product-detailpage">{product.productName}</h2>
          <p><strong>Brand:</strong> {product.brandName}</p>
          <p><strong>Size:</strong> {product.size || "N/A"}</p>
          <p><strong>Color:</strong> {product.color || "N/A"}</p>
          <p><strong>Price:</strong> ₹{product.price}</p>
          <p><strong>Manufacturer:</strong> {product.manufacturer || "N/A"}</p>
          <p><strong>Origin:</strong> {product.assemble || "N/A"}</p>
          <p><strong>Warranty:</strong> {product.warranty || "N/A"}</p>
          <p><strong>Return Policy:</strong> {product.returnDays} days</p>
          <p><strong>Description:</strong> {product.description}</p>
        </div>
      </div>
    </div>
  );
}

export default Detailpage;
