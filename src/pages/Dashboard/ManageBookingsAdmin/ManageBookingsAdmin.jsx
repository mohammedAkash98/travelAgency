import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import BookingRow from "../ManageBookings/BookingRow";
import { Helmet } from "react-helmet-async";

const ManageBookingsAdmin = () => {
  const [axiosSecure] = useAxiosSecure();
  const { data: bookings = [], refetch: refetchBookings } = useQuery(
    ["reservations"],
    async () => {
      const res = await axiosSecure.get(`/reservations`);
      return res.data;
    }
  );

  const handleDelete = (_id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .delete(`/reservations/${_id}`)
          .then((res) => {
            if (res.data.deletedCount) {
              Swal.fire("Deleted!", "Your file has been deleted.", "success");
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
      }
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
                    handleDelete={handleDelete}
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

export default ManageBookingsAdmin;
