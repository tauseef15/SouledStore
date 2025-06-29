import React, { useState, useRef, useEffect, useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { IoBag } from "react-icons/io5";
import ProfileIcon from "../assets/profile.png";
import { shopContext } from "../context/shopContext";

function Navbar() {
  const active = "text-zinc-500";
  const base = "cursor-pointer hover:text-zinc-500";
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  const { cart } = useContext(shopContext);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setDropdownOpen(false);
    navigate("/login");
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-zinc-900 text-zinc-50 px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] py-2 flex items-center justify-between font-medium">
      {/* Logo */}
      <NavLink to="/" className="text-lg font-semibold">
        SOULED STORE
      </NavLink>

      {/* Center Nav Links (hide on xs) */}
      <ul className="hidden sm:flex gap-5 text-sm">
        <li>
          <NavLink to="/" className={({ isActive }) => `${base} ${isActive ? active : ""}`}>Home</NavLink>
        </li>
        <li>
          <NavLink to="/collection" className={({ isActive }) => `${base} ${isActive ? active : ""}`}>Collection</NavLink>
        </li>
        <li>
          <NavLink to="/about" className={({ isActive }) => `${base} ${isActive ? active : ""}`}>About</NavLink>
        </li>
        <li>
          <NavLink to="/contact" className={({ isActive }) => `${base} ${isActive ? active : ""}`}>Contact</NavLink>
        </li>
      </ul>

      {/* Right: Profile + Cart */}
      <div className="flex items-center gap-5 text-sm relative" ref={dropdownRef}>
        {/* Username */}
        {user && (
          <span className="hidden sm:block font-semibold select-none">
            {user.username}
          </span>
        )}

        {/* Cart Icon */}
        {user && (
          <div className="relative">
            <NavLink to="/cart" className={({ isActive }) => `${base} ${isActive ? active : ""}`}>
              <IoBag className="w-5 h-5" />
            </NavLink>
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-2 bg-red-600 text-white text-[10px] px-[6px] py-[1px] rounded-full font-semibold">
                {cartCount}
              </span>
            )}
          </div>
        )}

        {/* Profile Dropdown */}
        <img
          src={ProfileIcon}
          alt="Profile"
          className="w-5 h-5 rounded-full cursor-pointer hover:opacity-75 active:opacity-60"
          onClick={() => setDropdownOpen(!dropdownOpen)}
        />

        {dropdownOpen && (
          <div className="absolute top-10 right-0 bg-white shadow-md text-black w-28 rounded-md overflow-hidden z-50">
            <ul className="flex flex-col text-sm">
              {user ? (
                <>
                  <li>
                    <NavLink
                      to="/orders"
                      className="block px-3 py-2 hover:bg-zinc-100"
                      onClick={() => setDropdownOpen(false)}
                    >
                      Orders
                    </NavLink>
                  </li>
                  <li>
                    <span
                      onClick={handleLogout}
                      className="block px-3 py-2 hover:bg-zinc-100 cursor-pointer"
                    >
                      Log Out
                    </span>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <NavLink
                      to="/login"
                      className="block px-3 py-2 hover:bg-zinc-100"
                      onClick={() => setDropdownOpen(false)}
                    >
                      Login
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/signup"
                      className="block px-3 py-2 hover:bg-zinc-100"
                      onClick={() => setDropdownOpen(false)}
                    >
                      Signup
                    </NavLink>
                  </li>
                </>
              )}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;
