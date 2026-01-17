import { useState } from "react";
import { loginUser } from "../../services/authService";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/Login.css"
import { isValidEmail } from "../Validation";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const handleSubmit = async () => {

        if (email.length === 0) {
            toast.error("Please enter email");
        } else if (!isValidEmail(email)) {
            toast.error("Please enter a valid email address");
            return;
        } else if (password.length === 0) {
            toast.error("Please enter password");
        } else {

            const encodedEmail = btoa(email); 
            const encodedPassword = btoa(password);

            const res = await loginUser(encodedEmail, encodedPassword);

            if (res) {

                sessionStorage.clear();

                sessionStorage.setItem("token", res.token);
                sessionStorage.setItem("role", res.role);

                setEmail("");
                setPassword("");

                if (res.role === "ADMIN") {
                    toast.success("Welcome, Admin!");
                    navigate("/admin", { replace: true });
                } else if (res.role === "USER") {
                    toast.success("Login successful!");
                    navigate("/user-dashboard", { replace: true });
                }

            } else {
                toast.error("Invalid email or password");

                setPassword("");
            }
        }
    };

    return (
        <div className="login-page">
            <div className="login-card">
                <h2 className="login-title">Login</h2>

                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="login-input"
                    required
                />

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="login-input"
                    required
                />

                <button
                    onClick={handleSubmit}
                    type="submit"
                    className="login-button"
                >
                    Login
                </button>
                <div className="mt-2">
                    <p className="text-lg text-gray-700">
                        Create an account?{" "}
                        <Link to="/register" className="login-link">
                            Click here
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
