import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './LogIn.css';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import the CSS file

const Login = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const loginUser = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post("http://localhost:8000/login", formData);
            console.log(response.data);
            if (response.data.token) {
                localStorage.setItem('Token', response.data.token);
            }
            toast.success("Login Successful"); // Use toast.success for success messages

            // Redirect to dashboard or another page upon successful login
            setTimeout(()=>{
                navigate("/dashboard");
            },2000)
            
        } catch (error) {
            if (error.response) {
                toast.error(error.response.data.message || "Error logging in"); // Use toast.error for error messages
            } else {
                toast.error("Error logging in"); // Generic error message
            }
        }
    };

    return (
        <div className="box">
            <div className="loginPrompt">
                <div className="imgDiv">
                    <img
                        className="imgLogin"
                        src="https://img.freepik.com/free-vector/flat-hand-drawn-dual-team-coworking-space_23-2148832031.jpg?t=st=1720687828~exp=1720691428~hmac=5d72ecf653a58387f295c53166d9919aece6311699c35109cac788b63ea83ba2&w=996"
                        alt="Login"
                    />
                </div>
                <form onSubmit={loginUser}>
                    <div className="loginDiv">
                        <h1 className="logintext">Login</h1>
                        <input
                            className="input"
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={handleChange}
                            autoComplete="true"
                            required
                        />
                        <input
                            className="input"
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                        <button className="loginbtn" type="submit">Log in</button>
                        <p className="didnthaveacc">New User? <a href="/Register">Register</a></p>
                    </div>
                </form>
            </div>
            <ToastContainer /> {/* Add ToastContainer to render the toast messages */}
        </div>
    );
};

export default Login;
