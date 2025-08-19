import React, { useState, useEffect } from 'react'

// components
import Navbar from '../components/Navbar'
import DataTable from '../components/DataTable'

// Redux Component
import { useSelector } from "react-redux";

// constatnt
import { StudentTableHeaders, StudentTableRowsKeys } from '../utils/constants'

// Root State Type
import { RootState } from "../store";

// types
import { AssigneBookFields } from '../utils/types';

// moment 
import moment from 'moment';

const Home : React.FC = () => {

  const [assignBookArr, setAssignBookArr] = useState<AssigneBookFields[]>([])
  const [returnedBookArr, setReturnedBookArr] = useState<AssigneBookFields[]>([])


  const { loggedInUser} = useSelector((state: RootState) => state.auth);
  const assignedBooks = useSelector(
    (state: RootState) => state.books.assignedBooks
  );
  const returnedBooks = useSelector(
    (state: RootState) => state.books.returnedBooks
  ); 

  useEffect(() => {
    if(loggedInUser) {
      const userId = loggedInUser && loggedInUser.id
      const modifiedIssuedBook= assignedBooks.filter(item => item.studentId === userId).map(item => {
        return {
          ...item,
          issueDate: moment(item.issueDate).format("DD-MMM-YYYY"),
          returnDate :moment(item.returnDate).format("DD-MMM-YYYY"),
        }
      })
      const modifiedHistoryBook = returnedBooks.filter(item => item.studentId === userId).map(item => {
        return {
          ...item,
          issueDate: moment(item.issueDate).format("DD-MMM-YYYY"),
          returnDate :moment(item.returnDate).format("DD-MMM-YYYY"),
        }
      })
       setAssignBookArr(modifiedIssuedBook)
       setReturnedBookArr(modifiedHistoryBook)
    }
  
    }, [loggedInUser])


  return (
    <>
      <Navbar />

      <div>
         <p className='p-6 text-4xl text-orange-700 font-bold'>Book Issued</p>

         <div className='p-6'>
            <DataTable 
              tableHeaders={StudentTableHeaders}
              tableKeys={StudentTableRowsKeys}
              tableData={assignBookArr}
              erorMsg='No assigned books found in your records.'
              isBookReturned={false}
              isEditable={false}
              isDeleteable={false}
            />
         </div>
      </div>

      <div>
         <p className='p-6 text-4xl text-orange-700 font-bold'>Book History</p>

         <div className='p-6'>
            <DataTable 
              tableHeaders={StudentTableHeaders}
              tableKeys={StudentTableRowsKeys}
              tableData={returnedBookArr}
              erorMsg='No records available in your history.'
              isBookReturned={false}
              isEditable={false}
              isDeleteable={false}
            />
         </div>
      </div>

    </>
  )
}

export default Home