import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import './Register.css'; // Import your CSS file
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import the CSS file

const Register = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        user: "",
        email: "",
        contact: "",
        password: "",
        BirthDay: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const validateForm = () => {
        const { user, email, contact, password, BirthDay } = formData;
        if (!(user && email && contact && password && BirthDay)) {
            toast.error("All fields are required");
            return false;
        }
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) {
            return;
        }

        try {
            const response = await axios.post("http://localhost:8000/register", formData);
            toast.success(response.data.message || "Registration successful"); // Use toast.success for success messages
            setTimeout(()=>{
            navigate("/Login"); // Redirect to login page after successful registration
            },2000)
        } catch (error) {
            if (error.response) {
                toast.error(error.response.data.message || "Error registering user"); // Use toast.error for error messages
            } else {
                toast.error("Error registering user"); // Generic error message
            }
        }
    };

    return (
        <div className="outerdiv">
            <div className="innerdiv">
                <div className="imagediv">
                    <img
                        className="myimg"
                        src="https://img.freepik.com/free-vector/happy-freelancer-with-computer-home-young-man-sitting-armchair-using-laptop-chatting-online-smiling-vector-illustration-distance-work-online-learning-freelance_74855-8401.jpg?t=st=1720677522~exp=1720681122~hmac=b304fb8ce8a74cd5e18e604e236ef196166521a2783e51f1577f610f8d3cdc82&w=740"
                        alt="Register"
                    />
                </div>
                <div className="formdiv">
                    <form className="my-form" onSubmit={handleSubmit}>
                        <div>
                            <h1 className="h11">Register</h1>
                            <input
                                className="text1"
                                type="text"
                                name="user"
                                placeholder="Username"
                                value={formData.user}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div>
                            <input
                                className="text1"
                                type="email"
                                name="email"
                                placeholder="Email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div>
                            <input
                                className="text1"
                                type="tel"
                                name="contact"
                                placeholder="Contact"
                                value={formData.contact}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div>
                            <input
                                className="text1"
                                type="password"
                                name="password"
                                placeholder="Password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div>
                            <input
                                className="text1"
                                type="date"
                                name="BirthDay"
                                value={formData.BirthDay}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div>
                            <button className="registerbtn2" type="submit">Register</button>
                        </div>
                        <p className="alreadyregisteredtext">
                            Already a User? <a href="/Login" className="togglebtn">Login</a>
                        </p>
                    </form>
                </div>
            </div>
            <ToastContainer /> {/* Add ToastContainer to render the toast messages */}
        </div>
    );
};

export default Register;
