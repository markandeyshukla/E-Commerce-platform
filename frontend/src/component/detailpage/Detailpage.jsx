import { useEffect, useState, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { CartContext } from "../../component/CartContext"; // ✅ Cart Context
import "./detailpage.css";

function Detailpage() {
  const { id } = useParams(); // URL se id milega
  const [product, setProduct] = useState(null);

  const { cartItems, addToCart } = useContext(CartContext);

  // Check if product is already in cart
  const isInCart = cartItems.some(item => item.productId._id === id);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/products/${id}`);
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

        {/* Add to Cart button */}
        <button
          className="detailpage-buy-btn"
          onClick={() => addToCart(product._id)}
          disabled={isInCart} // disable if already in cart
        >
          {isInCart ? "Added to Cart" : "Add to Cart"}
        </button>

        <Link to={`/payment/${product._id}`}>
          <button className="detailpage-buy-btn">
            Buy {product.productName}
          </button>
        </Link>
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
