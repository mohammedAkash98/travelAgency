import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useContext } from "react";
import { AuthContext } from "../../../provider/AuthProvider";
import BookingRow from "./BookingRow";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";

const ManageBookings = () => {
  const { user } = useContext(AuthContext);
  const [axiosSecure] = useAxiosSecure();
  const { data: bookings = [], refetch: refetchBookings } = useQuery(
    ["reserve-owners"],
    async () => {
      const res = await axiosSecure.get(`/reserve-owners?email=${user.email}`);
      return res.data;
    }
  );

  const handleApprove = (_id) => {
    axiosSecure
      .patch(`reserve-owners/${_id}?status=approved`)
      .then((res) => {
        if (res.data.modifiedCount) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Reservation Has Been Approved.",
            showConfirmButton: false,
            timer: 1500,
          });
        }
        refetchBookings();
      })
      .catch(() => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
        });
      });
  };

  const handleDeny = (_id) => {
    axiosSecure
      .patch(`reserve-owners/${_id}?status=denied`)
      .then((res) => {
        if (res.data.modifiedCount) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Reservation Has Been Denied.",
            showConfirmButton: false,
            timer: 1500,
          });
        }
        refetchBookings();
      })
      .catch(() => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
        });
      });
  };

  return (
    <div className="pt-20 lg:pt-10 text-center">
      <Helmet>
        <title>Manage Bookings | Travel Stay</title>
      </Helmet>
      <h3 className="text-2xl lg:text-3xl font-semibold">Manage Bookings</h3>
      <div className="mt-10 lg:w-3/4 lg:mx-auto mx-10">
        {bookings.length !== 0 ? (
          <div className="overflow-x-auto">
            <table className="table">
              {/* head */}
              <thead>
                <tr>
                  <th>No.</th>
                  <th>Hotel Name</th>
                  <th>Price</th>
                  <th>Reserved Date</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((singleBooking, index) => (
                  <BookingRow
                    key={singleBooking._id}
                    singleBooking={singleBooking}
                    index={index}
                    handleApprove={handleApprove}
                    handleDeny={handleDeny}
                  ></BookingRow>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <h3 className="mt-5 text-xl lg:text-2xl font-semibold">
            No Data Found
          </h3>
        )}
      </div>
    </div>
  );
};

export default ManageBookings;
