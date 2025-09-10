import { FiEdit } from "react-icons/fi";
import { AiOutlineDelete } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import './Sellerdashboard.css';
import { useEffect, useState } from 'react';

function Sellerdashboard() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem("token"); 

  useEffect(() => {
    const fetchProducts = () => {
      fetch("https://e-commerce-platform-5c4x.onrender.com/api/products/seller", {
        headers: {
          "Authorization": `Bearer ${token}`, 
        },
      })
        .then((res) => {
          if (res.status === 401) {
            alert("Unauthorized! Please login again.");
            navigate("/login");
            return [];
          }
          return res.json();
        })
        .then((data) => setProducts(data))
        .catch((err) => console.error(err));
    };

    fetchProducts();
  }, [token, navigate]); 

  const handleDelete = (id) => {
    if (!token) {
      alert("Please login first!");
      navigate("/login");
      return;
    }

    if (window.confirm("Are you sure you want to delete this product?")) {
      fetch(`https://e-commerce-platform-5c4x.onrender.com/api/products/${id}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then(() => {
          setProducts(products.filter((p) => p._id !== id));
        })
        .catch((err) => console.error(err));
    }
  };

  const handleEdit = (id) => {
    if (!token) {
      alert("Please login first!");
      navigate("/login");
      return;
    }
    navigate(`/edit/${id}`);
  };

  return (
    <div className="product-main-div-sellerdashboard">
      {products.map((product) => (
        <div key={product._id} className="product-div-sellerdashboard">
          <div className="product-img-div-sellerdashboard">
            <img
              src={product.imgUrl}
              alt={product.productName}
              className="product-img-sellerdashboard"
            />
            <span
              className="overlay-delete-sellerdashboard"
              onClick={() => handleDelete(product._id)}
            >
              <AiOutlineDelete />
            </span>
          </div>

          <div className="product-info-sellerdashboard">
            <h4 className="product-name-sellerdashboard">{product.productName}</h4>
            <p className="product-price-sellerdashboard">₹ {product.price}</p>
            <p className="product-extra-sellerdashboard">
              <strong>Size:</strong> {product.size} <br />
              <strong>Color:</strong> {product.color}
            </p>
          </div>

      
          <div className="product-actions-sellerdashboard">
            <Link to={`/detail/${product._id}`}>
              <button className="view-btn-sellerdashboard">View</button>
            </Link>
            <button
              className="edit-btn-sellerdashboard"
              onClick={() => handleEdit(product._id)}
            >
              <FiEdit /> Edit
            </button>
          </div>
        </div>
      ))}

      
      <Link to="/listing">
        <div className="upload-car-booking-sellerdashboard" id="upload">
          <img
            className="img-upload-sellerdashboard"
            src="https://cdn-icons-png.flaticon.com/512/5173/5173034.png"
            alt="Upload"
          />
          <div className="subupload-car-booking-sellerdashboard">
            <h3>List your Product</h3>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default Sellerdashboard;
