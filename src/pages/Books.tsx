import React, { useState, useEffect } from "react";

// Components
import AdminLayout from "../components/AdminLayout";
import Modal from "../components/BookModal";
import DataTable from "../components/DataTable";

// Redux Actions
import {  addNewBook, listBooks, deleteBook, editBook } from "../reduceres/bookReducer";

// Redux Components
import { useDispatch, useSelector } from "react-redux";

// Root State Type
import { RootState } from "../store";

// types
import { BookFields } from "../utils/types";

// toast 
import { toast } from "react-toastify";

// constants
import { BookTableHeaders, BookTableRowsKeys } from "../utils/constants";


const Books: React.FC = () => {

    const dispatch = useDispatch()

    const inittialState = {
        title: "",
        auther : "",
        description : "",
        quantity : 0,
    }

    const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
    const [modalActionType, setModalActionType] = useState<string>("")
    const [booksData, setBooksData] = useState<BookFields>(inittialState)

    const { books, assignedBooks } = useSelector((state : RootState) => state.books)

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

      const findItem = assignedBooks.findIndex(
        (item) => item.bookId === values.bookId
      );

      if (findItem !== -1) {
        toast.error(
          "Unable to delete this book as it has been issued to a user."
        );
        return false;
      }
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
    
    const addBookInfo = (values : BookFields) => {
        dispatch(addNewBook({ bookId : Date.now(), ...values}))
        closeModal()
        toast.success("Book Added Successfully")
    }

    const editBookInfo = (values : BookFields) => {
        dispatch(editBook(values))
        closeModal()
        toast.success("Book Updated Successfully")
    }

    const deleteBookInfo = (id :number) => {
        dispatch(deleteBook({ id : id}))
        closeModal()
        toast.success("Book deleted Successfully")
    }

    useEffect(() => {
        dispatch(listBooks())
    }, [dispatch])

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
            tableData={books}
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
