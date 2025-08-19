// Router Set-up
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// Pages
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import NotFound from "./components/NotFound";
import Home from "./pages/Home";
import Books from "./pages/Books";
import AssignedBooks from "./pages/AssignedBooks";
import AccessDenied from "./components/AccessDenied";

// Components
import PrivateRoute from "./components/PrivateRoute";

// Utilities
import { ROUTES, ROLES } from "./utils/constants";

function App() {
  return (
    <>
      <Router>
        <Routes>
          {/* Authentication Routes */}
          <Route path={ROUTES.LOG_IN} element={<Login />} />
          <Route path={ROUTES.REGISTER} element={<Register />} />

          {/* Student Routes */}
          <Route element={<PrivateRoute requiredRole={ROLES.STUDENT_ROLE} />}>
            <Route path={ROUTES.HOME} element={<Home />} />
          </Route>

          {/* Admin Routes */}
          <Route element={<PrivateRoute requiredRole={ROLES.ADMIN_ROLE} />}>
            <Route path={ROUTES.DASHBOARD} element={<Dashboard />} />
            <Route path={ROUTES.BOOKS} element={<Books />} />
            <Route path={ROUTES.ASSIGNED_BOOKS} element={<AssignedBooks />} />
          </Route>

           {/* Invalid Routes */}
          <Route path={ROUTES.ACCESS_DENIED} element={<AccessDenied />} />

           {/* Not found Routes */}
          <Route path={ROUTES.NOT_FOUND} element={<NotFound />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
