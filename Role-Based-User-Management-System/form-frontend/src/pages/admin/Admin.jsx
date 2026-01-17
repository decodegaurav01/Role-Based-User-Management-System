import { useEffect, useState } from "react";
import { getAllUsers, deleteUser } from "../../services/adminService";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/Admin.css";

export default function Admin() {
    const [users, setUsers] = useState([]);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedUserId, setSelectedUserId] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        const loadUsers = async () => {
            try {
                const res = await getAllUsers();
                if (res) {
                    setUsers(res.data);
                } else {
                    toast.error(res || "Failed to fetch users");

                }
            } catch (error) {
                toast.error("Session expired. Please login again.", error);
                sessionStorage.clear();
                navigate("/login");
            }
        };

        loadUsers();

    }, [navigate]);

    const openDeleteModal = (id) => {
        setSelectedUserId(id);
        setShowDeleteModal(true);
    };

    const handleDeleteConfirm = async () => {
        try {
            const res = await deleteUser(selectedUserId);
            if (res) {
                toast.success("User deleted successfully");
                setUsers((prev) => prev.filter((u) => u.id !== selectedUserId));
            } else {
                toast.error(res || "Delete failed");
            }
        } catch (error) {
            toast.error("Unauthorized action", error);
        } finally {
            setShowDeleteModal(false);
            setSelectedUserId(null);
        }
    };

    const handleEdit = (user) => {
        navigate(`/admin/update-user/${user.id}`, { state: { user } });
    }

    const handleLogout = () => {
        sessionStorage.clear();
        navigate("/login");
    };

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="max-w-5xl mx-auto bg-white shadow rounded p-6">

                {/* Header */}
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold">Admin Dashboard</h2>
                    <button onClick={handleLogout} className="btn-logout">
                        Logout
                    </button>
                </div>

                {/* Table */}
                {users.length === 0 ? (
                    <p className="empty-state">No users found</p>
                ) : (
                    <div className="user-table-wrapper">
                        <table className="user-table">
                            <thead className="user-table-thead">
                                <tr>
                                    <th className="user-table-th text-center">Profile</th>
                                    <th className="user-table-th">Name</th>
                                    <th className="user-table-th">Email</th>
                                    <th className="user-table-th">Phone</th>
                                    <th className="user-table-th text-center">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((u) => (
                                    <tr key={u.id} className="user-table-row">
                                        <td className="user-table-td text-center">
                                            {u.image ? (
                                                <img src={u.image} alt="profile" className="user-avatar" />
                                            ) : (
                                                <div className="user-avatar bg-slate-200 flex items-center justify-center text-xs">
                                                    N/A
                                                </div>
                                            )}
                                        </td>
                                        <td className="user-table-td font-medium text-slate-900">{u.name}</td>
                                        <td className="user-table-td">{u.email}</td>
                                        <td className="user-table-td">{u.phone}</td>
                                        <td className="user-table-td text-center">
                                            <div className="flex justify-center gap-2">
                                                <button
                                                    onClick={() => openDeleteModal(u.id)}
                                                    className="btn-delete"
                                                >
                                                    Delete
                                                </button>
                                                <button
                                                    onClick={() => handleEdit(u)}
                                                    className="link-edit"
                                                >
                                                    Edit
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
            {showDeleteModal && (
                <div className="pop-card">
                    <div
                        className="pop-overlay"
                        onClick={() => setShowDeleteModal(false)}
                    />
                    <div className="pop-content">
                        <h3 className="pop-title">
                            Confirm Deletion
                        </h3>
                        <p className="pop-title-2">
                            Are you sure you want to delete this user?
                            <br />
                            <span className="pop-warning">
                                This action cannot be undone.
                            </span>
                        </p>
                        <div className="pop-actions">
                            <button
                                className="btn-cancel"
                                onClick={() => setShowDeleteModal(false)}
                            >
                                Cancel
                            </button>

                            <button
                                className="btn-confirm-delete"
                                onClick={handleDeleteConfirm}
                            >
                                Yes, Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
