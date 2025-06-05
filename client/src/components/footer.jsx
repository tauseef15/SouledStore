import React from "react";
import "../css/footer.css";
import { FaFacebook, FaInstagram } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

function Footer() {
  const navigate = useNavigate();

  // Function to navigate to /about with hash and scroll
  const goToSection = (sectionId) => {
    navigate(`/about#${sectionId}`);
  };
  const goToContact = (sectionId) => {
    navigate(`/contact#${sectionId}`);
  };

  return (
    <div className="footer">
      <a href="/" className="footer-logo">
        SOULED STORE
      </a>
      <div className="footer-links">
        <div className="footer-header">COLLECTION</div>
        <div className="footer-header">CUSTOMER SERVICE</div>
        <div className="footer-header">COMPANY</div>
        <div className="footer-header">CONNECT WITH US</div>

        <a onClick={() => navigate("/collection/topwear")}>Topwear</a>
        <a href="/about">About Us</a>
        <a onClick={() => goToContact("team")}>Contact Us</a>
        <div className="flex justify-center items-center gap-3">
          <FaFacebook /> Facebook
        </div>

        <a onClick={() => navigate("/collection/bottomwear")}>Bottomwear</a>
        <a onClick={() => goToSection("track")}>Track Order</a>
        <a onClick={() => goToContact("terms")}>Terms & Conditions</a>
        <div className="flex justify-center items-center gap-3">
          <FaInstagram /> Instagram
        </div>

        <a onClick={() => navigate("/collection/footwear")}>Footwear</a>
        <a onClick={() => goToSection("cod")}>Cash On Delivery*</a>
        <a onClick={() => goToContact("privacy")}>Privacy Policy</a>
        <a
          href="#about"
          onClick={(e) => {
            e.preventDefault();
            goToSection("privacy");
          }}
        ></a>

        <a onClick={() => navigate("/collection/accessories")}>Accessories</a>
        <a onClick={() => goToSection("return")}>15 Days Return Policy*</a>
      </div>
      <div className="footer-copyright">
        <div
          style={{ marginTop: "20px" }}
          className="flex items-center font-semibold"
        >
          © 2023 Souled Store. All rights reserved.
        </div>
      </div>
    </div>
  );
}

export default Footer;
