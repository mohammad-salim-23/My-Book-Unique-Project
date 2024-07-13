
import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../provider/AuthProvider';
import logo from "../../public/BookIcon.jpg"
import useAdmin from '../hooks/useAdmin';
const Navbar = () => {
  const {user,logOut} = useContext(AuthContext);
  const [showDropdown,setShowDropdown] = useState(false);
  const [isAdmin] = useAdmin();

  const toggleDropdown=()=>{
    setShowDropdown(!showDropdown);
  };
  const closeDropdown=()=>{
    setShowDropdown(false);
  }
  const handleLogOut=()=>{
    logOut()
    .then(()=>{})
    .catch((error)=>console.log(error));
  }
    const navLink =(
        <>
        <li className='text-[17px]'>
            <Link to="/">Home</Link>
        </li>
       
        <li className='text-[17px]'>
            <Link to="/allBooks">All Books</Link>
        </li>
        <li className='text-[17px]'>
            <Link to="dashboard/add">Add Book</Link>
        </li>
        {
          user && !isAdmin && (
          <li className='text-[17px]'>
          <Link to="/dashboard">Dashboard</Link>
        </li>
            
          )
        }
        {
          user && isAdmin &&
          (<li className='text-[17px]'>
           <Link to="/dashboard">Dashboard</Link>
          </li>)
        }
        </>
    )
    return (
        <div>
            <div className="navbar bg-base-100 bg-primary-dark">
  <div className="navbar-start">
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h8m-8 6h16" />
        </svg>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow ">
      {navLink}
      </ul>
    </div>
    <img className='w-20 h-22 lg:w-20 lg:h-22 ' src={logo} alt="" />
  </div>
  <div className="navbar-center hidden lg:flex">
    <ul className="menu menu-horizontal px-1">
     {navLink}
    </ul>
  </div>
  <div className="navbar-end">
        {!user ? (
          <Link to="/login">
            <button className="btn bg-primaryColor">SignIn</button>
          </Link>
        ) : (
          <div className="relative">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <img onClick={toggleDropdown} src={user?.photoURL} alt="" />
            </label>
            {showDropdown && (
              <div className="absolute top-full right-0 mt-1 w-52 shadow rounded-md font-bold bg-black text-white z-10">
                <ul className="p-2">
                  {user && <li>{user.displayName}</li>}
                  {isAdmin && (
                    <li onClick={closeDropdown}>
                      <Link to="/dashboard">Dashboard</Link>
                    </li>
                  )}
                 
                  {user && !isAdmin &&  (
                    <li onClick={closeDropdown}>
                      <Link to="/dashboard">Dashboard</Link>
                    </li>
                  )}
                  <li onClick={closeDropdown}>
                    <button onClick={handleLogOut}>LogOut</button>
                  </li>
                 
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
</div>
        </div>
    );
};

export default Navbar;