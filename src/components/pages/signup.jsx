import React, { useState, useContext } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router";
import { AuthContext } from "../Contexts/AuthContext";
import { auth } from "../../firebase/firebase.init";
import { updateProfile } from "firebase/auth";
import Swal from "sweetalert2";
import AuthTopBar from "./AuthTopBar";

const Signup = () => {
  const { createUser, googleSignIn } = useContext(AuthContext);
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState([]);
  const [password, setPassword] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value.trim();
    const photoURL = form.Photo.value.trim();
    const email = form.email.value.trim();
    const password = form.password.value;

    // Password validation rules
    const validationErrors = [];
    if (password.length < 6)
      validationErrors.push("Password must be at least 6 characters.");
    if (!/[A-Z]/.test(password))
      validationErrors.push(
        "Password must include at least one uppercase letter.",
      );
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password))
      validationErrors.push(
        "Password must include at least one special character.",
      );
    if (!/[0-9]/.test(password))
      validationErrors.push("Password must include at least one number.");

    if (validationErrors.length) {
      setErrors(validationErrors);
      return;
    }
    setErrors([]);

    try {
      const result = await createUser(email, password);
      await updateProfile(auth.currentUser, { displayName: name, photoURL });
      Swal.fire("Success!", "Your account has been created.", "success");
      navigate("/");
    } catch (error) {
      console.error(error);
      setErrors([error.message || "An unexpected error occurred."]);
    }
  };

  const handleGoogle = async () => {
    try {
      await googleSignIn();
      Swal.fire("Success!", "You have logged in with Google.", "success");
      navigate("/");
    } catch (error) {
      console.error(error);
      Swal.fire("Error", error.message || "Google sign-in failed.", "error");
    }
  };
  const inputClass =
    "w-full px-5 py-3 rounded-lg border border-gray-400 text-[#e3637a] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#c32f27] focus:border-[#e3637a] transition";
  const labelClass = "block font-semibold mb-2 text-[#e3637a]";
  return (
    <div className="min-h-screen font-heading flex justify-center items-center bg-white dark:bg-gray-900 px-4 pb-8 pt-24 transition-colors duration-300">
      <AuthTopBar />

      <div className="w-full max-w-md p-8 sm:p-10 rounded-3xl shadow-2xl backdrop-blur-lg bg-white/80 dark:bg-gray-800/80 border border-gray-500">
        <h1 className="text-3xl font-extrabold mb-8 text-center text-[#e3637a] tracking-tight">
          Create Your Account
        </h1>

        <form
          onSubmit={handleSignup}
          className="flex flex-col gap-5"
          noValidate
        >
          {/* Name */}
          <div>
            <label htmlFor="name" className={labelClass}>
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className={inputClass}
              placeholder="Your full name"
              required
            />
          </div>

          {/* Photo */}
          <div>
            <label htmlFor="Photo" className={labelClass}>
              Photo URL
            </label>
            <input
              type="url"
              id="Photo"
              name="Photo"
              className={inputClass}
              placeholder="https://example.com/photo.jpg"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className={labelClass}>
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className={inputClass}
              placeholder="you@example.com"
              required
              autoComplete="email"
            />
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className={labelClass}>
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                className={`${inputClass} pr-12`}
                placeholder="Create a strong password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="new-password"
              />
              <span
                className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-[#c32f27]"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                role="button"
                tabIndex={0}
                onKeyDown={(e) =>
                  e.key === "Enter" && setShowPassword(!showPassword)
                }
              >
                {showPassword ? <FaEye /> : <FaEyeSlash />}
              </span>
            </div>
          </div>

          {/* Errors */}
          {errors.length > 0 && (
            <ul className="text-red-600 dark:text-red-400 text-sm list-disc list-inside">
              {errors.map((err, idx) => (
                <li key={idx}>{err}</li>
              ))}
            </ul>
          )}

          {/* Buttons grouped together */}
          <div className="flex flex-col gap-3 pt-2">
            <button
              type="submit"
              className="w-full bg-[#e3637a] text-white py-3 rounded-lg font-bold shadow-md hover:shadow-lg transition"
            >
              Sign Up
            </button>

            <button
              type="button"
              onClick={handleGoogle}
              className="w-full border border-[#e3637a] text-[#e3637a] bg-white flex items-center justify-center py-3 rounded-lg font-bold shadow-sm hover:shadow-md transition"
            >
              <FcGoogle size="1.5em" className="mr-2" />
              Sign up with Google
            </button>
          </div>

          {/* Login link */}
          <p className="text-[#e3637a] font-semibold text-sm text-center">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-[#c32f27] underline hover:text-[#a0211b] transition"
            >
              Login now
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
