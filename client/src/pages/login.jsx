import React from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const navigate = useNavigate();

  const onsubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("https://souled-store.onrender.com/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "Login failed");
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      navigate("/");
    } catch (error) {
      console.error("Login error:", error.message);
      alert(error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black px-4">
      <div className="w-full max-w-sm sm:max-w-md md:max-w-lg bg-[#1e1e1e] rounded-xl shadow-lg p-6 sm:p-8 text-white">
        <h2 className="text-2xl sm:text-3xl font-semibold text-center mb-6">LOGIN</h2>

        <form className="flex flex-col gap-4" onSubmit={onsubmit}>
          <input
            type="email"
            placeholder="Email"
            className="p-3 sm:p-3.5 bg-[#2f2f2f] text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="p-3 sm:p-3.5 bg-[#2f2f2f] text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="submit"
            className="p-3 bg-gray-100 hover:bg-gray-300 text-black font-bold rounded-md transition"
          >
            Sign In
          </button>
        </form>

        <p className="text-center text-gray-400 mt-4 text-sm sm:text-base">
          Don't have an account?{" "}
          <a href="/signup" className="text-blue-400 hover:underline">
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
}

export default Login;
