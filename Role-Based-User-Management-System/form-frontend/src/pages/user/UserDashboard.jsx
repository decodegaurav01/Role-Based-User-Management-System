import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getUserProfile, updateUserProfile } from "../../services/userService";
import "../../styles/UserDashboard.css";
import { useNavigate } from "react-router-dom";
import { isValidEmail, isValidPhone } from "../Validation";


export default function UserDashboard() {
  const [user, setUser] = useState({ name: "", email: "", phone: "", image: null });
  const [preview, setPreview] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const loadProfile = async () => {
      const res = await getUserProfile();
      if (res) {
        setUser(res.data);
        setPreview(res.data.image);
      }
    };
    loadProfile();
  }, []);

  const handleUpdate = async () => {
    if (!user.name) {
      toast.error("Name is required")
      return
    }
    else if (!user.email) {
      toast.error("Email is required")
      return
    }
    else if (!user.phone) {
      toast.error("Phone is reduired")
      return
    } else if (!isValidEmail(user.email)) {
      toast.error("Please enter a valid email address");
      return;
    } else if (!isValidPhone(user.phone)) {
      toast.error("Phone number must be exactly 10 digits");
      return;
    } else {



      const formData = new FormData();
      formData.append("name", user.name);
      formData.append("email", user.email);
      formData.append("phone", user.phone);
      if (user.image instanceof File) formData.append("image", user.image);


      const res = await updateUserProfile(formData);

      // console.log(res)

      if (res) 
        toast.success("Profile Updated!");
      else
        toast.error("Update failed");
    };
  }

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    navigate("/login");
  }

  return (
    <div className="dashboard-wrapper">

      <div className="dashboard-card">
        <div className="flex justify-end">
          <button className="btn-user-logout" onClick={handleLogout}>
            Logout
          </button>

        </div>
        {/* Profile Header */}
        <div className="profile-header">
          <img src={preview || "/images/profile.png"} className="avatar-large" alt="Profile" />
          <h2 className="user-name-title">{user.name || "User Name"}</h2>

          <label className="file-select-label">
            Change Photo
            <input
              type="file"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files[0];
                setUser({ ...user, image: file });
                setPreview(URL.createObjectURL(file));
              }}
            />
          </label>
        </div>

        {/* Info Rows */}
        <div className="info-section">
          <div className="info-item">
            <span className="info-label">Full Name</span>
            <input
              className="edit-input"
              value={user.name}
              onChange={(e) => setUser({ ...user, name: e.target.value })}
            />
          </div>

          <div className="info-item">
            <span className="info-label">Email</span>
            <input
              className="edit-input"
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
            />
          </div>

          <div className="info-item">
            <span className="info-label">Phone</span>
            <input
              className="edit-input"
              value={user.phone}
              maxLength={10}
              onChange={(e) => setUser({ ...user, phone: e.target.value })}
            />
          </div>
        </div>

        <button className="update-btn" onClick={handleUpdate}>
          Update Profile
        </button>
      </div>
    </div>
  );
}