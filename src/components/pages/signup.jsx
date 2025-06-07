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

    const validationErrors = [];
    if (password.length < 6)
      validationErrors.push("Password must be at least 6 characters.");
    if (!/[A-Z]/.test(password))
      validationErrors.push(
        "Password must include at least one capital letter."
      );
    if (!/[!@#$%^&*(),.?\":{}|<>]/.test(password))
      validationErrors.push(
        "Password must include at least one special character."
      );
    if (!/[0-9]/.test(password))
      validationErrors.push("Password must include at least one number.");

    if (validationErrors.length) return setErrors(validationErrors);
    setErrors([]);

    try {
      const result = await createUser(email, password);
      console.log(result);
      await updateProfile(auth.currentUser, { displayName: name, photoURL });
      Swal.fire("Success!", "Account created successfully.", "success");
      navigate("/");
    } catch (error) {
      console.error(error);
      setErrors([error.message]);
    }
  };

  const handleGoogle = async () => {
    try {
      await googleSignIn();
      Swal.fire("Success!", "Logged in with Google.", "success");
      navigate("/");
    } catch (error) {
      console.error(error);
      Swal.fire("Error", error.message, "error");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center px-4 py-8">
      <div className="card bg-base-100 w-full max-w-md shadow-lg p-6">
        <h1 className="text-2xl font-semibold text-center text-[#780116] mb-4">
          Register Your Account
        </h1>
        <form onSubmit={handleSignup} className="space-y-4">
          <label className="label text-[#780116]">Name</label>
          <input
            type="text"
            name="name"
            className="input input-bordered w-full"
            placeholder="Your Name"
            required
          />

          <label className="label text-[#780116]">Photo URL</label>
          <input
            type="text"
            name="Photo"
            className="input input-bordered w-full"
            placeholder="https://..."
            required
          />

          <label className="label text-[#780116]">Email</label>
          <input
            type="email"
            name="email"
            className="input input-bordered w-full"
            placeholder="you@example.com"
            required
          />

          <label className="label text-[#780116]">Password</label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              className="input input-bordered w-full pr-10"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
            <ul className="text-red-500 text-sm list-disc px-4">
              {errors.map((err, i) => (
                <li key={i}>{err}</li>
              ))}
            </ul>
          )}

          <button
            type="submit"
            className="btn w-full bg-[#c32f27] text-[#f7b538]"
          >
            Sign Up
          </button>
          <button
            type="button"
            onClick={handleGoogle}
            className="btn w-full border border-[#c32f27] text-[#780116] flex items-center justify-center"
          >
            <FcGoogle className="mr-2" />
            Sign up with Google
          </button>

          <p className="text-center text-[#780116] text-sm">
            Already have an account?
            <Link to="/login" className="text-[#c32f27] ml-1">
              Login now
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
