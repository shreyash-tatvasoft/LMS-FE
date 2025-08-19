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

export const BookTableHeaders = ["Title", "Auther", "Description", "Quantity", "Action"]
export const BookTableRowsKeys = ["title", "auther", "description", "quantity"]

export const AssignedBookTableHeaders = ["Book Title", "Student Name", "Issue Date", "Return Date", "Action"]
export const AssignedBookTableRowsKeys = ["bookName", "studentName", "issueDate", "returnDate"]

export const StudentTableHeaders = ["Title", "Issue Date", "Return Date", "Status"]
export const StudentTableRowsKeys = ["bookName", "issueDate", "returnDate", "bookStatus"]