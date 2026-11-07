import React, { useState, useContext } from "react";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router";
import Swal from "sweetalert2";
import { AuthContext } from "../Contexts/AuthContext";
import { motion } from "framer-motion";
import AuthTopBar from "./AuthTopBar";

const Login = () => {
  const { LoginUser, googleSignIn } = useContext(AuthContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    LoginUser(email, password)
      .then(() => {
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
      .then(() => navigate("/"))
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Google Sign-In Failed",
          text: error.message || "Please try again",
          confirmButtonText: "OK",
        });
      });
  };

  return (
    <div className="min-h-screen font-heading grid md:grid-cols-2">
      <AuthTopBar />
      {/* Left Section - Branding */}
      <div className="hidden md:flex flex-col justify-center items-center p-10 text-center relative overflow-hidden min-h-screen">
        {/* Blurred Background Layer */}
        <div
          className="absolute inset-0 bg-cover bg-center filter blur-xs opacity-80 z-10"
          style={{
            backgroundImage:
              "url('https://i.ibb.co/FkdMGG1P/best-travel-background.jpg')",
          }}
        ></div>

        {/* Content */}
        <div className="relative z-30 bg-[rgb(255,245,225,0.15)] backdrop-blur-lg p-10 rounded-3xl shadow-2xl max-w-xl w-full ">
          <motion.h1
            className="relative text-5xl font-extrabold text-[#6e0f23] mb-4 tracking-tight"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Your Stories, Your Voice
          </motion.h1>
          <motion.p
            className="relative z-30 text-lg text-[#6e0f23]/95 max-w-sm mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            Join our blogging community and share your thoughts with the world.
          </motion.p>
        </div>
      </div>

      {/* Right Section - Login Form */}
      <div className="flex items-center justify-center bg-white dark:bg-gray-900 md:bg-transparent  px-6 pb-8 pt-24 min-h-screen">
        <motion.div
          className="w-full max-w-md p-10 rounded-3xl shadow-2xl backdrop-blur-lg bg-white/80 border  dark:bg-gray-800/80 border-gray-500 transition-transform duration-300 ease-in-out hover:scale-[1.03]"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl font-extrabold mb-8 text-center text-[#e3637a] tracking-tight">
            Welcome Back
          </h2>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-5 "
            noValidate
          >
            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block font-semibold mb-2 text-[#e3637a]"
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
                className="w-full px-5 py-3 rounded-lg border border-gray-400 text-[#e3637a] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#c32f27] focus:border-[#e3637a] transition"
              />
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block font-semibold mb-2 text-[#e3637a]"
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
                className="w-full px-5 py-3 rounded-lg border border-gray-400 text-[#e3637a] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#c32f27] focus:border-[#e3637a] transition"
              />
            </div>

            {/* Login Button */}
            {/* Buttons grouped together */}
            <div className="flex flex-col gap-3 pt-2">
              <button
                type="submit"
                className="w-full bg-[#e3637a] text-white py-3 rounded-lg font-bold shadow-md hover:shadow-lg transition"
              >
                Log In
              </button>

              <button
                type="button"
                onClick={handleGoogleSignIn}
                className="w-full border border-[#e3637a] text-[#e3637a] bg-white flex items-center justify-center py-3 rounded-lg font-bold shadow-sm hover:shadow-md transition"
              >
                <FcGoogle size="1.5em" className="mr-2" />
                Sign in with Google
              </button>
            </div>

            {/* Signup link */}
            <p className="text-[#e3637a] font-semibold text-sm text-center">
              Don&apos;t have an account?{" "}
              <Link
                to="/signup"
                className="text-[#c32f27] underline hover:text-[#a0211b] transition"
              >
                Sign Up now
              </Link>
            </p>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
