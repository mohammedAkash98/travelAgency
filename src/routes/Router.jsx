import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import Home from "../pages/Home/Home/Home";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import Contact from "../pages/Contact/Contact";
import Login from "../pages/Login/Login";
import Register from "../pages/Login/Register";
import PrivateRoute from "./PrivateRoute";
import Reservations from "../pages/Reservations/Reservations";
import Dashboard from "../layout/Dashboard";
import ManageUsers from "../pages/Dashboard/ManageUsers/ManageUsers";
import AdminRoute from "./AdminRoute";
import OwnerRoute from "./OwnerRoute";
import ManageBookings from "../pages/Dashboard/ManageBookings/ManageBookings";
import AddRoom from "../pages/Dashboard/AddRoom/AddRoom";
import ManageRoomsAdmin from "../pages/Dashboard/ManageRoomsAdmin/ManageRoomsAdmin";
import ManageRoomsOwner from "../pages/Dashboard/ManageRoomsOwner/ManageRoomsOwner";
import UpdateRoom from "../pages/Dashboard/UpdateRoom/UpdateRoom";
import SearchResult from "../pages/SearchResult/SearchResult";
import AllHotels from "../pages/AllHotels/AllHotels";
import ManageBookingsAdmin from "../pages/Dashboard/ManageBookingsAdmin/ManageBookingsAdmin";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "contact",
        element: <Contact></Contact>,
      },
      {
        path: "login",
        element: <Login></Login>,
      },
      {
        path: "register",
        element: <Register></Register>,
      },
      {
        path: "reservations",
        element: (
          <PrivateRoute>
            <Reservations></Reservations>
          </PrivateRoute>
        ),
      },
      {
        path: "search",
        element: (
          <PrivateRoute>
            <SearchResult></SearchResult>
          </PrivateRoute>
        ),
      },
      {
        path: "hotels",
        element: (
          <PrivateRoute>
            <AllHotels></AllHotels>
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <Dashboard></Dashboard>
      </PrivateRoute>
    ),
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: "manage-users",
        element: (
          <AdminRoute>
            <ManageUsers></ManageUsers>
          </AdminRoute>
        ),
      },
      {
        path: "manage-rooms",
        element: (
          <AdminRoute>
            <ManageRoomsAdmin></ManageRoomsAdmin>
          </AdminRoute>
        ),
      },
      {
        path: "manage-bookings",
        element: (
          <AdminRoute>
            <ManageBookingsAdmin></ManageBookingsAdmin>
          </AdminRoute>
        ),
      },
      {
        path: "manage-bookings-owner",
        element: (
          <OwnerRoute>
            <ManageBookings></ManageBookings>
          </OwnerRoute>
        ),
      },
      {
        path: "manage-rooms-owner",
        element: (
          <OwnerRoute>
            <ManageRoomsOwner></ManageRoomsOwner>
          </OwnerRoute>
        ),
      },
      {
        path: "add-a-room",
        element: (
          <OwnerRoute>
            <AddRoom></AddRoom>
          </OwnerRoute>
        ),
      },
      {
        path: "update-room/:id",
        element: (
          <OwnerRoute>
            <UpdateRoom></UpdateRoom>
          </OwnerRoute>
        ),
      },
    ],
  },
]);

export default router;
