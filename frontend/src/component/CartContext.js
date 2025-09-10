// CartContext.js
import { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]); // always array

  // ✅ Fetch cart from backend
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return; // no user logged in

        const res = await fetch("http://localhost:5000/api/cart", {
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

  // ✅ Add to cart
  const addToCart = async (productId) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const res = await fetch("http://localhost:5000/api/cart", {
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

  // ✅ Remove from cart
  const removeFromCart = async (productId) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const res = await fetch(`http://localhost:5000/api/cart/${productId}`, {
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

  // ✅ Update quantity
  const updateQuantity = async (productId, quantity) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const res = await fetch(`http://localhost:5000/api/cart/${productId}`, {
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

  // ✅ Check if product is in cart safely
  const isInCart = (productId) =>
    Array.isArray(cartItems) && cartItems.some(item => item.productId?._id === productId);

  // ✅ Safe logout clears cart
  const logout = () => {
    localStorage.removeItem("token");
    setCartItems([]); // clear cart
    window.location.href = "/login"; // redirect to login
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
