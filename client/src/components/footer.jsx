import React from "react";
import { FaFacebook, FaInstagram } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

function Footer() {
  const navigate = useNavigate();

  const goToSection = (sectionId) => {
    navigate(`/about#${sectionId}`);
  };
  const goToContact = (sectionId) => {
    navigate(`/contact#${sectionId}`);
  };

  return (
    <footer className="bg-white text-zinc-900 px-6 py-10 mt-10">
      <div className="max-w-7xl mx-auto flex flex-col items-center sm:items-start">
        <a href="/" className="text-2xl font-bold mb-6">
          SOULED STORE
        </a>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 w-full text-center sm:text-left text-sm md:text-lg">
          <div>
            <div className="font-bold text-md md:text-lg mb-2">COLLECTION</div>
            <div className="space-y-2">
              <p className="cursor-pointer font-medium" onClick={() => navigate("/collection/topwear")}>Topwear</p>
              <p className="cursor-pointer font-medium" onClick={() => navigate("/collection/bottomwear")}>Bottomwear</p>
              <p className="cursor-pointer font-medium" onClick={() => navigate("/collection/footwear")}>Footwear</p>
              <p className="cursor-pointer font-medium" onClick={() => navigate("/collection/accessories")}>Accessories</p>
            </div>
          </div>

          <div>
            <div className="font-bold text-md md:text-lg mb-2">CUSTOMER SERVICE</div>
            <div className="space-y-2">
              <p className="cursor-pointer font-medium" onClick={() => goToSection("track")}>Track Order</p>
              <p className="cursor-pointer font-medium" onClick={() => goToSection("cod")}>Cash On Delivery*</p>
              <p className="cursor-pointer font-medium" onClick={() => goToSection("return")}>15 Days Return Policy*</p>
            </div>
          </div>

          <div>
            <div className="font-bold text-md md:text-lg mb-2">COMPANY</div>
            <div className="space-y-2">
              <p className="cursor-pointer font-medium" onClick={() => navigate("/about")}>About Us</p>
              <p className="cursor-pointer font-medium" onClick={() => goToContact("team")}>Contact Us</p>
              <p className="cursor-pointer font-medium" onClick={() => goToContact("terms")}>Terms & Conditions</p>
              <p className="cursor-pointer font-medium" onClick={() => goToContact("privacy")}>Privacy Policy</p>
            </div>
          </div>

          <div>
            <div className="font-bold text-md md:text-lg mb-2">CONNECT WITH US</div>
            <div className="space-y-2">
              <div className="flex justify-center sm:justify-start items-center gap-2 cursor-pointer font-medium">
                <FaFacebook /> Facebook
              </div>
              <div className="flex justify-center sm:justify-start items-center gap-2 cursor-pointer font-medium">
                <FaInstagram /> Instagram
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 text-sm font-semibold text-center w-full">
          © 2023 Souled Store. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

export default Footer;
