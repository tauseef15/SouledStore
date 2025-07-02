import React, { useState, useRef, useEffect, useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { IoBag, IoMenu, IoClose } from "react-icons/io5";
import ProfileIcon from "../assets/profile.png";
import { shopContext } from "../context/shopContext";

function Navbar() {
  const active = "text-zinc-500";
  const base = "cursor-pointer hover:text-zinc-500";
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropdownRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const navigate = useNavigate();

  const { cart } = useContext(shopContext);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(e.target)) {
        setMobileMenuOpen(false);
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
    <div className="fixed top-0 left-0 right-0 z-50 bg-zinc-900 text-zinc-50 px-[1vw] py-2 sm:py-3 flex items-center justify-between font-medium">
      {/* Logo */}
      <NavLink to="/" className="text-lg md:text-sm font-semibold">
        SOULED STORE
      </NavLink>

      {/* Center Nav Links */}
      <ul className="hidden sm:flex gap-5 text-sm">
        <li>
          <NavLink
            to="/"
            className={({ isActive }) => `${base} ${isActive ? active : ""}`}
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/collection"
            className={({ isActive }) => `${base} ${isActive ? active : ""}`}
          >
            Collection
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/about"
            className={({ isActive }) => `${base} ${isActive ? active : ""}`}
          >
            About
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/contact"
            className={({ isActive }) => `${base} ${isActive ? active : ""}`}
          >
            Contact
          </NavLink>
        </li>
      </ul>

      {/* Right Side */}
      <div className="flex items-center gap-4 sm:gap-5 relative" ref={dropdownRef}>
        {/* Username */}
        {user && (
          <span className="hidden sm:block text-xs sm:text-sm font-semibold select-none">
            {user.username}
          </span>
        )}

        {/* Cart Icon */}
        {user && (
          <div className="relative">
            <NavLink
              to="/cart"
              className={({ isActive }) => `${base} ${isActive ? active : ""}`}
            >
              <IoBag className="w-4 h-4 sm:w-5 sm:h-5" />
            </NavLink>
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-2 bg-red-600 text-white text-[10px] px-[6px] py-[1px] rounded-full font-semibold">
                {cartCount}
              </span>
            )}
          </div>
        )}

        {/* Profile Icon Dropdown (only sm+) */}
        <img
          src={ProfileIcon}
          alt="Profile"
          className="hidden sm:block w-4 h-4 rounded-full cursor-pointer hover:opacity-75 active:opacity-60"
          onClick={() => setDropdownOpen(!dropdownOpen)}
        />

        {/* Dropdown Menu */}
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

        {/* Mobile Menu Icon */}
        <div className="sm:hidden text-xl">
          <IoMenu
            onClick={() => setMobileMenuOpen(true)}
            className="cursor-pointer"
          />
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div
          ref={mobileMenuRef}
          className="fixed inset-0 bg-zinc-900 text-white z-50 flex flex-col px-8 py-6"
        >
          {/* Close */}
          <div className="self-end text-2xl mb-6">
            <IoClose
              onClick={() => setMobileMenuOpen(false)}
              className="cursor-pointer"
            />
          </div>

          {/* Navigation */}
          <div className="flex flex-col gap-5 text-lg">
            <NavLink
              to="/"
              onClick={() => setMobileMenuOpen(false)}
              className={({ isActive }) => `${base} ${isActive ? active : ""}`}
            >
              Home
            </NavLink>
            <NavLink
              to="/collection"
              onClick={() => setMobileMenuOpen(false)}
              className={({ isActive }) => `${base} ${isActive ? active : ""}`}
            >
              Collection
            </NavLink>
            <NavLink
              to="/about"
              onClick={() => setMobileMenuOpen(false)}
              className={({ isActive }) => `${base} ${isActive ? active : ""}`}
            >
              About
            </NavLink>
            <NavLink
              to="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className={({ isActive }) => `${base} ${isActive ? active : ""}`}
            >
              Contact
            </NavLink>
          </div>

          {/* Divider */}
          <hr className="my-6 border-zinc-700" />

          {/* Auth & Cart */}
          <div className="flex flex-col gap-5 text-lg">
            {user ? (
              <>
                <span className="font-semibold">{user.username}</span>
                <NavLink
                  to="/orders"
                  onClick={() => setMobileMenuOpen(false)}
                  className="hover:text-zinc-400"
                >
                  Orders
                </NavLink>
                <NavLink
                  to="/cart"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2 hover:text-zinc-400"
                >
                  <IoBag className="w-5 h-5" />
                  <span>Cart ({cartCount})</span>
                </NavLink>
                <span
                  onClick={() => {
                    handleLogout();
                    setMobileMenuOpen(false);
                  }}
                  className="cursor-pointer hover:text-zinc-400"
                >
                  Log Out
                </span>
              </>
            ) : (
              <>
                <NavLink
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="hover:text-zinc-400"
                >
                  Login
                </NavLink>
                <NavLink
                  to="/signup"
                  onClick={() => setMobileMenuOpen(false)}
                  className="hover:text-zinc-400"
                >
                  Signup
                </NavLink>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Navbar;
