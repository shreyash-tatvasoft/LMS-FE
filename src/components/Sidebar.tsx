import React from 'react'

// Navigation
import { NavLink } from 'react-router-dom'

// Routes Constant
import { ROUTES } from '../utils/constants'

const Sidebar : React.FC = () => {
  return (
    <div className="bg-gray-900 text-white h-screen flex flex-col">

      {/* Navigation Links */}
      <nav className="flex-1 p-4">
        <ul className="space-y-4">
          <li>
            <NavLink
              to={ROUTES.DASHBOARD}
              className={({ isActive }) =>
                `flex items-center gap-2 p-2 rounded ${
                  isActive ? "bg-blue-600" : "hover:bg-gray-700"
                }`
              }
            >
             <span className='font-semibold'>Dashboard</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to={ROUTES.BOOKS}
              className={({ isActive }) =>
                `flex items-center gap-2 p-2 rounded ${
                  isActive ? "bg-blue-600" : "hover:bg-gray-700"
                }`
              }
            >
             <span className='font-semibold'>Books</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to={ROUTES.ASSIGNED_BOOKS}
              className={({ isActive }) =>
                `flex items-center gap-2 p-2 rounded ${
                  isActive ? "bg-blue-600" : "hover:bg-gray-700"
                }`
              }
            >
              <span className='font-semibold'>Assigned Books</span>
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar