import React, { useState, useContext } from "react";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router"; // Assuming react-router v6
import Swal from "sweetalert2";
import { AuthContext } from "../Contexts/AuthContext";

const Login = () => {
  const { LoginUser, googleSignIn } = useContext(AuthContext);
  const navigate = useNavigate();

  // ✅ track form inputs
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ email, password });

    LoginUser(email, password)
      .then((result) => {
        console.log(result);
        Swal.fire({
          icon: "success",
          title: "Login Successful!",
          text: "Welcome back!",
          timer: 2000,
          showConfirmButton: false,
        });
        navigate("/");
      })
      .catch((error) => {
        console.error(error);
        Swal.fire({
          icon: "error",
          title: "Login Failed",
          text: error.message || "Something went wrong",
          confirmButtonText: "OK",
        });
      });
  };

  const handleGoogleSignIn = () => {
    googleSignIn()
      .then((result) => {
        console.log(result.user);
        navigate("/");
      })
      .catch((error) => {
        console.error(error);
        Swal.fire({
          icon: "error",
          title: "Google Sign-In Failed",
          text: error.message || "Please try again",
          confirmButtonText: "OK",
        });
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold mb-6 text-center text-[#780116]">
          Welcome Back
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email Input */}
          <div>
            <label
              htmlFor="email"
              className="block font-semibold mb-2 text-[#780116]"
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
              className="w-full px-4 py-2 rounded-md border border-[#db7c26] text-[#780116] focus:outline-none"
            />
          </div>

          {/* Password Input */}
          <div>
            <label
              htmlFor="password"
              className="block font-semibold mb-2 text-[#780116]"
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
              className="w-full px-4 py-2 rounded-md border border-[#db7c26] text-[#780116] focus:outline-none"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="btn w-full bg-[#c32f27] text-[#f7b538] py-2 rounded-md font-bold"
          >
            Log In
          </button>

          {/* Google Sign-In */}
          <button
            type="button"
            onClick={handleGoogleSignIn}
            className="btn w-full mt-2 border border-[#c32f27] text-[#780116] bg-white flex items-center justify-center py-2 rounded-md font-bold"
          >
            <FcGoogle size="1.5em" className="mr-2" />
            Sign in with Google
          </button>

          {/* Signup Link */}
          <p className="text-[#780116] font-semibold text-sm text-center mt-4">
            Don't have an account?&nbsp;
            <Link to="/signup" className="text-[#c32f27] underline">
              Sign Up now
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
