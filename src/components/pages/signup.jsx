import React, { useState, useContext } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router";
import { AuthContext } from "../Contexts/AuthContext";
import { auth } from "../../firebase/firebase.init";
import { updateProfile } from "firebase/auth";
import Swal from "sweetalert2";

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
        "Password must include at least one uppercase letter."
      );
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password))
      validationErrors.push(
        "Password must include at least one special character."
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

  return (
    <div className="min-h-screen flex justify-center items-center px-4 py-8 bg-white md:bg-transparent">
      <div className="card w-full max-w-md p-6 shadow-lg rounded-2xl bg-base-100 border border-[#f0c987]">
        <h1 className="text-2xl font-semibold text-center text-[#780116] mb-6">
          Create Your Account
        </h1>

        <form onSubmit={handleSignup} className="space-y-5" noValidate>
          <label htmlFor="name" className="label text-[#780116] font-semibold">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className="input input-bordered w-full"
            placeholder="Your full name"
            required
          />

          <label htmlFor="Photo" className="label text-[#780116] font-semibold">
            Photo URL
          </label>
          <input
            type="url"
            id="Photo"
            name="Photo"
            className="input input-bordered w-full"
            placeholder="https://example.com/photo.jpg"
            required
          />

          <label htmlFor="email" className="label text-[#780116] font-semibold">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="input input-bordered w-full"
            placeholder="you@example.com"
            required
          />

          <label
            htmlFor="password"
            className="label text-[#780116] font-semibold"
          >
            Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              className="input input-bordered w-full pr-10"
              placeholder="Create a strong password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="new-password"
            />
            <span
              className="absolute right-3 top-3 cursor-pointer text-[#c32f27]"
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

          {errors.length > 0 && (
            <ul className="text-red-600 text-sm list-disc list-inside">
              {errors.map((err, idx) => (
                <li key={idx}>{err}</li>
              ))}
            </ul>
          )}

          <button
            type="submit"
            className="btn w-full bg-[#c32f27] text-[#f7b538] font-semibold"
          >
            Sign Up
          </button>

          <button
            type="button"
            onClick={handleGoogle}
            className="btn w-full border border-[#c32f27] text-[#780116] flex items-center justify-center gap-2"
          >
            <FcGoogle size={20} />
            Sign up with Google
          </button>

          <p className="text-center text-[#780116] text-sm">
            Already have an account?
            <Link to="/login" className="text-[#c32f27] ml-1 hover:underline">
              Login now
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
