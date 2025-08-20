import React from "react";

// redux state management
import { useDispatch, useSelector } from "react-redux";

// Redux Action
import { logout } from "../reduceres/authReducer";
import { clearData } from "../reduceres/bookReducer";

// Root State Type
import { RootState } from "../store";

// Routes
import { ROUTES } from "../utils/constants";

// Navigation
import { useNavigate } from "react-router-dom";

// Helper
import { Logout } from "../utils/helper";

const Navbar: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loggedInUser } = useSelector((state: RootState) => state.auth);

  const avatarIcon = loggedInUser && loggedInUser.fullName ? loggedInUser.fullName.charAt(0).toUpperCase() : '';

  const handleLogout = () => {
    dispatch(logout());
    dispatch(clearData())
    Logout();
    navigate(ROUTES.LOG_IN);
  };

  return (
    <nav className="bg-blue-600 text-white flex items-center justify-between px-6 py-4">
      {/* LMS Logo */}
      <div>
        <span className="font-bold text-2xl">Library Management System</span>
      </div>

      {/* User Info and Logout */}
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 flex items-center justify-center rounded-full bg-green-800 text-white font-bold text-lg border-2 border-rounded">
            {avatarIcon}
          </div>
          <span className="hidden sm:block font-bold">{loggedInUser?.fullName}</span>
        </div>
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded text-sm font-bold"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
