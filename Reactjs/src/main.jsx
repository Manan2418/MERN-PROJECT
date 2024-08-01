import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./App.css";
import { createBrowserRouter, RouterProvider, Route } from "react-router-dom";
import AddVisitors from "./AddVisitors.jsx";
import Dashboard from "./Dashboard.jsx";
import ManageVisitors from "./ManageVisitors.jsx";
import ChangePassword from "./ChagePassword.jsx";
import MainPage from "./MainPage.jsx";
import AsideBar from "./AsideBar.jsx";
import Login from "./LogIn.jsx";
import Register from "./Register.jsx";
import LogOut from "./LogOut.jsx";


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,//when start the first page is <App/>
  },
  {
    path: "/addVisitors",
    element: <AddVisitors />,//when we click on addvisitors it will navigate to add visitors page
  },
  {
    path: "/dashboard",
    element: <Dashboard />,//when we click on dashboard it will navigate to dashboard page
  },
  {
    path: "/manageVisitors",
    element: <ManageVisitors />,//when we click on managevisitors it will navigate to manage visitors page
  },

  {
    path: "/Login",
    element: <Login />,//if user is already registered then he will click on login then he will navigate to login form page
  },
  {
    path: "logoutBox",
    element: <Login />,//when user will logout then he will redirect to login page and will again login
  },
  {
    path: "/Mainpage",
    element: <MainPage/>,//when user will login he will get navigate to mainpage
  },
  {
    path:"/Register",
    element:<Register/>,//if the user is new he will click on register then he will direct to register page
  },
  {
    path:"/logout",
    element:<Login/>
  },
  {
    path:"/moreinfo",
    element:<ManageVisitors/>
  },
  {
    path: "/ForgetPassword",
    element: <ChangePassword />,//when we click on changepassword it will navigate to changepassword page
  },
  

]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);