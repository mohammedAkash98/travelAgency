import { NavLink, Outlet } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";
import Swal from "sweetalert2";
import useAdmin from "../hooks/useAdmin";
import useOwner from "../hooks/useOwner";
import { FaHotel, FaUsersCog } from "react-icons/fa";
import { AiOutlineFileAdd, AiOutlineHome } from "react-icons/ai";
import { BiLogOut } from "react-icons/bi";
import { GrContact } from "react-icons/gr";

import logo from "../assets/images/travel-stay-logo.png";
import { MdManageHistory, MdOutlineDocumentScanner } from "react-icons/md";

const Dashboard = () => {
  const { logOut } = useContext(AuthContext);
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
  const [isAdmin] = useAdmin();
  const [isOwner] = useOwner();
  const navOptions = (
    <>
      <li>
        <div className="flex h-4 lg:h-12 items-center gap-2">
          <img className="h-full" src={logo} alt="Travel Stay Logo" />
          <h2 className="lg:text-3xl font-bold">
            Travel <span className="text-[#003276]">Stay</span>
          </h2>
        </div>
      </li>
      {isAdmin ? (
        <>
          <li>
            <NavLink
              to={"/dashboard/manage-users"}
              className={({ isActive }) => (isActive ? "active-link" : "")}
            >
              <FaUsersCog className="text-lg" />
              Manage Users
            </NavLink>
          </li>
          <li>
            <NavLink
              to={"/dashboard/manage-rooms"}
              className={({ isActive }) => (isActive ? "active-link" : "")}
            >
              <FaHotel className="text-lg" />
              Manage Rooms
            </NavLink>
          </li>
          <li>
            <NavLink
              to={"/dashboard/manage-bookings"}
              className={({ isActive }) => (isActive ? "active-link" : "")}
            >
              <MdOutlineDocumentScanner className="text-lg" />
              Manage Bookings
            </NavLink>
          </li>
        </>
      ) : (
        isOwner && (
          <>
            <li>
              <NavLink
                to={"/dashboard/manage-bookings-owner"}
                className={({ isActive }) => (isActive ? "active-link" : "")}
              >
                <MdManageHistory className="text-lg" />
                Manage Bookings
              </NavLink>
            </li>
            <li>
              <NavLink
                to={"/dashboard/manage-rooms-owner"}
                className={({ isActive }) => (isActive ? "active-link" : "")}
              >
                <FaHotel className="text-lg" />
                Manage Rooms
              </NavLink>
            </li>
            <li>
              <NavLink
                to={"/dashboard/add-a-room"}
                className={({ isActive }) => (isActive ? "active-link" : "")}
              >
                <AiOutlineFileAdd className="text-lg" />
                Add A Room
              </NavLink>
            </li>
          </>
        )
      )}
      <div className="divider"></div>
      <>
        <li>
          <NavLink
            to={"/"}
            className={({ isActive }) => (isActive ? "active-link" : "")}
          >
            <AiOutlineHome className="text-lg" />
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to={"/hotels"}
            className={({ isActive }) => (isActive ? "active-link" : "")}
          >
            <AiOutlineHome className="text-lg" />
            All Hotels
          </NavLink>
        </li>
        <li>
          <NavLink
            to={"/contact"}
            className={({ isActive }) => (isActive ? "active-link" : "")}
          >
            <GrContact className="text-lg" />
            Contact
          </NavLink>
        </li>
      </>
      <div className="divider"></div>
      <button
        onClick={handleLogout}
        className="ms-3 px-5 lg:px-10 py-3 bg-[#003276] rounded-md text-white font-semibold flex gap-2 items-center justify-center transition ease-in-out delay-150 hover:scale-95 hover:bg-[#042656] duration-300"
      >
        <BiLogOut className="text-2xl" />
        Logout
      </button>
    </>
  );
  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        {/* Page content here */}
        <Outlet />
        <label htmlFor="my-drawer-2" className="drawer-button lg:hidden">
          <GiHamburgerMenu
            htmlFor="my-drawer-2"
            className="drawer-button lg:hidden text-5xl p-2 rounded-md bg-[#CDC7F8] m-2 fixed top-0"
          />
        </label>
      </div>
      <div className="drawer-side">
        <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
        <ul className="menu p-4 w-80 h-full bg-base-200 text-base-content space-y-4">
          {/* Sidebar content here */}
          {navOptions}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
