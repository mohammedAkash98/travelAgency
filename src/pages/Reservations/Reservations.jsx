import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useContext } from "react";
import { AuthContext } from "../../provider/AuthProvider";
import ReservationRow from "./ReservationRow";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";

const Reservations = () => {
  const { user } = useContext(AuthContext);
  const [axiosSecure] = useAxiosSecure();
  const { data: reservations = [], refetch: refetchReservations } = useQuery(
    ["reserve"],
    async () => {
      const res = await axiosSecure.get(`/reserve?email=${user.email}`);
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
          .delete(`/reserve/${_id}`)
          .then((res) => {
            if (res.data.deletedCount) {
              Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Reservation Has Been Cancelled.",
                showConfirmButton: false,
                timer: 1500,
              });
            }
            refetchReservations();
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
    <div className="py-28">
      <Helmet>
        <title>Reservations | Travel Stay</title>
      </Helmet>
      <h2 className="text-2xl lg:text-3xl font-semibold text-center">
        Your Reservations
      </h2>
      <div className="mt-10 lg:w-3/4 lg:mx-auto mx-10">
        {reservations.length ? (
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
                {reservations.map((singleData, index) => (
                  <ReservationRow
                    key={singleData._id}
                    index={index}
                    singleData={singleData}
                    handleDelete={handleDelete}
                  ></ReservationRow>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <h3 className="mt-5 text-xl lg:text-2xl font-semibold text-center">
            No Data Found
          </h3>
        )}
      </div>
    </div>
  );
};

export default Reservations;
