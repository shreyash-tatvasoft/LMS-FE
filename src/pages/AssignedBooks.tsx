import React, { useCallback, useEffect, useState} from "react";

// Redux Component
import { useSelector, useDispatch } from "react-redux";

// Components
import AdminLayout from "../components/AdminLayout";
import DataTable from "../components/DataTable";

// Constatnts
import { API_ROUTES, AssignedBookTableHeaders, AssignedBookTableRowsKeys, ROLES } from "../utils/constants";

// Root State Type
import { RootState } from "../store";

// types
import { StudentData, BookData, AssigneBookFields } from "../utils/types";

// Redux Actions
import { allAssignedBooksData } from "../reduceres/bookReducer";
import { listStudents } from "../reduceres/authReducer";

// toast 
import { toast } from "react-toastify";

// moment
import moment from "moment";

// API Call
import { apiCall } from "../utils/services/request";

const AssignedBooks: React.FC = () => {
  const dispatch = useDispatch()

  const initialFormState = {
    student: "",
    book: "",
    issueDate: "",
    returnDate: "",
  }

  const inittialErrorState = {
    student: false,
    book: false,
    issueDate: false,
    returnDate: false,
    validDate : false
  }

  const [modal , setModal] = useState(false)

  const [formData, setFormData] = useState(initialFormState);

  const [formDataError, setFormDataError] = useState<{[key : string] : boolean}>(inittialErrorState)

  const [studentArr, setStudentArr] = useState<StudentData[]>([])
  const [bookArr, setBookArr] = useState<BookData[]>([])


  const users = useSelector((state: RootState) => state.auth.users)
  const books = useSelector((state: RootState) => state.books.books)
  const assignedBooks = useSelector((state: RootState) => state.books.assignedBooks)


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    if(value.trim() === "") {
      setFormDataError({...formDataError, [name] : true})
    } else {
      setFormDataError({...formDataError, [name] : false})

    }
    setFormData({ ...formData, [name]: value });
  };

  const handleAllValidation = () => {
    let errorFields = {
      student: false,
      book: false,
      issueDate: false,
      returnDate: false,
      validDate : false
    };

    if (formData.student.trim() === "") {
      errorFields.student = true;
    }
    if (formData.book.trim() === "") {
      errorFields.book = true;
    }
    if (formData.issueDate.trim() === "") {
      errorFields.issueDate = true;
    }
    if (formData.returnDate.trim() === "") {
      errorFields.returnDate = true;
    }
    if(moment(formData.returnDate).isSameOrBefore(moment(formData.issueDate))) {
      errorFields.validDate = true
    } 

    setFormDataError(errorFields);

    return Object.values(errorFields).every((value) => value === false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if(!handleAllValidation()) {
      return false
    }

    const bookId = parseInt(formData.book)
    const studentId = parseInt(formData.student)
  
    const httpBody = {
      "studentId": studentId,
      "bookId": bookId,
      "issueDate": moment(formData.issueDate).format("YYYY-MM-DD"),
      "returnDate":moment(formData.returnDate).format("YYYY-MM-DD")
    }


      const response = await apiCall({
        method: "POST",
        endPoint: API_ROUTES.ASSIGNED_BOOKS.ASSIGNED_BOOK,
        body: httpBody,
      })

      if (response && response.success) {
        await fetchAssignedBooks()
        closeModal()
        toast.success("Book Assigned Successfully")
      }
  };

  const handleReturnBook = async (value : AssigneBookFields) => {

    const response = await apiCall({
        method: "DELETE",
        endPoint: `${API_ROUTES.ASSIGNED_BOOKS.RETURN_BOOK}/${value.assignedBookId}`,
      })

      if (response && response.success) {
        await fetchAssignedBooks()
        toast.success("Book Updated Successfully")
      }
  }

  const openModal = () => setModal(true)
  const closeModal = () => {
    setFormData(initialFormState)
    setFormDataError(inittialErrorState)
    setModal(false)
  }

  useEffect(() => {
    const modifiedStudents = users.filter(item => item.role !== ROLES.ADMIN_ROLE).map(val => {
      return {
         id : val.id ? val.id : 0,
         name :val.fullName
      }
    })

    const modifiedBooks = books.filter(item => item.quantity !== 0).map(val => {
      return {
         id : val.bookId ? val.bookId : 0,
         name :val.title
      }
    })

    setBookArr(modifiedBooks)
    setStudentArr(modifiedStudents)

  }, [])

  const fetchStudents = useCallback(async () => {
    try {
      const response = await apiCall({
        endPoint: API_ROUTES.ASSIGNED_BOOKS.GET_ALL_STUDENTS,
        method: "GET",
      })

      if (response && response.success && response.data.length > 0) {
       
        const receivedArray = response.data.map((item: any) => {
          return {
            id: item.id,
            name: item.fullName
          }
        })

        setStudentArr(receivedArray)
        dispatch(listStudents(receivedArray))
      }

    } catch (error) {
      console.error('Error fetching data', error);
    }

  }, [])

  const fetchAssignedBooks = useCallback(async () => {
    try {
      const response = await apiCall({
        endPoint: API_ROUTES.ASSIGNED_BOOKS.LIST_ASSIGNED_BOOKS,
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
            returnDate: moment(item.returnDate).format("DD-MMM-YYYY"),
            bookStatus: item.status,
          }
        })

        dispatch(allAssignedBooksData(receivedArray))
      }

    } catch (error) {
      console.error('Error fetching data', error);
    }

  }, [])

  useEffect(() => {
    fetchStudents()
  }, [fetchStudents])

  useEffect(() => {
    fetchAssignedBooks()
  }, [fetchAssignedBooks])

  const renderErrorDiv = (errMsg: string) => {
    return <div className="text-orange-700 my-1 font-semibold">{errMsg}</div>;
  };

  return (
    <AdminLayout>
      <div className="p-6 text-4xl text-purple-700 font-bold">
        Assigned Books
      </div>

      <div className="p-6 bg-gray-100">
        <div className="flex justify-end items-center mb-4">
          {/* Add Button */}
          <button
            className="bg-blue-500 text-white font-bold px-4 py-2 rounded hover:bg-blue-600"
            onClick={openModal}
          >
            Assign Book
          </button>
        </div>

        <DataTable
          tableHeaders={AssignedBookTableHeaders}
          tableData={assignedBooks}
          tableKeys={AssignedBookTableRowsKeys}
          isEditable={false}
          isDeleteable={false}
          isBookReturned={true}
          erorMsg="No Assigned Book Available"
          onReturnBook={handleReturnBook}
        />
      </div>

      {/* Assigned Book Form */}

      {modal && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={closeModal}
        >
          <div
            className="bg-white rounded-lg p-6 w-2/5"
            onClick={(e) => e.stopPropagation()} // Prevent closing modal when clicking inside
          >
            <h2 className="text-xl font-bold mb-4">Assign Book</h2>

            <form onSubmit={handleSubmit}>
              {/* Student Dropdown */}
              <div className="mb-4">
                <label
                  htmlFor="student"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Select Student
                </label>
                <select
                  id="student"
                  name="student"
                  value={formData.student}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:ring focus:ring-blue-300"
                >
                  <option value="" disabled>
                    -- Select Student --
                  </option>
                  {studentArr.map((student, index) => (
                    <option key={index} value={student.id}>
                      {student.name}
                    </option>
                  ))}
                </select>
                {formDataError.student && renderErrorDiv("Please select student")}
              </div>

              {/* Book Dropdown */}
              <div className="mb-4">
                <label
                  htmlFor="book"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Select Book
                </label>
                <select
                  id="book"
                  name="book"
                  value={formData.book}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:ring focus:ring-blue-300"
                >
                  <option value="" disabled>
                    -- Select Book --
                  </option>
                  {bookArr.map((book, index) => (
                    <option key={index} value={book.id}>
                      {book.name}
                    </option>
                  ))}
                </select>
                {formDataError.book && renderErrorDiv("Please select book")}
              </div>

              {/* Issue Date */}
              <div className="mb-4">
                <label
                  htmlFor="issueDate"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Issue Date
                </label>
                <input
                  type="date"
                  id="issueDate"
                  name="issueDate"
                  value={formData.issueDate}
                  max={moment().format("YYYY-MM-DD")}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:ring focus:ring-blue-300"
                />
                {formDataError.issueDate && renderErrorDiv("Please select issue date")}
              </div>

              {/* Return Date */}
              <div className="mb-4">
                <label
                  htmlFor="returnDate"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Return Date
                </label>
                <input
                  type="date"
                  id="returnDate"
                  name="returnDate"
                  value={formData.returnDate}
                  min={moment(formData.issueDate).format("YYYY-MM-DD")}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:ring focus:ring-blue-300"
                />
                {formDataError.returnDate && renderErrorDiv("Please select return date")}
              </div>

              {formDataError.validDate && renderErrorDiv("Return Date must be greater than Issue Date.")}

              {/* Submit Button */}
              <div className="text-end">
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg font-semibold"
                >
                  Assign Book
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default AssignedBooks;
