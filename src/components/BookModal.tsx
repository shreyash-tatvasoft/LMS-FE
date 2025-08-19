import React, { useState } from 'react'

// types
import { ModalProps, BookFields, BookFieldsError } from '../utils/types'

const Modal: React.FC<ModalProps> = ({ openModal, actionType, closeModal , formValues, saveDetails, deleteInfo}) => {

    const inittialErrorState = {
        title: false,
        auther : false,
        description : false,
        quantity : false,
    }

    const isEdit = actionType.trim() === "EDIT" ? true : false
    const [formData, setFormData] = useState<BookFields>(formValues)
    const [formDataError, setFormDataError] = useState<BookFieldsError>(inittialErrorState)

    const handleSubmit = (event : React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        if(!handleAllValidation()) {
            return false;
        }
        
        saveDetails(formData)
    }

    const handleChange = (event : React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target

        if(value.trim() === "") {
            setFormDataError({
                ...formDataError,
                [name] : true
            })
        } else {
            setFormDataError({
                ...formDataError,
                [name] : false
            })
        }

        setFormData({
            ...formData,
            [name] : value
        })
    }

    const handleAllValidation = () => {
        let errorFields = {
          title: false,
          auther: false,
          description: false,
          quantity: false,
        };

        if(formData.title.trim() === "") {
            errorFields.title = true
        }
        if(formData.auther.trim() === "") {
            errorFields.auther = true
        }
        if(formData.quantity <= 0) {
            errorFields.quantity = true
        }
        if(formData.description.trim() === "") {
            errorFields.description = true
        }

        setFormDataError(errorFields)

        return Object.values(errorFields).every((value) => value === false);
    }

    const handleDelete = () => {
        if(formValues && formValues.bookId) {
            deleteInfo(formValues.bookId)
        }
    }

    const renderErrorDiv = (errMsg: string) => {
        return <div className='text-orange-700 my-1 font-semibold'>{errMsg}</div>
    }
  return (
    <>
      {openModal && actionType !== "DELETE" && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={closeModal}
        >
          <div
            className="bg-white rounded-lg p-6 w-2/5"
            onClick={(e) => e.stopPropagation()} // Prevent closing modal when clicking inside
          >
            <h2 className="text-xl font-bold mb-4">
              {isEdit ? "Edit Book" : "Add New Book"}
            </h2>

            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label
                  htmlFor="title"
                  className="block text-gray-700 font-medium mb-2"
                >
                  Book Title
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {formDataError.title && renderErrorDiv("Please enter valid title")}
              </div>

              <div className="mb-4">
                <label
                  htmlFor="auther"
                  className="block text-gray-700 font-medium mb-2"
                >
                  Book Auther
                </label>
                <input
                  type="text"
                  id="auther"
                  name="auther"
                  value={formData.auther}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {formDataError.auther && renderErrorDiv("Please enter valid auther name")}
              </div>

              <div className="mb-4">
                <label
                  htmlFor="quantity"
                  className="block text-gray-700 font-medium mb-2"
                >
                  Book Quantity
                </label>
                <input
                  type="number"
                  id="quantity"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {formDataError.quantity && renderErrorDiv("Please enter valid quantity")}
              </div>

              <div className="mb-4">
                <label
                  htmlFor="description"
                  className="block text-gray-700 font-medium mb-2"
                >
                  Book Description
                </label>
                <input
                  type="text"
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {formDataError.description && renderErrorDiv("Please enter valid description")}
              </div>

              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={closeModal}
                  className="bg-gray-500 text-white px-4 py-2 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                >
                  {isEdit ? "Update" : "Save"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {openModal && actionType === "DELETE" && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-2/5">
            <h2 className="text-3xl font-bold mb-5 text-red-700">Confirm Delete</h2>
            <p className="text-xl mb-6">
              Are you sure you want to delete this item ?
            </p>
            <div className="flex justify-end space-x-2">
              <button
                onClick={closeModal}
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
              >
                Cancel
              </button>
              <button onClick={handleDelete} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Modal