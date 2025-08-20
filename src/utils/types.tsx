import { ReactNode } from "react";

export interface PrivateRouteProps {
  requiredRole: string;
}
export interface AdminLayoutProps {
  children : ReactNode
}

export interface ModalProps {
  openModal : boolean
  actionType : string
  formValues : BookFields
  closeModal : () => void
  saveDetails : (values : BookFields) => void,
  deleteInfo : (id : number) => void,
}

export interface DataTableProps {
   tableHeaders : string[]
   tableData :any[];
   tableKeys : string[],
   erorMsg : string
   isEditable : boolean
   isDeleteable : boolean
   isBookReturned : boolean
   onEdit? : (item : any) => void
   onDelete? : (item : any) => void
   onReturnBook? : (item: any) => void
}

export interface RegistrationFields {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  dob: string;
  role: string;
  id?: number;
}

// Define the initial state type
export interface AuthState {
  users: RegistrationFields[];
  loggedInUser : LoggedInUser | null
}

export interface ActionPayloadType {
  type: string;
  payload?: any;
}

export interface LogInFields {
  email: string;
  password: string;
}

export interface BookFields {
  title : string,
  description: string,
  auther : string,
  quantity : number,
  bookId?: number
}

export interface AssigneBookFields {
  bookName : string
  studentName : string
  issueDate : string
  returnDate : string
  bookStatus : string
  bookId : number | null
  studentId : number | null
  assignedBookId : number | null
}

export interface BookFieldsError {
  title : boolean,
  description: boolean,
  auther : boolean,
  quantity : boolean,
}

export interface BookState {
  books: BookFields[],
  assignedBooks : AssigneBookFields[],
  returnedBooks : AssigneBookFields[],
}

export interface StudentData {
  id : number,
  name : string
}

export interface BookData {
  id : number,
  name : string
}


// API
export type TRequestMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

export interface IRequestParams {
    endPoint: string;
    method: TRequestMethod;
    headers?: Record<string, string>;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    body?: any;
    withToken?: boolean; // optional flag
    isFormData?: boolean;
}


export interface LoggedInUser {
  id: number,
  fullName: string,
  email: string,
  role: string
}