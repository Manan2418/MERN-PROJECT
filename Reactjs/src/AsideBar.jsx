import React from "react";
import "./Aside.css";
import { Link } from "react-router-dom";

function AsideBar() {
  const handleLogOut = () => {
    localStorage.removeItem('Token')
  }
  return (
    <>
      <div className="AsideBar">
        <aside className="container">
          <Link to="/dashboard" className="dashboard common">
            Dashboard
          </Link>
          <Link to="/addVisitors" className="addVisitors common">
            Add Visitors
          </Link>
          <Link to="/manageVisitors" className="manageVisitors common">
            Manage Visitors
          </Link>
          <Link to="/logout" className="lgout-btn">
            <button className="lgOut-btn1" onClick={handleLogOut} type="reset">Log Out</button>
          </Link>
        </aside>
      </div>
    </>
  );
}

export default AsideBar;