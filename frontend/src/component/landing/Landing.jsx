// import { useEffect, useState, useContext } from "react";
// import { IoHeartOutline, IoHeartSharp } from "react-icons/io5";
// import { MdAddShoppingCart } from "react-icons/md";
// import { Link } from "react-router-dom";
// import { WishlistContext } from "../../component/WishlistContext";
// import { CartContext } from "../../component/CartContext";  // ✅ Cart Context
// import "./landing.css";

// function Landing() {
//   const [products, setProducts] = useState([]);
//   const { addToWishlist, removeFromWishlist, isInWishlist } = useContext(WishlistContext);
//   const { addToCart, isInCart } = useContext(CartContext); // ✅ cart functions

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const res = await fetch("http://localhost:5000/api/products");
//         const data = await res.json();
//         setProducts(data);
//       } catch (err) {
//         console.error(err);
//       }
//     };
//     fetchProducts();
//   }, []);

//   // Wishlist toggle
//   const handleWishlist = (product) => {
//     if (isInWishlist(product._id)) {
//       removeFromWishlist(product._id);
//     } else {
//       addToWishlist(product._id);
//     }
//   };

//   return (
//     <div className="product-main-div-landing">
//       {products.map((product) => (
//         <div key={product._id} className="product-card-landing">
//           {/* Product Image + Wishlist */}
//           <div className="product-img-wrapper-landing">
//             <Link to={`/detail/${product._id}`}>
//               <img
//                 src={product.imgUrl}
//                 alt={product.productName}
//                 className="product-img-landing"
//               />
//             </Link>

//             {/* Heart Icon */}
//             <span
//               className="wishlist-icon-landing"
//               onClick={() => handleWishlist(product)}
//             >
//               {isInWishlist(product._id) ? (
//                 <IoHeartSharp className="heart-filled-landing" />
//               ) : (
//                 <IoHeartOutline className="heart-outline-landing" />
//               )}
//             </span>
//           </div>

//           {/* Product Info */}
//           <div className="product-info-landing">
//             <h4 className="product-name-landing">{product.productName}</h4>
//             <p className="product-price-landing">₹{product.price}</p>

//             <Link to={`/detail/${product._id}`}>
//               <p className="product-desc-landing">
//                 <strong>Size:</strong> {product.size || "N/A"} <br />
//                 <strong>Color:</strong> {product.color || "N/A"} <br />
//                 {product.description?.substring(0, 60) || "..."}
//               </p>
//             </Link>

//             {/* Actions */}
//             <div className="product-actions-landing">
//               <button
//                 className="cart-btn-landing"
//                 onClick={() => addToCart(product)}
//               >
//                 <MdAddShoppingCart /> {isInCart(product._id) ? "Added" : ""}
//               </button>
//               <Link to={`/payment/${product._id}`}>
//                 <button className="buy-btn-landing">Buy Now</button>
//               </Link>
//             </div>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// }

// export default Landing;
import { useEffect, useState, useContext } from "react";
import { IoHeartOutline, IoHeartSharp } from "react-icons/io5";
import { MdAddShoppingCart } from "react-icons/md";
import { Link } from "react-router-dom";
import { WishlistContext } from "../../component/WishlistContext";
import { CartContext } from "../../component/CartContext";
import "./landing.css";

function Landing() {
  const [products, setProducts] = useState([]);
  const { addToWishlist, removeFromWishlist, isInWishlist } = useContext(WishlistContext);
  const { addToCart, cartItems } = useContext(CartContext);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/products");
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchProducts();
  }, []);

  const handleWishlist = (product) => {
    if (isInWishlist(product._id)) removeFromWishlist(product._id);
    else addToWishlist(product._id);
  };

  const isInCart = (productId) => cartItems.some(item => item.productId._id === productId);

  return (
    <div className="product-main-div-landing">
      {products.map((product) => (
        <div key={product._id} className="product-card-landing">
          <div className="product-img-wrapper-landing">
            <Link to={`/detail/${product._id}`}>
              <img src={product.imgUrl} alt={product.productName} className="product-img-landing" />
            </Link>
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
            <Link to={`/detail/${product._id}`}>
              <p className="product-desc-landing">
                <strong>Size:</strong> {product.size || "N/A"} <br />
                <strong>Color:</strong> {product.color || "N/A"} <br />
                {product.description?.substring(0, 60) || "..."}
              </p>
            </Link>

            <div className="product-actions-landing">
              <button
                className="cart-btn-landing"
                onClick={() => addToCart(product._id)}
              >
                <MdAddShoppingCart /> {isInCart(product._id) ? "Added" : ""}
              </button>
              <Link to={`/payment/${product._id}`}>
                <button className="buy-btn-landing">Buy Now</button>
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Landing;
