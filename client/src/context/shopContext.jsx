import React, { createContext, useState, useEffect } from "react";
import Products from "../data/products";

export const shopContext = createContext();

const ShopContextProvider = (props) => {
  const user = JSON.parse(localStorage.getItem("user")); // user object from login
  const userId = user?.id;

  const [cart, setCart] = useState([]);
  const clearCart = () => {
    setCart([]);
  };

  const currency = "₹";
  const deliveryCharge = 50;

  // Load cart from localStorage per user on mount
  useEffect(() => {
    if (!userId) return; // no user logged in
    const storedCart = localStorage.getItem(`cart_${userId}`);
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, [userId]);

  // Save cart to localStorage per user on cart update
  useEffect(() => {
    if (!userId) return;
    localStorage.setItem(`cart_${userId}`, JSON.stringify(cart));
  }, [cart, userId]);

  // Add item to cart (per user)
  const addToCart = (id, selectedSize) => {
    const product = Products.find((p) => p.id === id);
    if (!product) return;

    const sizeNeeded =
      product.category === "Accessories"
        ? null
        : selectedSize || (product.category === "Footwear" ? "UK 8" : "M");

    const existingIndex = cart.findIndex(
      (item) => item.id === id && (item.size ?? null) === sizeNeeded
    );

    if (existingIndex !== -1) {
      const updatedCart = [...cart];
      updatedCart[existingIndex].quantity += 1;
      setCart(updatedCart);
    } else {
      const newCartItem = {
        id: product.id,
        name: product.name,
        price: product.price,
        typeofproduct: product.typeofproduct,
        size: sizeNeeded,
        quantity: 1,
        category: product.category,
        image: product.images[0],
      };
      setCart([...cart, newCartItem]);
    }
  };

  // Update size or quantity
  const updateCartItem = (index, key, value) => {
    const updatedCart = [...cart];
    updatedCart[index][key] = value;
    setCart(updatedCart);
  };

  // Remove item from cart
  const removeFromCart = (index) => {
    const updatedCart = [...cart];
    updatedCart.splice(index, 1);
    setCart(updatedCart);
  };

  const value = {
    Products,
    currency,
    deliveryCharge,
    cart,
    addToCart,
    updateCartItem,
    removeFromCart,
    clearCart,
  };

  return (
    <shopContext.Provider value={value}>{props.children}</shopContext.Provider>
  );
};

export default ShopContextProvider;
