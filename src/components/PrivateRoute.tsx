import React from 'react';

// Navigation
import { Navigate, Outlet } from 'react-router-dom';

// Routes Constants
import { ROUTES } from '../utils/constants';

// types
import { PrivateRouteProps } from '../utils/types';

// Root State Type
import { RootState } from "../store";

// redux state management
import { useSelector } from "react-redux";

const PrivateRoute: React.FC<PrivateRouteProps> = ({ requiredRole }) => {
    const { loggedInUser } = useSelector((state: RootState) => state.auth);
    const userRole = loggedInUser ? loggedInUser.role : ""

  if (!loggedInUser) {
    return <Navigate to={ROUTES.LOG_IN} />;
  }

  if (userRole !== requiredRole) {
    return <Navigate to={ROUTES.ACCESS_DENIED} />; 
  }

  return <Outlet />;
};

export default PrivateRoute;
