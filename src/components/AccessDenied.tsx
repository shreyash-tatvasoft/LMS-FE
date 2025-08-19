import React from 'react';

// Navigation
import { Link } from 'react-router-dom';

// routes constant
import { ROUTES } from '../utils/constants';

const AccessDenied: React.FC = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="text-center bg-white p-8 rounded-lg shadow-lg w-96">
        <h1 className="text-3xl font-bold text-red-500 mb-4">Access Denied</h1>
        <p className="text-lg text-gray-700 mb-6">You do not have permission to view this page.</p>
        <p className="text-md text-gray-600">
           go back to{' '}
          <Link to={ROUTES.LOG_IN} className="text-blue-500 hover:underline font-semibold">
             Home
          </Link>.
        </p>
      </div>
    </div>
  );
};

export default AccessDenied;
