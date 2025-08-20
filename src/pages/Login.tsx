import React, { useState, useEffect } from "react";

// Logo
import logoIcon from "../assets/objects.jpg";
import eyeIcon from "../assets/eye.svg";
import eyeSlash from "../assets/eyeSlash.svg";

// Routes
import { ROLES, ROUTES, API_ROUTES } from "../utils/constants";

// Navigation
import { Link, useNavigate } from "react-router-dom";

// types
import { LogInFields } from "../utils/types";

// toast msg
import { toast } from "react-toastify";

// redux state management
import { useDispatch, useSelector } from "react-redux";

// Redux Action
import { logInUser } from "../reduceres/authReducer";

// Root State Type
import { RootState } from "../store";

// API Call
import { apiCall } from "../utils/services/request";

// Helper
import { setAuthToken } from "../utils/helper";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loggedInUser } = useSelector((state : RootState) => state.auth)

  const [showPassword, setShowPassword] = useState<boolean>(false);

  const togglePassword = () => setShowPassword(!showPassword);

  const handleAllValidation = (values: LogInFields): boolean => {
    const { email, password } = values;

    if (email.trim() === "" || !/\S+@\S+\.\S+/.test(email)) {
      toast.error("Please enter a valid email");
      return false;
    }
    if (password.trim() === "") {
      toast.error("Please enter a valid password");
      return false;
    }

    return true

  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    const formData = {
      email: data.get("email") as string,
      password: data.get("password") as string,
    };

    const isValid = handleAllValidation(formData);
    if (!isValid) return false;

    const response = await apiCall({
      endPoint: API_ROUTES.AUTH.LOGIN,
      method: "POST",
      body: formData,
    });

    console.log("first", response)

    if (response && response.success) {
      const userData = response?.user
      setAuthToken(response.token)
      dispatch(logInUser(userData))
      toast.success("Logged In Successfully")
    }

  };

  useEffect(() => {
    if(loggedInUser) {
      const userRole = loggedInUser.role
      userRole === ROLES.ADMIN_ROLE ? navigate(ROUTES.DASHBOARD) : navigate(ROUTES.HOME) 
    }
  }, [navigate,loggedInUser])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="flex flex-col lg:flex-row w-4/5 max-w-4xl bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Left Side - Logo */}
        <div className="flex flex-col items-center justify-center w-full lg:w-1/2">
          <img
            src={logoIcon}
            alt="Logo"
            className="w-full h-full object-contain"
          />
        </div>

        {/* Right Side - Login Form */}
        <div className="flex flex-col items-center justify-center w-full lg:w-1/2 p-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            Welcome Back!
          </h2>
          <form
            className="w-full max-w-sm"
            id="login-form"
            onSubmit={handleSubmit}
          >
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

            <div className="mb-6 relative">
              <label
                htmlFor="password"
                className="block text-gray-700 font-medium mb-2"
              >
                Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Enter your password"
              />
              <span
                onClick={togglePassword}
                className="absolute right-3 top-11 cursor-pointer text-gray-500"
              >
                {showPassword ? (
                  <img className="h-5 w-5" src={eyeIcon} />
                ) : (
                  <img className="h-5 w-5" src={eyeSlash} />
                )}
              </span>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition"
            >
              Log In
            </button>
          </form>

          <p className="mt-6 text-gray-600">
            Don't have an account?{" "}
            <Link
              to={ROUTES.REGISTER}
              className="text-blue-500 hover:underline font-medium"
            >
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
