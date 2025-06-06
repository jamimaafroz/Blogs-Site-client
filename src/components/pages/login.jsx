import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ email, password });
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md p-8 rounded-lg shadow-lg">
        <h2
          className="text-3xl font-bold mb-6 text-center"
          style={{ color: "#780116" }} // Dark red heading text
        >
          Welcome Back
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block font-semibold mb-2"
              style={{ color: "#780116" }}
            >
              Email address
            </label>
            <input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
              className="w-full px-4 py-2 rounded-md text-[#780116] border-1 border-[#db7c26] focus:outline-none"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-[#780116] font-semibold mb-2"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
              className="w-full px-4 py-2 rounded-md text-[#780116] border-1 border-[#db7c26] focus:outline-none"
            />
          </div>

          <button
            type="submit"
            className="btn w-full bg-[#c32f27] text-[#f7b538] py-2 rounded-md font-bold"
          >
            Log In
          </button>
          <button class="btn bg-none w-full  text-[#780116] py-2 rounded-md font-bold border-1 border-[#c32f27]">
            <icon className="text-xl">
              <FcGoogle />
            </icon>
            Login with Google
          </button>
          <p className="text-[#780116] font-semibold text-sm">
            Don't have an account?
            <span className="text-[#c32f27] mx-1">
              <Link to="/signup">Sign Up now</Link>
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
