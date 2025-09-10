
import { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]); 


  useEffect(() => {
    const fetchCart = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return; 

        const res = await fetch("https://e-commerce-platform-5c4x.onrender.com/api/cart", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        setCartItems(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Fetch cart error:", err);
        setCartItems([]);
      }
    };
    fetchCart();
  }, []);


  const addToCart = async (productId) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const res = await fetch("https://e-commerce-platform-5c4x.onrender.com/api/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ productId }),
      });
      const data = await res.json();
      if (res.ok) {
        setCartItems(prev => Array.isArray(prev) ? [...prev, data] : [data]);
      }
    } catch (err) {
      console.error("Add cart error:", err);
    }
  };


  const removeFromCart = async (productId) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const res = await fetch(`https://e-commerce-platform-5c4x.onrender.com/api/cart/${productId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        setCartItems(prev => prev.filter(item => item.productId?._id !== productId));
      }
    } catch (err) {
      console.error("Remove cart error:", err);
    }
  };


  const updateQuantity = async (productId, quantity) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const res = await fetch(`https://e-commerce-platform-5c4x.onrender.com/api/cart/${productId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ quantity }),
      });
      if (res.ok) {
        const updated = await res.json();
        setCartItems(prev =>
          prev.map(item => item.productId?._id === productId ? updated : item)
        );
      }
    } catch (err) {
      console.error("Update quantity error:", err);
    }
  };


  const isInCart = (productId) =>
    Array.isArray(cartItems) && cartItems.some(item => item.productId?._id === productId);


  const logout = () => {
    localStorage.removeItem("token");
    setCartItems([]); 
    window.location.href = "/login"; 
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        isInCart,
        logout,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
