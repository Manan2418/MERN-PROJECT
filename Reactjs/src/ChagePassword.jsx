import React from "react";
import "./ChangePassword.css";
import LogOut from "./LogOut";
import MainPage from "./MainPage";

function ChangePassword() {
    return (
        <>
            <div className="container-password">
                <div className="inner-container-pass">
                    <p className="text-pass">Change Password</p>

                    <label className="label-text-pass">
                        Old Password:
                        <input className="input-pass" type="password"></input>
                    </label>

                    <label className="label-text-pass">
                        New Password:
                        <input className="input-pass" type="password"></input>
                    </label>

                    <label className="label-text-pass">
                        Confirm New Password:
                        <input className="input-pass" type="password"></input>
                    </label>

                    <button className="btn-pass">submit</button>
                </div>
            </div>
        </>
    );
}

export default ChangePassword;
