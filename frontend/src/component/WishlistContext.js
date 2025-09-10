import { createContext, useState, useEffect } from "react";

export const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [wishlistItems, setWishlistItems] = useState([]); // full product objects

  // ✅ Fetch wishlist from backend
  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/wishlist");
        const data = await res.json();
        // backend returns [{_id, productId: {...}}]
        setWishlistItems(data); // full objects now
      } catch (err) {
        console.error("Fetch wishlist error:", err);
      }
    };
    fetchWishlist();
  }, []);

  // ✅ Add to wishlist
  const addToWishlist = async (productId) => {
    try {
      const res = await fetch("http://localhost:5000/api/wishlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId }),
      });
      const data = await res.json();
      if (res.ok) {
        setWishlistItems(prev => [...prev, data]); // push full object
      }
    } catch (err) {
      console.error("Add wishlist error:", err);
    }
  };

  // ✅ Remove from wishlist (by productId)
  const removeFromWishlist = async (productId) => {
    try {
      const res = await fetch(`http://localhost:5000/api/wishlist/${productId}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setWishlistItems(prev => prev.filter(item => item.productId._id !== productId));
      }
    } catch (err) {
      console.error("Remove wishlist error:", err);
    }
  };

  // ✅ Check if product is in wishlist safely
  const isInWishlist = (productId) =>
    Array.isArray(wishlistItems) && wishlistItems.some(item => item.productId?._id === productId);

  return (
    <WishlistContext.Provider
      value={{
        wishlistItems,
        setWishlistItems,
        addToWishlist,
        removeFromWishlist,
        isInWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};
