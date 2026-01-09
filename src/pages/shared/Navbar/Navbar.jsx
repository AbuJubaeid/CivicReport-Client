import { Link, NavLink } from "react-router";
import useHook from "../../../hooks/useHook";

const Navbar = () => {
  const {user, signOutFunc} = useHook()

  const handleSignOut = () =>{
    signOutFunc()
    .then()
    .catch(error=>{
      console.log(error)
    })
  }
    const links = <>
    <>
        <li><NavLink className={({ isActive }) =>
                  isActive ? "active-link" : "inactive-link"
                } to="/">Home</NavLink></li>
        <li><NavLink className={({ isActive }) =>
                  isActive ? "active-link" : "inactive-link"
                } to="/about-us">About Us</NavLink></li>
    </>
    
    {
      user &&
      <>
        <li><NavLink className={({ isActive }) =>
                  isActive ? "active-link" : "inactive-link"
                } to="/create-issue">Create Report</NavLink>
        </li>
        <li><NavLink className={({ isActive }) =>
                  isActive ? "active-link" : "inactive-link"
                } to="/dashboard/my-reports">My Reports</NavLink>
        </li>
        <li><NavLink className={({ isActive }) =>
                  isActive ? "active-link" : "inactive-link"
                } to="/dashboard/payment-history">Payment History</NavLink>
        </li>
        <li><NavLink className={({ isActive }) =>
                  isActive ? "active-link" : "inactive-link"
                } to="/staff">Be a staff</NavLink>
        </li>

      </>


    }
    
    </>
    return (
        <div className="navbar bg-base-100 shadow-sm">
  <div className="navbar-start">
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
      </div>
      <ul
        tabIndex="-1"
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
        {links}
      </ul>
    </div>
    <Link to="/" className="text-2xl font-bold" >CivicReport</Link>
  </div>
  <div className="navbar-center hidden lg:flex">
    <ul className="menu menu-horizontal px-1">
      {links}
    </ul>
  </div>
  <div className="navbar-end">
    {
      user? <a onClick={handleSignOut} className="btn">SignOut</a> : 
      <Link className="btn" to="/login">Login</Link>
    }
  </div>
</div>
    );
};

export default Navbar;