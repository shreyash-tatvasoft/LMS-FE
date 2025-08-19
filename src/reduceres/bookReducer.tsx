import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// types
import { BookFields, BookState, AssigneBookFields } from "../utils/types";

// constants
import { ASSIGNED_BOOK_STATUS } from "../utils/constants";

const initialState: BookState = {
  books: [],
  assignedBooks : [],
  returnedBooks : []
};

export const bookSlice = createSlice({
  name: "books",
  initialState,
  reducers: {
    addNewBook: (state, action: PayloadAction<BookFields>) => {
      state.books.push(action.payload);
      return;
    },
    listBooks: (state) => {
      state.books
      return;
    },
    deleteBook: (state, action: PayloadAction<{ id: number }>) => {
      return {
        ...state,
        books: state.books.filter((item) => item.bookId !== action.payload.id),
      };
    },
    editBook: (state, action: PayloadAction<BookFields>) => {
      const index = state.books.findIndex(
        (book) => book.bookId === action.payload.bookId
      );
      if (index !== -1) {
        state.books[index] = action.payload; // Update the book
      }
    },
    assignBook : (state, action : PayloadAction<AssigneBookFields>) => {

      const modifiedBooksState = state.books.map((item) =>
        item.bookId === action.payload.bookId
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
      state.books = modifiedBooksState
      state.assignedBooks.push(action.payload)
    },
    listAssignedBooks : (state) => {
      state.assignedBooks;
      return;
    },
    returnAssignedBooks : (state, action: PayloadAction<AssigneBookFields>) => {
      const modifiedBooksState = state.books.map((item) =>
        item.bookId === action.payload.bookId
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
      const modifiedAssignedBooksState = state.assignedBooks.filter(item => item.assignedBookId !== action.payload.assignedBookId)

      const modifiedCompletedBooksState = {
        ...action.payload,
        bookStatus : ASSIGNED_BOOK_STATUS.RETURNED
      }

      state.books = modifiedBooksState
      state.assignedBooks = modifiedAssignedBooksState
      state.returnedBooks.push(modifiedCompletedBooksState)

    }
  },
});

export const { addNewBook, listBooks, deleteBook, editBook, assignBook, listAssignedBooks, returnAssignedBooks } = bookSlice.actions;

export default bookSlice.reducer;
