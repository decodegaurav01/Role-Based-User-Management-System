import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Link, useLocation, useNavigate,  useParams } from "react-router-dom";
import { updateUser } from "../../services/adminService";
import '../../styles/Profile.css';
import { isValidEmail, isValidPhone } from "../Validation";

export default function UpdateUser() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { state } = useLocation();
  
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    phone: "",
    image: null,
  });


  useEffect(() => {
    const loadUser = async () => {


      if (state?.user) {
        setUserData({
          name: state.user.name,
          email: state.user.email,
          phone: state.user.phone,
          image: state.user.image || null,
        });
      } else {
        toast.error("Failed to load user");
      }
    };

    loadUser();
  }, [state]);

  useEffect(() => {
    return () => {
      if (userData.image) {
        (userData.image);
      }
    };
  }, [userData.image]);


  const handleChanges = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (!userData.name) {
      toast.error("Name is required")
      return
    } 
    else if (!userData.email) {
      toast.error("Email is required")
      return
    }
    else if (!userData.phone) {
      toast.error("Phone is reduired")
      return
    } else if (!isValidEmail(userData.email)) {
      toast.error("Please enter a valid email address");
      return;
    } else if (!isValidPhone(userData.phone)) {
      toast.error("Phone number must be exactly 10 digits");
      return;
    } else {


      const formData = new FormData();
      formData.append("name", userData.name);
      formData.append("email", userData.email);
      formData.append("phone", userData.phone);


      if (userData.image) {
        formData.append("image", userData.image);
      }

      const res = await updateUser(id, formData);
      console.log(res);
      if (res.data.affectedRows > 0) {
        toast.success("User updated successfully");
        navigate("/admin");
      }else if(res.data.code ==='ER_DUP_ENTRY'){
        toast.error("Email or Phone number already exists");
      }
       else {
        toast.error("Update failed");
      }
    }
  };

  return (


    <div className="profile-page">
      <div className="profile-card">
        <div className="mb-8">
          <Link to="/admin" className="back-link">
            <span>←</span> Back to Dashboard
          </Link>
          <h1 className="text-2xl font-extrabold text-slate-800 mt-2">Edit Profile</h1>
        </div>
        <div className="avatar-container">
          <img
            src={userData.image ? (typeof userData.image === 'string' ? userData.image : URL.createObjectURL(userData.image)) : '/public/images/profile.png'}
            alt="Profile Preview"
            className="avatar-preview"
          />
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setUserData({ ...userData, image: e.target.files[0] })}
            className="file-input-custom"
          />
        </div>


        <div className="form-grid">
          <div className="input-group">
            <label className="input-label">Full Name</label>
            <input
              type="text"
              name="name"
              value={userData.name}
              onChange={handleChanges}
              className="input-field"
              placeholder="e.g. John Doe"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="input-group">
              <label className="input-label">Email Address</label>
              <input
                type="email"
                name="email"
                value={userData.email}
                onChange={handleChanges}
                className="input-field"
                placeholder="john@example.com"
              />
            </div>
            <div className="input-group">
              <label className="input-label">Phone Number</label>
              <input
                type="text"
                name="phone"
                maxLength={10}
                value={userData.phone}
                onChange={handleChanges}
                className="input-field"
                placeholder="+1 234 567 890"
              />
            </div>
          </div>
          <div className="flex  gap-5">
            <button onClick={handleSubmit} className="link-edit">
              Save Changes
            </button>
            <button onClick={() => navigate("/admin")} className="btn-delete">
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
