import React, { useState, useEffect, useCallback } from "react";

// Components
import AdminLayout from "../components/AdminLayout";
import Modal from "../components/BookModal";
import DataTable from "../components/DataTable";

// Redux Actions
import { allBooksData } from "../reduceres/bookReducer";

// Redux Components
import { useDispatch} from "react-redux";

// types
import { BookFields } from "../utils/types";

// toast 
import { toast } from "react-toastify";

// constants
import { API_ROUTES, BookTableHeaders, BookTableRowsKeys } from "../utils/constants";

// API Call
import { apiCall } from "../utils/services/request";


const Books: React.FC = () => {

    const dispatch = useDispatch()

    const inittialState = {
        title: "",
        author : "",
        description : "",
        quantity : 0,
    }

    const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
    const [modalActionType, setModalActionType] = useState<string>("")
    const [booksData, setBooksData] = useState<BookFields>(inittialState)
    const [booksDataArray, setBooksDataArray] = useState<BookFields[]>([])

    const closeModal = () => {
        setIsModalOpen(false)
        setModalActionType("")
        setBooksData(inittialState)
    }
    const openAddModal = () => {
        setModalActionType("ADD")
        setIsModalOpen(true)
    }
    const openEditModal = (values : BookFields) => {
        setModalActionType("EDIT")
        setBooksData(values)
        setIsModalOpen(true)
    }
    const openDeleteModal = (values: BookFields) => {

        setModalActionType("DELETE")
        setBooksData(values)
        setIsModalOpen(true)
    }

    const submitBookDetails = (values : BookFields) => {
        if(modalActionType === "EDIT") {
            editBookInfo(values)
        } else {
            addBookInfo(values)
        }
    }
    
    const addBookInfo = async (values : BookFields) => {
       const response = await apiCall({
         method: "POST",
         endPoint: API_ROUTES.BOOKS.CREATE_BOOK,
         body: values,
       })

        if(response && response.success) {
          await fetchBooks()
          closeModal()
          toast.success("Book Added Successfully")
        }
    }

    const editBookInfo = async (values : BookFields) => {

      const bookId = values.bookId

      const updatedBody = {
        "title": values.title,
        "description": values.description,
        "quantity": values.quantity,
        "author": values.author
      }

      const response = await apiCall({
        method: "PUT",
        endPoint: `${API_ROUTES.BOOKS.UPDATE_BOOK}/${bookId}`,
        body: updatedBody
      })

      if (response && response.success) {
        await fetchBooks()
        closeModal()
        toast.success("Book Updated Successfully")
      }
    }

    const deleteBookInfo = async (id: number) => {
      const response = await apiCall({
        method: "DELETE",
        endPoint: `${API_ROUTES.BOOKS.DELETE_BOOK}/${id}`,
      })

      if (response && response.success) {
        await fetchBooks()
        closeModal()
        toast.success("Book deleted Successfully")
      }
    }

    const fetchBooks = useCallback(async () => {
      try {
        const response = await apiCall({
          endPoint: API_ROUTES.BOOKS.LIST_BOOKS,
          method: "GET",
        })

        let booksResponseArray = []

        if (response && response.success && response.data.length > 0) {
            booksResponseArray = response.data.map((item : any) => {
              return {
                ...item,
                bookId: item.id
              }
            })
          } 
          
        setBooksDataArray(booksResponseArray)
        dispatch(allBooksData(booksResponseArray))
        
      } catch (error) {
        console.error('Error fetching data', error);
      }

    }, [])

    useEffect(() => {
      fetchBooks()
    }, [fetchBooks])

  return (
    <AdminLayout>
      <div className="p-6 text-4xl text-purple-700 font-bold">Books</div>

      <div className="p-6 bg-gray-100">
        <div className="flex justify-end items-center mb-4">          
          {/* Add Button */}
          <button className="bg-blue-500 text-white font-bold px-4 py-2 rounded hover:bg-blue-600" onClick={openAddModal}>
            Add
          </button>
        </div>

        {/* Table */}
        <DataTable
            tableHeaders={BookTableHeaders}
            tableData={booksDataArray}
            tableKeys={BookTableRowsKeys}
            onDelete={openDeleteModal}
            onEdit={openEditModal}
            erorMsg="No books available"
            isEditable={true}
            isDeleteable={true}
            isBookReturned={false} 
        />
      </div>

      {isModalOpen && 
        <Modal
          openModal
          closeModal={closeModal}
          actionType={modalActionType}
          formValues={booksData}
          saveDetails={(val) => submitBookDetails(val)}
          deleteInfo={(id) => deleteBookInfo(id)}
        />
      }
    </AdminLayout>
  );
};

export default Books;
