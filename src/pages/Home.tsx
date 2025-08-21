import React, { useState, useEffect, useCallback } from 'react'

// components
import Navbar from '../components/Navbar'
import DataTable from '../components/DataTable'

// Redux Component
import { useSelector } from "react-redux";

// constatnt
import { API_ROUTES, ASSIGNED_BOOK_STATUS, StudentHistoryTableHeaders, StudentHistoryTableRowsKeys, StudentTableHeaders, StudentTableRowsKeys } from '../utils/constants'

// Root State Type
import { RootState } from "../store";

// types
import { AssigneBookFields } from '../utils/types';

// moment 
import moment from 'moment';
import { apiCall } from '../utils/services/request';

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

  const fetchMyAssignedBooks = useCallback(async () => {
    try {
      const response = await apiCall({
        endPoint: API_ROUTES.ASSIGNED_BOOKS.MY_BOOKS,
        method: "GET",
      })

      if (response && response.success && response.data.length > 0) {

        const receivedArray = response.data.map((item: any) => {
          return {
            assignedBookId: item.id,
            bookId: item.bookId,
            studentId: item.studentId,
            bookName: item.bookTitle,
            studentName: item.studentName,
            issueDate: moment(item.issueDate).format("DD-MMM-YYYY"),
            returnDate: item.status === ASSIGNED_BOOK_STATUS.RETURNED ? moment(item.returnedAt).format("DD-MMM-YYYY") : moment(item.returnDate).format("DD-MMM-YYYY"),
            bookStatus: item.status,
          }
        })

        const modifiedIssueBookArray = receivedArray.filter((item: any) =>
          item.bookStatus === ASSIGNED_BOOK_STATUS.ISSUED
        );

        const modifiedReturnedBookArray = receivedArray.filter((item: any) =>
          item.bookStatus === ASSIGNED_BOOK_STATUS.RETURNED
        );

        setAssignBookArr(modifiedIssueBookArray)
        setReturnedBookArr(modifiedReturnedBookArray)

      }

    } catch (error) {
      console.error('Error fetching data', error);
    }

  }, [])

  useEffect(() => {
    fetchMyAssignedBooks()
  }, [fetchMyAssignedBooks])


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
              tableHeaders={StudentHistoryTableHeaders}
              tableKeys={StudentHistoryTableRowsKeys}
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