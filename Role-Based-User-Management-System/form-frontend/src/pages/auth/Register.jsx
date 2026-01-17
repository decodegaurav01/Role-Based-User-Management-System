import { useState } from "react";
import { toast } from "react-toastify";
import { registerUser } from "../../services/authService";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/Register.css"
import { isValidEmail, isValidPhone } from "../Validation";


export default function Register() {
  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    role: "USER",
    image: null
  })
  const handleChanges = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
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
    } else if (!userData.password) {

      toast.error("Email is required")
      return
    } else if (!isValidEmail(userData.email)) {
      toast.error("Please enter a valid email address");
      return;
    } else if (!isValidPhone(userData.phone)) {
      toast.error("Phone number must be exactly 10 digits");
      return;
    }
    else {

      const formData = new FormData();
      formData.append("name", userData.name);
      formData.append("email", userData.email);
      formData.append("phone", userData.phone);
      formData.append("password", userData.password);
      formData.append("role", userData.role);
      formData.append("image", userData.image);


      const response = await registerUser(formData);

      // console.log(response)

      if (response) {
        toast.success("Registration successful");

        setUserData({
          name: "",
          email: "",
          phone: "",
          password: "",
          role: "USER",
          image: null
        })
        navigate("/login")

      } else {
        toast.error(response || "Registration failed");
      }
    }
  };

  return (
    <div className="page">
      <div className="card">
        <h2 className="title">
          User Registration
        </h2>

        <input
          type="text"
          name="name"
          placeholder="Name"
          value={userData.name}
          onChange={handleChanges}
          className="input"
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={userData.email}
          onChange={handleChanges}
          className="input"
        />

        <input
          type="text"
          name="phone"
          placeholder="Phone"
          maxLength={10}
          value={userData.phone}
          onChange={handleChanges}
          className="input"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={userData.password}
          onChange={handleChanges}
          className="input"
        />
        {/* <div className="mb-3">
          <label className="font-semibold block mb-1">Select Role</label>
          <div className="flex gap-4">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                value="USER"
                checked={role === "USER"}
                onChange={(e) => setRole(e.target.value)}
              />
              User
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                value="ADMIN"
                checked={role === "ADMIN"}
                onChange={(e) => setRole(e.target.value)}
              />
              Admin
            </label>
          </div>
        </div> */}

        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={(e) => setUserData({ ...userData, image: e.target.files[0] })}
          className="input"
        />

        <button
          onClick={handleSubmit}
          className="button"
        >
          Register
        </button>
        <div className=" mt-2 ">
          <p className="text-lg text-gray-700">
            Already have an account?{"  "}
            <Link to='/login' className="login-link">
              Click here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
