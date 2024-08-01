import React from "react";
import "./App.css";
import AsideBar from "./AsideBar";
import { useState } from "react";

function MainPage() {
    const [name, setName] = useState();

    const updateName = () => {
        setName(
            <a href="logoutBox" className="logoutBox">
                Log Out
            </a>
        );
    };
    return (
        <>
            <AsideBar />

            <div className="mainDiv">
                <div className="header">
                    <h1>Visitor Management System</h1>
                    <div className="profile-pic">
                        <button className="logoutImg" onClick={updateName}>
                            <div>
                                <img
                                    src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                                    className="pic"
                                ></img>
                            </div>
                            {name}
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default MainPage;
