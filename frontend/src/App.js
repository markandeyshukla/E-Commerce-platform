import React from 'react';
import AppRouter from './AppRouter';
import { WishlistProvider } from './component/WishlistContext.js';
import { CartProvider } from "./component/CartContext.js";
function App() {
  return (
   <>
   <WishlistProvider>
    <CartProvider>
      <AppRouter/>
    </CartProvider>
   </WishlistProvider>
   </>
  );
}

export default App;

