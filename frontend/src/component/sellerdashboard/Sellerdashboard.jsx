import { FiEdit } from "react-icons/fi";
import { AiOutlineDelete } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import './Sellerdashboard.css';
import { useEffect, useState } from 'react';

function Sellerdashboard() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  // Fetch products from backend
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = () => {
    fetch("http://localhost:5000/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error(err));
  };

  // Delete product
  const handleDelete = (id) => {
    if(window.confirm("Are you sure you want to delete this product?")) {
      fetch(`http://localhost:5000/api/products/${id}`, {
        method: "DELETE",
      })
      .then((res) => res.json())
      .then(() => {
        // Remove deleted product from state
        setProducts(products.filter(p => p._id !== id));
      })
      .catch(err => console.error(err));
    }
  };

  // Navigate to edit page
  const handleEdit = (id) => {
    navigate(`/edit/${id}`); // Create EditProduct page for PUT
  };

  return (
    <div className="product-main-div-sellerdashboard">
      {products.map((product) => (
        <div key={product._id} className="product-div-sellerdashboard">

          {/* Product Image with Delete Icon */}
          <div className="product-img-div-sellerdashboard">
            <img src={product.imgUrl} alt={product.productname} className="product-img-sellerdashboard" />
            <span className="overlay-delete-sellerdashboard" onClick={() => handleDelete(product._id)}>
              <AiOutlineDelete />
            </span>
          </div>

          {/* Product Info */}
          <div className="product-info-sellerdashboard">
            <h4 className="product-name-sellerdashboard">{product.productName}</h4>
            <p className="product-price-sellerdashboard">₹ {product.price}</p>
            <p className="product-extra-sellerdashboard">
              <strong>Size:</strong> {product.size} <br />
              <strong>Color:</strong> {product.color}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="product-actions-sellerdashboard">
            <Link to={`/detail/${product._id}`}>
              <button className="view-btn-sellerdashboard">View</button>
            </Link>
            <button className="edit-btn-sellerdashboard" onClick={() => handleEdit(product._id)}>
              <FiEdit /> Edit
            </button>
          </div>
        </div>
      ))}

      {/* Upload New Product */}
      <Link to='/listing'>
        <div className="upload-car-booking-sellerdashboard" id="upload">
          <img className="img-upload-sellerdashboard" src="https://cdn-icons-png.flaticon.com/512/5173/5173034.png" alt=""/>
          <div className="subupload-car-booking-sellerdashboard">
            <h3>List your Product</h3>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default Sellerdashboard;
