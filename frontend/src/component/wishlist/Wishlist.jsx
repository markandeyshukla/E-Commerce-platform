import { useEffect, useState, useContext } from "react";
import { WishlistContext } from "../../component/WishlistContext";
import { Link } from "react-router-dom";
import "./wishlist.css";

function Wishlist() {
  const [wishlist, setWishlist] = useState([]);
  const { removeFromWishlist } = useContext(WishlistContext);

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const token = localStorage.getItem("token"); // fetch token
        const res = await fetch("http://localhost:5000/api/wishlist", {
          headers: {
            "Authorization": `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          setWishlist([]); // fallback if unauthorized
          return;
        }

        const data = await res.json();
        setWishlist(Array.isArray(data) ? data : []); // ensure array
      } catch (err) {
        console.error(err);
        setWishlist([]);
      }
    };

    fetchWishlist();
  }, []);

  const removeItem = async (productId) => {
    await removeFromWishlist(productId);
    setWishlist(prev => prev.filter(item => item.productId._id !== productId));
  };

  return (
    <div className="wishlist-main-div">
      {wishlist.length === 0 && <p>No products in wishlist.</p>}
      {Array.isArray(wishlist) && wishlist.map(item => (
        <div key={item._id} className="wishlist-card">
          <Link
            to={`/detail/${item.productId._id}`}
            className="wishlist-link"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <img
              src={item.productId?.imgUrl}
              alt={item.productId?.productName}
              className="wishlist-img"
            />
            <div className="wishlist-info">
              <h3 className="wishlist-product-name">{item.productId?.productName}</h3>
              <p className="wishlist-product-price">₹{item.productId?.price}</p>
            </div>
          </Link>
          <div className="wishlist-buttons">
            <button
              className="wishlist-remove-btn"
              onClick={() => removeItem(item.productId._id)}
            >
              Remove
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Wishlist;
