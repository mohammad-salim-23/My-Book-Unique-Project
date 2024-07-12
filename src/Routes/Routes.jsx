import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../pages/Home/Home";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";
import ErrorPage from "../pages/ErrorPage";
import Dashboard from "../Layout/Dashboard";


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
        }
    ]
   },
  {
    path:"/dashboard",
    element:<Dashboard></Dashboard>,
    errorElement:<ErrorPage></ErrorPage>
  }

])