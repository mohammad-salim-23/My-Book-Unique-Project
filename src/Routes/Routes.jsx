import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../pages/Home/Home";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";
import ErrorPage from "../pages/ErrorPage";
import Dashboard from "../Layout/Dashboard";
import MyAddedBooks from "../Users/MyAddedBooks";
import MyOrderedBooks from "../Users/MyOrderedBooks";
import AddBooks from "../Users/AddBooks";
import MyProfile from "../shared/MyProfile";
import AllUsers from "../Admin/AllUsers";
import AllBookReq from "../Admin/AllBookReq";
import PrivateRoute from "./PrivateRoute";
import AdminRoute from "./AdminRoute";


export const router = createBrowserRouter([
   {
    path:"/",
    element:<Main></Main>,
    errorElement:<ErrorPage></ErrorPage>,
    children:[
        {
            path:"/",
            element:<Home></Home>
        },
        {
           path:"/login",
           element:<Login></Login>
        },
        {
            path:"/signUp",
            element:<SignUp></SignUp>
        },
        {
            path:"/add",
            element:<PrivateRoute><AddBooks></AddBooks></PrivateRoute>
        }
    ]
   },
  {
    path:"/dashboard",
    element:<PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
    errorElement:<ErrorPage></ErrorPage>,
    children:[
        {
            path:"added",
            element:<MyAddedBooks></MyAddedBooks>
            
        },
        {
            path:"order",
            element:<MyOrderedBooks></MyOrderedBooks>
        },
        {
            path:"add",
            element:<AddBooks></AddBooks>
        },
        {
            path:"MyProfile",
            element:<MyProfile></MyProfile>
        },
        // admin routes
        {
            path:"users",
            element:<AdminRoute><AllUsers></AllUsers></AdminRoute>

        },
        {
            path:"allBookReq",
            element:<AdminRoute><AllBookReq></AllBookReq></AdminRoute>
        }
    ]
  }

])