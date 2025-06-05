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
    <div
      style={{ padding: "10px", backgroundColor: "rgb(14, 13, 13)" }}
      className="flex items-center justify-between font-medium fixed top-0 left-0 right-0 z-50 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]"
    >
      <NavLink to="/" className="flex items-center gap-2">
        <div className="text-zinc-50 text-lg">SOULED STORE</div>
      </NavLink>

      <ul className="hidden sm:flex gap-5 text-sm text-zinc-50">
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

      <div
  style={{ marginRight: "10px", marginTop: "2px" }}
  className="hidden sm:flex items-center gap-5 text-sm text-zinc-50 relative"
  ref={dropdownRef}
>
  {/* Show username */}
  {user && (
    <div className="text-zinc-50 mr-3 select-none">
    <span className="font-semibold">{user.username}</span>
    </div>
  )}

  {/* Cart Icon */}
  {user && (
    <div className="relative">
      <NavLink to="/cart" className={({ isActive }) => `${base} ${isActive ? active : ""}`}>
        <IoBag className="w-4 h-4 cursor-pointer hover:text-zinc-500 active:text-zinc-500" />
      </NavLink>
      {cartCount > 0 && (
        <span className="cart-icon absolute -top-1 -right-2 bg-red-600 text-white text-[10px] px-[6px] py-[1px] rounded-full font-semibold">
          {cartCount}
        </span>
      )}
    </div>
  )}

  {/* Profile Icon and Dropdown */}
  <img
    src={ProfileIcon}
    alt="Profile"
    className="w-4 h-4 rounded-full cursor-pointer hover:opacity-75 active:opacity-60"
    onClick={() => setDropdownOpen(!dropdownOpen)}
  />

  {dropdownOpen && (
    <div className="absolute top-10 right-0 bg-white shadow-md text-black w-28 z-50">
      <ul className="flex flex-col text-sm">
        {user ? (
          <>
            <li>
              <NavLink
                to="/orders"
                style={{ padding: "5px 8px" }}
                className="block hover:bg-zinc-100"
                onClick={() => setDropdownOpen(false)}
              >
                Orders
              </NavLink>
            </li>
            <li>
              <span
                style={{ padding: "5px 8px", cursor: "pointer" }}
                className="block hover:bg-zinc-100"
                onClick={handleLogout}
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
                style={{ padding: "5px 8px" }}
                className="block hover:bg-zinc-100"
                onClick={() => setDropdownOpen(false)}
              >
                Login
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/signup"
                style={{ padding: "5px 8px" }}
                className="block hover:bg-zinc-100"
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
