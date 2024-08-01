import React from "react";
import { useNavigate } from "react-router-dom";
import "./LogOut.css";

const LogOut = () => {
    const navigate = useNavigate();

    const handleLogOut = () => {
        localStorage.removeItem('Token');
        navigate("/login");
    };

    return (
        <>
            <AsideBar />
            <div className="profile">
                <div className="first">
                    <button  onClick={handleLogOut}>Log Out</button>
                </div>
            </div>
        </>
    );
}

export default LogOut;
