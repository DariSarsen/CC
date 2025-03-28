import { Routes, Route, Navigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import Home from "../pages/home";
import Login from "../pages/login";
import Dashboard from "../pages/dashboard";
import ResumePage from "../pages/resumePage";
import CreateUser from "../pages/createUser";

import ProtectedRoute from "../components/protectedRoute";

const AppRouter = () => {
  return (
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />

        <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
        </Route>

        <Route element={<ProtectedRoute requiredRole="admin" />}>
            <Route path="/newUser" element={<CreateUser />} />
        </Route>
        
        <Route element={<ProtectedRoute requiredRole="student" />}>
            <Route path="/myResume" element={<ResumePage />} />
        </Route>

        <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default AppRouter;
