import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Collection from "./pages/collection";
import About from "./pages/about";
import Contact from "./pages/contact";
import Product from "./pages/product";
import Cart from "./pages/cart";
import Login from "./pages/login";
import Signup from "./pages/signup";
import Placeorder from "./pages/placeorder";
import Orders from "./pages/orders";
import Navbar from "./components/navbar";
import Profile from "./pages/profile";
import { Navigate } from "react-router-dom";
import Footer from "./components/footer";
import ScrollToTop from "./components/scrolltop";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// In JSX:

function App() {
  return (
    <div className="w-full">
      <Navbar />
      <ToastContainer />
      <ScrollToTop /> {/* Automatically scrolls to top on route change */}
      {/* <div className='h-16'></div> */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/collection" element={<Collection />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/product/:productId" element={<Product />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/placeorder" element={<Placeorder />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/collection/:category" element={<Collection />} />
        </Routes>
      <Footer />
    </div>
  );
}

export default App;
