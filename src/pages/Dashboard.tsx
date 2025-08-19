import React from 'react'

// Components
import AdminLayout from '../components/AdminLayout'

// Redux Component
import { useSelector } from "react-redux";

// Root State Type
import { RootState } from "../store";

// constant
import { ROLES } from '../utils/constants';

const Dashboard : React.FC = () => {

  const users = useSelector((state: RootState) => state.auth.users);
  const books = useSelector((state: RootState) => state.books.books);
  const assignedBooks = useSelector(
    (state: RootState) => state.books.assignedBooks
  );

  const students = users.filter(item => item.role !== ROLES.ADMIN_ROLE)

  return (
    <AdminLayout>
      <div className="p-6 text-4xl text-purple-700 font-bold">
        Welcome To Library Management System
      </div>

      <div className="p-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Total Users Card */}
        <div className="flex items-center p-6 rounded-xl border-2 border-pink-600 shadow-md bg-white-500 text-pink-600">
          <div>
            <h3 className="text-xl font-semibold">Total Students</h3>
            <p className="text-3xl font-bold">{students.length}</p>
          </div>
        </div>

        {/* Total Books Card */}
        <div className="flex items-center p-6 rounded-xl border-2 border-green-600 shadow-md bg-white-500 text-green-600">
          <div className="text-4xl mr-4">
            {/* <FaBook /> */}
          </div>
          <div>
            <h3 className="text-xl font-semibold">Total Books</h3>
            <p className="text-3xl font-bold">{books.length}</p>
          </div>
        </div>

        {/* Assigned Books Card */}
        <div className="flex items-center p-6 rounded-xl border-2 border-gray-600 shadow-md bg-white-500 text-gray-600">
          <div className="text-4xl mr-4">
            {/* <FaClipboardList /> */}
          </div>
          <div>
            <h3 className="text-xl font-semibold">Assigned Books</h3>
            <p className="text-3xl font-bold">{assignedBooks.length}</p>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}

export default Dashboard