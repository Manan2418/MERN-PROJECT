import React, { useState } from "react";
import "./AddVisitors.css";
import MainPage from "./MainPage";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import the CSS file

function AddVisitors() {
    const [formData, setFormData] = useState({
        date: "",
        firstName: "",
        lastName: "",
        phoneNumber: "",
        email: "",
        address: "",
        purposeOfVisit: "",
        whomToMeet: "",
        inTime: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log("Form data", formData);
            const response = await axios.post(
                "http://localhost:8000/addVisitors",
                formData
            );
            console.log("Response from server:", response.data);
            toast.success("Visitor registered successfully"); // Success message
            setFormData({
                date: "",
                firstName: "",
                lastName: "",
                phoneNumber: "",
                email: "",
                address: "",
                purposeOfVisit: "",
                whomToMeet: "",
                inTime: "",
            });
        } catch (error) {
            console.error(
                "Error submitting form:",
                error.response ? error.response.data : error.message
            );
            toast.error("Error registering visitor"); // Error message
        }
    };

    return (
        <>
            <MainPage />
            <div className="container-form">
                <div className="container-form1">
                    <form className="data-form" onSubmit={handleSubmit}>
                        <h1 className="h11-form">Add Visitor</h1>
                        <div>
                            <label className="details">Date:</label>
                            <input
                                className="text-form"
                                name="date"
                                type="date"
                                value={formData.date}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div>
                            <label className="details">First Name:</label>
                            <input
                                className="text-form"
                                name="firstName"
                                type="text"
                                placeholder="First Name"
                                value={formData.firstName}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div>
                            <label className="details">Last Name:</label>
                            <input
                                className="text-form"
                                name="lastName"
                                type="text"
                                placeholder="Last Name"
                                value={formData.lastName}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div>
                            <label className="details">Phone Number:</label>
                            <input
                                className="text-form"
                                name="phoneNumber"
                                type="tel"
                                placeholder="Phone Number"
                                value={formData.phoneNumber}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div>
                            <label className="details">Email:</label>
                            <input
                                className="text-form"
                                name="email"
                                type="email"
                                placeholder="Email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div>
                            <label className="details">Address:</label>
                            <input
                                className="text-form"
                                name="address"
                                type="text"
                                placeholder="Address"
                                value={formData.address}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div>
                            <label className="details">Purpose of Visit:</label>
                            <input
                                className="text-form"
                                name="purposeOfVisit"
                                type="text"
                                placeholder="Purpose of Visit"
                                value={formData.purposeOfVisit}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div>
                            <label className="details">Whom to Meet:</label>
                            <input
                                className="text-form"
                                name="whomToMeet"
                                type="text"
                                placeholder="Whom to Meet"
                                value={formData.whomToMeet}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div>
                            <label className="details">In Time:</label>
                            <input
                                className="text-form"
                                name="inTime"
                                type="time"
                                placeholder="In Time"
                                value={formData.inTime}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <button className="button-form" type="submit">
                            Submit
                        </button>
                    </form>
                </div>
            </div>
            <ToastContainer /> {/* Add ToastContainer to render the toast messages */}
        </>
    );
}

export default AddVisitors;
