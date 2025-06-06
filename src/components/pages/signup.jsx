import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState([]);
  const [password, setPassword] = useState("");

  const handleSignup = (e) => {
    e.preventDefault();

    const validationErrors = [];

    if (password.length < 6) {
      validationErrors.push("Password must be at least 6 characters.");
    }
    if (!/[A-Z]/.test(password)) {
      validationErrors.push(
        "Password must include at least one capital letter."
      );
    }
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      validationErrors.push(
        "Password must include at least one special character."
      );
    }
    if (!/[0-9]/.test(password)) {
      validationErrors.push("Password must include at least one number.");
    }

    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors([]);
    console.log({ email, password });
    // Add actual signup logic here
  };

  return (
    <div className="flex justify-center items-center min-h-screen max-w-7xl mx-auto my-8 px-4">
      <div className="card bg-base-100 w-full max-w-md shadow-2xl py-4">
        <h1 className="font-semibold text-center text-2xl text-[#780116] mb-2">
          Register Your Account
        </h1>
        <form onSubmit={handleSignup} className="card-body space-y-2">
          <label className="label text-[#780116]">Name</label>
          <input
            type="text"
            name="name"
            className="input input-bordered"
            placeholder="Your Name"
            required
          />

          <label className="label text-[#780116]">Photo URL</label>
          <input
            type="text"
            name="Photo"
            className="input input-bordered"
            placeholder="URL"
            required
          />

          <label className="label text-[#780116]">Email</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input input-bordered"
            placeholder="Email"
            required
          />

          <label className="label text-[#780116]">Password</label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input input-bordered w-full pr-10"
              placeholder="Password"
              required
            />
            <span
              className="absolute right-3 top-3 cursor-pointer text-[#c32f27]"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEye /> : <FaEyeSlash />}
            </span>
          </div>

          {errors.length > 0 && (
            <ul className="text-red-500 text-sm mt-1 list-disc ml-4">
              {errors.map((err, idx) => (
                <li key={idx}>{err}</li>
              ))}
            </ul>
          )}

          <button
            type="submit"
            className="btn mt-4 bg-[#c32f27] text-[#f7b538] hover:bg-[#d8572a] border-none"
          >
            Sign Up
          </button>
          <button class="btn bg-none  w-full  text-[#780116] py-2 rounded-md font-bold border-1 border-[#c32f27]">
            <icon className="text-xl">
              <FcGoogle />
            </icon>
            Sign up with Google
          </button>
          <p className="text-[#780116] font-semibold text-sm">
            Already have an account?
            <span className="text-[#c32f27] mx-1">
              <Link to="/login">Login now</Link>
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
