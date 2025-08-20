import React, { useState } from "react";

// Logo
import logoIcon from "../assets/largeImage.jpg";
import eyeIcon from "../assets/eye.svg";
import eyeSlash from "../assets/eyeSlash.svg";

// Routes
import { ROUTES, API_ROUTES } from "../utils/constants";

// use for Navigation
import { Link, useNavigate } from "react-router-dom";

// types
import { RegistrationFields } from "../utils/types";

// toast msg
import { toast } from "react-toastify";

// redux state management
import { useSelector } from "react-redux";

// Root State Type
import { RootState } from "../store";

// API Call
import { apiCall } from "../utils/services/request";

const Register: React.FC = () => {
  const navigate = useNavigate();
  const { users } = useSelector((state : RootState) => state.auth);

  const [showPasswordField, setShowPasswordField] = useState<boolean>(false);
  const [showConfirmPasswordField, setShowConfirmPasswordField] =
    useState<boolean>(false);

  const togglePassword = () => setShowPasswordField(!showPasswordField);

  const toggleConfirmPassword = () =>
    setShowConfirmPasswordField(!showConfirmPasswordField);

  const handleAllValidation = (values: RegistrationFields): boolean => {
    const { fullName, email, password, confirmPassword, dob, role } = values;

    if (fullName.trim() === "") {
      toast.error("Please enter a valid name");
      return false;
    }
    if (email.trim() === "" || !/\S+@\S+\.\S+/.test(email)) {
      toast.error("Please enter a valid email");
      return false;
    }
    if (password.trim() === "") {
      toast.error("Please enter a valid password");
      return false;
    }
    if (confirmPassword.trim() === "") {
      toast.error("Please confirm your password");
      return false;
    }
    if (password.trim() !== confirmPassword.trim()) {
      toast.error("Password and confirm password must match");
      return false;
    }
    if (dob.trim() === "") {
      toast.error("Please enter a valid date of birth");
      return false;
    }
    if (role.trim() === "") {
      toast.error("Please select a role");
      return false;
    }

    const isEmailExists = users.find(
      (item) => item.email === email
    );
    if (isEmailExists) {
      toast.error("Email Already Present");
      return false;
    }
  
    // Reset error message if everything is valid
    return true;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    const formData = {
      fullName: data.get("fullName") as string,
      email: data.get("email") as string,
      password: data.get("password") as string,
      confirmPassword: data.get("confirmPassword") as string,
      dob: data.get("dob") as string,
      role: data.get("role") as string,
    };

    const isValid = handleAllValidation(formData);
    if (!isValid) return false;

    const response = await apiCall({
      endPoint: API_ROUTES.AUTH.REGISTER,
      method: "POST",
      body: formData,
    });

    if (response.success) {
      toast.success("User registered successfully!");
      navigate(ROUTES.LOG_IN);
    }

  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="flex flex-col lg:flex-row w-4/5 max-w-4xl bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Left Side - Logo */}
        <div className="flex flex-col items-center justify-center w-full lg:w-1/2">
          <img
            src={logoIcon}
            alt="Logo"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Right Side - Register Form */}
        <div className="flex flex-col items-center justify-center w-full lg:w-1/2 p-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            Create an Account
          </h2>
          <form
            className="w-full max-w-sm"
            id="register-form"
            onSubmit={handleSubmit}
          >
            {/* Full Name Field */}
            <div className="mb-4">
              <label
                htmlFor="fullName"
                className="block text-gray-700 font-medium mb-2"
              >
                Full Name
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Enter your full name"
              />
            </div>

            {/* Email Field */}
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-gray-700 font-medium mb-2"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Enter your email"
              />
            </div>

            {/* Password Field */}
            <div className="mb-4 relative">
              <label
                htmlFor="password"
                className="block text-gray-700 font-medium mb-2"
              >
                Password
              </label>
              <input
                type={showPasswordField ? "text" : "password"}
                id="password"
                name="password"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Enter your password"
              />
              <span
                onClick={togglePassword}
                className="absolute right-3 top-11 cursor-pointer text-gray-500"
              >
                {showPasswordField ? (
                  <img className="h-5 w-5" src={eyeIcon} />
                ) : (
                  <img className="h-5 w-5" src={eyeSlash} />
                )}
              </span>
            </div>

            {/* Confirm Password Field */}
            <div className="mb-4 relative">
              <label
                htmlFor="confirmPassword"
                className="block text-gray-700 font-medium mb-2"
              >
                Confirm Password
              </label>
              <input
                type={showConfirmPasswordField ? "text" : "password"}
                id="confirmPassword"
                name={"confirmPassword"}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Confirm your password"
              />
              <span
                onClick={toggleConfirmPassword}
                className="absolute right-3 top-11 cursor-pointer text-gray-500"
              >
                {showConfirmPasswordField ? (
                  <img className="h-5 w-5" src={eyeIcon} />
                ) : (
                  <img className="h-5 w-5" src={eyeSlash} />
                )}
              </span>
            </div>

            {/* Date of Birth Field */}
            <div className="mb-4">
              <label
                htmlFor="dob"
                className="block text-gray-700 font-medium mb-2"
              >
                Date of Birth
              </label>
              <input
                type="date"
                id="dob"
                name="dob"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            {/* Role Dropdown */}
            <div className="mb-6">
              <label
                htmlFor="role"
                className="block text-gray-700 font-medium mb-2"
              >
                Role
              </label>
              <select
                id="role"
                name="role"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                <option value="ADMIN">Admin</option>
                <option value="STUDENT">Student</option>
              </select>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition"
            >
              Sign Up
            </button>
          </form>

          {/* Login Link */}
          <p className="mt-6 text-gray-600">
            Already have an account?{" "}
            <Link
              to={ROUTES.LOG_IN}
              className="text-blue-500 hover:underline font-medium"
            >
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
