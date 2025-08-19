import React from 'react'

// Components
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'

// types 
import { AdminLayoutProps } from '../utils/types'

const AdminLayout : React.FC<AdminLayoutProps> = ({ children}) => {
  return (
    <>
    <Navbar />

    <div className="grid grid-cols-12 h-screen">
      {/* Sidebar */}
      <div className="col-span-2">
        <Sidebar />
      </div>

      {/* Main Content Area */}
      <div className="col-span-10 flex flex-col">
       
        {/* Main Content */}
        <main className="flex-1 p-8 bg-gray-100">
           {children}
        </main>
      </div>
    </div>
  </>
  )
}

export default AdminLayout