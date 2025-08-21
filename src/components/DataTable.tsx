import React from 'react'

// types
import { DataTableProps } from "./../utils/types"
import { ASSIGNED_BOOK_STATUS } from '../utils/constants'

const DataTable : React.FC<DataTableProps> = ({
    tableHeaders = [],
    tableData = [],
    tableKeys = [],
    erorMsg = "No Data",
    isEditable = false,
    isDeleteable = false,
    isBookReturned = false,
    onDelete = () => {},
    onEdit = () => {},
    onReturnBook = () => {}
}) => {

  return (
    <div className="overflow-x-auto bg-white shadow-md rounded">
      <table className="min-w-full border-collapse">
        <thead className="bg-gray-200">
          <tr>
            {tableHeaders.map((item, index) => (
              <th
                key={index}
                className="text-center px-6 py-3 border border-gray-300"
              >
                {item}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {tableData.length > 0 ? (
            tableData.map((item) => (
              <tr key={item.bookId} className="hover:bg-gray-100">
                {tableKeys.map((key) => (
                  <td className="text-center px-6 py-4 border border-gray-300">
                    {item[key]}
                  </td>
                ))}
                {(isEditable || isDeleteable || isBookReturned) && (
                    <td className="text-center px-6 py-4 border border-gray-300">
                      {isEditable && (
                        <button
                          onClick={() => onEdit(item)}
                          className="bg-yellow-500 font-bold text-white px-2 py-1 rounded hover:bg-yellow-600 mr-2"
                        >
                          Edit
                        </button>
                      )}
                      {isDeleteable && (
                        <button
                          onClick={() => onDelete(item)}
                          className="bg-red-500 font-bold text-white px-2 py-1 rounded hover:bg-red-600"
                        >
                          Delete
                        </button>
                      )}
                      {isBookReturned && (
                        item.bookStatus === ASSIGNED_BOOK_STATUS.ISSUED ?
                        <button
                          onClick={() => onReturnBook(item)}
                          className="bg-green-500 font-bold text-white px-2 py-1 rounded hover:bg-green-600"
                        >
                          Mark As Returned
                        </button>
                        : 
                        <button
                          onClick={() => onReturnBook(item)}
                          className="bg-red-500 font-bold text-white px-2 py-1 rounded hover:bg-red-600"
                        >
                           Returned
                        </button>
                      )}
                    </td>
                  )}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5} className="text-center px-6 py-4">
                <p className="font-bold text-purple-800">{erorMsg}</p>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default DataTable