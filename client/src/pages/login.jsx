import React from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const navigate = useNavigate();

  const onsubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:3000/api/users/login", {
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

      // Store token & user info
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      navigate("/"); // Or redirect to home/cart etc.
    } catch (error) {
      console.error("Login error:", error.message);
      alert(error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div style={{padding:"30px 20px"}} className="w-full max-w-md bg-[#1e1e1e] p-8 rounded-xl shadow-lg text-white">
        <h2 style={{marginBottom:"2vh"}} className="text-3xl font-semibold text-center mb-6">LOGIN</h2>
        <form className="flex flex-col gap-4" onSubmit={onsubmit}>
          <input
            type="email"
            style={{padding:"1vh"}}
            placeholder="Email"
            className="bg-[#2f2f2f] text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 p-2"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            style={{padding:"1vh"}}
            placeholder="Password"
            className="bg-[#2f2f2f] text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 p-2"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            style={{padding:"1vh"}}
            type="submit"
            className="bg-gray-100 hover:bg-gray-300 text-black font-bold py-2 rounded-lg"
          >
            Sign In
          </button>
        </form>
        <p style={{padding:"1vh", paddingBottom:"0vh"}} className="text-center text-gray-400 mt-3">
          Don't have an account?{" "}
          <a href="/signup" className="text-blue-400 hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
}

export default Login;
