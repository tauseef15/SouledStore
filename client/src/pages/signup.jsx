import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";

function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const onsubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:3000/api/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "Signup failed");
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      
      navigate("/"); 

    } catch (error) {
      console.error("Signup error:", error.message);
      alert(error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
            <Helmet>
              <title>Souled Store - Sign Up</title>
            </Helmet>
      <div
        style={{ padding: "30px 20px" }}
        className="w-full max-w-md bg-[#1e1e1e] p-8 rounded-xl shadow-lg text-white"
      >
        <h2
          style={{ marginBottom: "2vh" }}
          className="text-3xl font-semibold text-center mb-6"
        >
          SIGN UP
        </h2>
        <form className="flex flex-col gap-4" onSubmit={onsubmit}>
          <input
            type="text"
            placeholder="Username"
            style={{ padding: "1vh" }}
            className=" bg-[#2f2f2f] text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email"
            style={{ padding: "1vh" }}
            className=" bg-[#2f2f2f] text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            style={{ padding: "1vh" }}
            className="px-4 py-2 bg-[#2f2f2f] text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="submit"
            style={{ padding: "10px" }}
            className="bg-gray-100 hover:bg-gray-300 text-black rounded-lg cursor-pointer font-bold"
          >
            Sign Up
          </button>
        </form>
        <p style={{ marginTop: "10px" }} className="text-center text-gray-400">
          Already have an account?{" "}
          <a href="/login" className="text-blue-400 hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
}

export default Signup;
