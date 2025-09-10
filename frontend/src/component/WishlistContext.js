import { createContext, useState, useEffect } from "react";

export const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [wishlistItems, setWishlistItems] = useState([]); 

  
  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return; 

        const res = await fetch("https://e-commerce-platform-5c4x.onrender.com/api/wishlist", {
          headers: {
            "Authorization": `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          console.error("Unauthorized or error fetching wishlist");
          return;
        }

        const data = await res.json();
        setWishlistItems(data); 
      } catch (err) {
        console.error("Fetch wishlist error:", err);
      }
    };
    fetchWishlist();
  }, []);


  const addToWishlist = async (productId) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const res = await fetch("https://e-commerce-platform-5c4x.onrender.com/api/wishlist", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({ productId }),
      });

      const data = await res.json();
      if (res.ok) {
        setWishlistItems(prev => [...prev, data]); 
      }
    } catch (err) {
      console.error("Add wishlist error:", err);
    }
  };

  
  const removeFromWishlist = async (productId) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const res = await fetch(`https://e-commerce-platform-5c4x.onrender.com/api/wishlist/${productId}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });
      if (res.ok) {
        setWishlistItems(prev => prev.filter(item => item.productId._id !== productId));
      }
    } catch (err) {
      console.error("Remove wishlist error:", err);
    }
  };

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
