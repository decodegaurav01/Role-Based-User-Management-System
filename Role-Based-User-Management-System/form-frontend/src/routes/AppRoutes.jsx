import { Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Register from "../pages/auth/Register";
import Login from "../pages/auth/Login";
import Admin from "../pages/admin/Admin";
import UpdateUser from "../pages/admin/UpdateUser";
import UserDashboard from "../pages/user/UserDashboard";
import ProtectedRoute from "./ProtectedRoute";

export default function AppRoutes() {
    
    const role = sessionStorage.getItem("role");

    return (
        <>
            <Routes>
                <Route path="/" element={<Register />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />

                {/* Admin Routes */}
                <Route
                    path="/admin"
                    element={role === "ADMIN" ?
                        <ProtectedRoute>
                            <Admin />
                        </ProtectedRoute> : <Navigate to="/login" replace />}
                />
                <Route
                    path="/admin/update-user/:id"
                    element={role === "ADMIN" ? <ProtectedRoute>
                        <UpdateUser />
                    </ProtectedRoute> : <Navigate to="/login" replace />}
                />

                {/* User Routes */}
                <Route
                    path="/user-dashboard"
                    element={role === "USER" ?
                        <ProtectedRoute>
                            <UserDashboard />
                        </ProtectedRoute> : <Navigate to="/login" replace />}
                />
                <Route path="*" element={<Navigate to="/login" replace />} />
            </Routes>

            <ToastContainer />
        </>
    );
} 