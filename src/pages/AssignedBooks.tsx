import React, { useEffect, useState} from "react";

// Redux Component
import { useSelector, useDispatch } from "react-redux";

// Components
import AdminLayout from "../components/AdminLayout";
import DataTable from "../components/DataTable";

// Constatnts
import { ASSIGNED_BOOK_STATUS, AssignedBookTableHeaders, AssignedBookTableRowsKeys, ROLES } from "../utils/constants";

// Root State Type
import { RootState } from "../store";

// types
import { StudentData, BookData, AssigneBookFields } from "../utils/types";

// Redux Actions
import { assignBook, listAssignedBooks, returnAssignedBooks } from "../reduceres/bookReducer";

// toast 
import { toast } from "react-toastify";

// moment
import moment from "moment";

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

  const checkAlreadyBookAssigned = () => {
    const bookId = parseInt(formData.book)
    const studentId = parseInt(formData.student)
    const userId = users.filter(item => item.id === studentId).map(item => item.id).toString()
    const booksArray = assignedBooks.filter(item => item.bookId === bookId && item.studentId === parseInt(userId))

    if(booksArray.length > 0) {
        return false
    } else {
      return true
    }

  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if(!handleAllValidation()) {
      return false
    }

    if(!checkAlreadyBookAssigned()) {
      toast.error("Book already assigned to same user")
      return false
    } 

    const bookId = parseInt(formData.book)
    const studentId = parseInt(formData.student)
    const studentName = studentArr.find(item => item.id === studentId)?.name
    const bookName = bookArr.find(item => item.id === bookId)?.name
  
    const paylod : AssigneBookFields = {
      bookName: bookName as string,
      studentName: studentName as string,
      issueDate: moment(formData.issueDate).format("DD-MMM-YYYY"),
      returnDate: moment(formData.returnDate).format("DD-MMM-YYYY"),
      bookId: bookId,
      studentId: studentId,
      assignedBookId: Date.now(),
      bookStatus : ASSIGNED_BOOK_STATUS.ISSUED
    };

     dispatch(assignBook(paylod))
     closeModal()
     toast.success("Book Assigned Successfully")

  };

  const handleReturnBook = (value : AssigneBookFields) => {
    dispatch(returnAssignedBooks(value))
    toast.success("Book Updated Successfully")
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

  useEffect(() => {
    dispatch(listAssignedBooks())
  }, [dispatch])

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
