export const ROUTES = {
    HOME : '/',
    LOG_IN : "/login",
    REGISTER : "/register",
    DASHBOARD : "/dashboard",
    BOOKS : "/books",
    ASSIGNED_BOOKS: "/assignedBooks",
    ACCESS_DENIED : "/accessDenied",
    NOT_FOUND : "*"
}

export const ROLES = {
    ADMIN_ROLE : "ADMIN",
    STUDENT_ROLE : "STUDENT"
}

export const STATUS = {
    SUCCESS : "SUCCESS",
    REJECTED : "REJECTED",
    PENDING : "PENDING"
}

export const ASSIGNED_BOOK_STATUS = {
    RETURNED : "RETURNED",
    ISSUED : "ISSUED"
}

export const BookTableHeaders = ["Title", "Author", "Description", "Quantity", "Action"]
export const BookTableRowsKeys = ["title", "author", "description", "quantity"]

export const AssignedBookTableHeaders = ["Book Title", "Student Name", "Issue Date", "Return Date", "Action"]
export const AssignedBookTableRowsKeys = ["bookName", "studentName", "issueDate", "returnDate"]

export const StudentTableHeaders = ["Title", "Issue Date", "Return Date", "Status"]
export const StudentTableRowsKeys = ["bookName", "issueDate", "returnDate", "bookStatus"]

export const StudentHistoryTableHeaders = ["Title", "Issue Date", "Returned At", "Status"]
export const StudentHistoryTableRowsKeys = ["bookName", "issueDate", "returnDate", "bookStatus"]

export const API_ROUTES = {
    AUTH : {
        REGISTER : "api/auth/register",
        LOGIN : "api/auth/login"
    },
    BOOKS : {
        CREATE_BOOK : "api/books",
        LIST_BOOKS: "api/books",
        UPDATE_BOOK: "api/books",
        DELETE_BOOK: "api/books"
    },
    ASSIGNED_BOOKS : {
        LIST_ASSIGNED_BOOKS : "api/assigned-books",
        ASSIGNED_BOOK : "api/assigned-books",
        RETURN_BOOK: "api/assigned-books",
        MY_BOOKS : "api/assigned-books/list-books",
        GET_ALL_STUDENTS: "api/assigned-books/students"
    }
}