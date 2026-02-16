import { Link, NavLink } from "react-router";
import useHook from "../../../hooks/useHook";
import useRole from "../../../hooks/useRole";

const Navbar = () => {
  const { user, signOutFunc } = useHook();
  const { role } = useRole();

  const handleSignOut = () => {
    signOutFunc()
      .then(() => {
        console.log("Signed out");
      })
      .catch((error) => console.log(error));
  };

  const links = (
    <>
      <li>
        <NavLink
          className={({ isActive }) =>
            isActive ? "active-link" : "inactive-link"
          }
          to="/"
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          className={({ isActive }) =>
            isActive ? "active-link" : "inactive-link"
          }
          to="/about-us"
        >
          About Us
        </NavLink>
      </li>
      <li>
        <NavLink
          className={({ isActive }) =>
            isActive ? "active-link" : "inactive-link"
          }
          to="/all-report"
        >
          All Reports
        </NavLink>
      </li>
      <li>
        <NavLink
          className={({ isActive }) =>
            isActive ? "active-link" : "inactive-link"
          }
          to="/impact"
        >
          Impact
        </NavLink>
      </li>

      {user && (
        <li>
          <NavLink
            className={({ isActive }) =>
              isActive ? "active-link" : "inactive-link"
            }
            to="/create-issue"
          >
            Create Report
          </NavLink>
        </li>
      )}
    </>
  );

  return (
    <div className="navbar bg-base-100 shadow-sm px-4 md:px-6">
      {/* Navbar Start */}
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
          >
            {links}
          </ul>
        </div>
        <Link
          to="/"
          className="text-2xl font-bold flex items-center gap-2 ml-2 md:ml-0"
        >
          <img
            className="w-8 h-8"
            src="https://i.ibb.co.com/s9yzFJsz/logo.png"
            alt="logo"
          />
          CivicReport
        </Link>
      </div>

      {/* Navbar Center */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{links}</ul>
      </div>

      {/* Navbar End */}
      <div className="navbar-end">
        {user ? (
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full border-2 border-blue-500">
                <img
                  src={user.photoURL || "/src/assets/image/default-avatar.png"}
                  alt="Profile"
                />
              </div>
            </label>
            <ul
              tabIndex={0}
              className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52 mt-2"
            >
              <li className="font-semibold text-blue-600">
                {user.displayName}
              </li>

              {/* Dashboard sub-dropdown */}
              <li tabIndex={0} className="dropdown dropdown-end">
                <span className="justify-between cursor-pointer">
                  Dashboard
                  <svg
                    className="fill-current"
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                  >
                    <path d="M7 10l5 5 5-5H7z" />
                  </svg>
                </span>
                {/* sub dropdown start  */}
                <ul className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52 mt-0">
                  {/* user role dropdown */}
                  {role === "user" && (
                    <>
                      <li>
                        <NavLink
                          className={({ isActive }) =>
                            `${
                              isActive ? "active-link" : "inactive-link"
                            } is-drawer-close tooltip tooltip-right`
                          }
                          
                          to="/dashboard/my-reports"
                        >
                          <span className="is-drawer-close:hidden">
                            My Reports
                          </span>
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          className={({ isActive }) =>
                            `${
                              isActive ? "active-link" : "inactive-link"
                            } is-drawer-close tooltip tooltip-right`
                          }
                          
                          to="/dashboard/payment-history"
                        >
                          <span className="is-drawer-close:hidden">
                            My Payments
                          </span>
                        </NavLink>
                      </li>
                    </>
                  )}

                  {/* staff route dropdown */}
                  {role === "staff" && (
                    <> 
                      <li>
                        <NavLink
                          className={({ isActive }) =>
                            `${
                              isActive ? "active-link" : "inactive-link"
                            } is-drawer-close tooltip tooltip-right`
                          }
                          
                          to="/dashboard/staff-task"
                        >
                          <span className="is-drawer-close:hidden">
                            Staff Task
                          </span>
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          className={({ isActive }) =>
                            `${
                              isActive ? "active-link" : "inactive-link"
                            } is-drawer-close tooltip tooltip-right`
                          }
                          
                          to="/dashboard/completed-report"
                        >
                          <span className="is-drawer-close:hidden">
                            Completed Report
                          </span>
                        </NavLink>
                      </li>
                    </>
                  )}

                  {/* admin route dropdown */}
                  {role === "admin" && (
                    <>
                      {/* approve staff */}
                      <li>
                        <NavLink
                          className={({ isActive }) =>
                            `${
                              isActive ? "active-link" : "inactive-link"
                            } is-drawer-close tooltip tooltip-right`
                          }
                          
                          to="/dashboard/approve-staff"
                        >
                          <span className="is-drawer-close:hidden">
                            Approve Staff
                          </span>
                        </NavLink>
                      </li>

                      {/* assign staff */}
                      <li>
                        <NavLink
                          className={({ isActive }) =>
                            `${
                              isActive ? "active-link" : "inactive-link"
                            } is-drawer-close tooltip tooltip-right`
                          }
                          
                          to="/dashboard/assign-staff"
                        >
                          <span className="is-drawer-close:hidden">
                            Assign Staff
                          </span>
                        </NavLink>
                      </li>

                      {/* user manager */}
                      <li>
                        <NavLink
                          className={({ isActive }) =>
                            `${
                              isActive ? "active-link" : "inactive-link"
                            } is-drawer-close tooltip tooltip-right`
                          }
                          data-tip="User Manager"
                          to="/dashboard/user-manager"
                        >
                          <span className="is-drawer-close:hidden">
                            User Manager
                          </span>
                        </NavLink>
                      </li>
                    </>
                  )}
                </ul>
                {/* sub dropdown close  */}
              </li>

              <li>
                <button
                  onClick={handleSignOut}
                  className="text-red-500 font-medium"
                >
                  Sign Out
                </button>
              </li>
            </ul>
          </div>
        ) : (
          <Link className="btn" to="/login">
            Login
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
