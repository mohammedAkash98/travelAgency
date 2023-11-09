import { Link, NavLink } from "react-router-dom";
import logo from "../../../assets/images/travel-stay-logo.png";
import { MdLogin } from "react-icons/md";
import { useContext } from "react";
import { AuthContext } from "../../../provider/AuthProvider";
import { BiLogOut } from "react-icons/bi";
import avatarIcon from "../../../assets/images/avatar-icon.png";
import Swal from "sweetalert2";
import { Tooltip } from "react-tooltip";
import useAdmin from "../../../hooks/useAdmin";
import useOwner from "../../../hooks/useOwner";

const NavBar = () => {
  const { user, logOut } = useContext(AuthContext);

  const [isAdmin] = useAdmin();
  const [isOwner] = useOwner();

  const handleLogout = () => {
    logOut()
      .then(() => {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Logged Out Successfully",
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .catch((error) => console.log(error));
  };
  const navOptions = (
    <>
      <li>
        <NavLink
          to={"/"}
          className={({ isActive }) =>
            isActive
              ? "active-link hover:bg-[#003276] hover:text-white"
              : "hover:bg-[#003276] hover:text-white"
          }
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to={"/hotels"}
          className={({ isActive }) =>
            isActive
              ? "active-link hover:bg-[#003276] hover:text-white"
              : "hover:bg-[#003276] hover:text-white"
          }
        >
          All Hotels
        </NavLink>
      </li>
      <li>
        <NavLink
          to={"/contact"}
          className={({ isActive }) =>
            isActive
              ? "active-link hover:bg-[#003276] hover:text-white"
              : "hover:bg-[#003276] hover:text-white"
          }
        >
          Contact
        </NavLink>
      </li>
      {user &&
        (isAdmin ? (
          <li>
            <NavLink
              to={"/dashboard/manage-users"}
              className={({ isActive }) =>
                isActive
                  ? "active-link hover:bg-[#003276] hover:text-white"
                  : "hover:bg-[#003276] hover:text-white"
              }
            >
              Dashboard
            </NavLink>
          </li>
        ) : isOwner ? (
          <li>
            <NavLink
              to={"/dashboard/manage-bookings-owner"}
              className={({ isActive }) =>
                isActive
                  ? "active-link hover:bg-[#003276] hover:text-white"
                  : "hover:bg-[#003276] hover:text-white"
              }
            >
              Dashboard
            </NavLink>
          </li>
        ) : (
          <li>
            <NavLink
              to={"/reservations"}
              className={({ isActive }) =>
                isActive
                  ? "active-link hover:bg-[#003276] hover:text-white"
                  : "hover:bg-[#003276] hover:text-white"
              }
            >
              Reservations
            </NavLink>
          </li>
        ))}
    </>
  );
  return (
    <div className="navbar lg:px-10 fixed z-10 bg-white bg-opacity-70 border-b-[1px] border-black">
      <Tooltip id="my-tooltip" />
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
            {navOptions}
          </ul>
        </div>
        {/* Company Logo */}
        <div className="flex h-4 lg:h-12 items-center justify-center gap-2">
          <img className="h-full" src={logo} alt="Travel Stay Logo" />
          <h2 className="lg:text-3xl font-bold">
            Travel <span className="text-[#003276]">Stay</span>
          </h2>
        </div>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{navOptions}</ul>
      </div>
      <div className="navbar-end">
        {user ? (
          <div className="flex gap-2">
            {user?.photoURL ? (
              <div className="avatar placeholder">
                <div className="bg-[#003276] text-neutral-content rounded-full w-12">
                  <img
                    src={user.photoURL}
                    alt="user photo"
                    data-tooltip-id="my-tooltip"
                    data-tooltip-content={
                      user.displayName ? user.displayName : "No Name Added"
                    }
                  />
                </div>
              </div>
            ) : (
              <div className="avatar placeholder">
                <div className="bg-[#003276] text-neutral-content rounded-full w-12">
                  <img
                    src={avatarIcon}
                    alt=""
                    className="p-2"
                    data-tooltip-id="my-tooltip"
                    data-tooltip-content={
                      user.displayName ? user.displayName : "No Name Added"
                    }
                  />
                </div>
              </div>
            )}

            <button
              onClick={handleLogout}
              className="px-5 lg:px-10 py-3 bg-[#003276] rounded-md text-white font-semibold flex gap-2 items-center justify-center transition ease-in-out delay-150 hover:scale-95 hover:bg-[#042656] duration-300"
            >
              <BiLogOut className="text-2xl" />
              Logout
            </button>
          </div>
        ) : (
          <Link to={"/login"}>
            <button className="px-5 lg:px-10 py-3 bg-[#003276] rounded-md text-white font-semibold flex gap-2 items-center justify-center transition ease-in-out delay-150 hover:scale-95 hover:bg-[#042656] duration-300">
              <MdLogin className="text-2xl" />
              Login
            </button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default NavBar;
