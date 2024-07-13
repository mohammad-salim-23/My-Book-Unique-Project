import { useContext } from "react";
import useAdmin from "../hooks/useAdmin";
import { AuthContext } from "../provider/AuthProvider";
import { NavLink, Outlet } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import { MdOutlineBookmarkBorder } from "react-icons/md";
import { BiBookAdd } from "react-icons/bi";
import { MdBookmarkAdded } from "react-icons/md";
import { FaBroom, FaChalkboardTeacher, FaHome, FaSchool, FaStar, FaUser, FaUserAlt } from "react-icons/fa";
import { IoBookOutline } from "react-icons/io5";
import { BiBookReader } from "react-icons/bi";
const Dashboard = () => {
    const [isAdmin] = useAdmin();
    const {user} = useContext(AuthContext);
    return (
        <div>
              <div className="flex gap-8">
            <div className="w-64 min-h-screen bg-primary-light">
        <ul className="menu">
         {
          isAdmin ?
          <>
             
             <li>
            <NavLink to="/dashboard/add">
            <BiBookAdd />
             Add Books
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/users">
             <FaUser></FaUser>
            All Users
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/allBookReq">
            <BiBookReader />
             Requested Books
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/myProfile">
            <CgProfile />
             My Profile
            </NavLink>
          </li>
          </>
          :""
         }
         
         {
          user  && !isAdmin && <>
           <li>
            <NavLink to="/dashboard/added">
            <MdBookmarkAdded />
             My Added Books
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/order">
            <MdOutlineBookmarkBorder />
             My Ordered Books
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/add">
            <BiBookAdd />
             Add Books
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/myProfile">
            <FaUserAlt></FaUserAlt>
             My Profile
            </NavLink>
           
            
          </li>
          </>
         }
         <div className="divider">
         </div>
            {/* shared nav links */}
            <li>
                <NavLink to="/">
                    <FaHome></FaHome>
                    Home
                </NavLink>
            </li>
         
          </ul>
          
          </div>
         <div className="flex-1 p-8"> 
         <Outlet></Outlet>
         </div>
        </div>
        </div>
    );
};

export default Dashboard;