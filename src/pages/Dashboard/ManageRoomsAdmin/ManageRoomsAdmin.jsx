import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import RoomRow from "../../../components/RoomRow";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";

const ManageRoomsAdmin = () => {
  const [axiosSecure] = useAxiosSecure();
  const { data: rooms = [], refetch: refetchRooms } = useQuery(
    ["all-rooms"],
    async () => {
      const res = await axiosSecure.get("/all-rooms");
      return res.data;
    }
  );


  const handleApprove = (_id) => {
    axiosSecure
      .patch(`/all-rooms/${_id}?status=approved`)
      .then((res) => {
        if (res.data.modifiedCount) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Room Has Been Approved.",
            showConfirmButton: false,
            timer: 1500,
          });
        }
        refetchRooms();
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
      .patch(`/all-rooms/${_id}?status=denied`)
      .then((res) => {
        if (res.data.modifiedCount) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Room Has Been Denied.",
            showConfirmButton: false,
            timer: 1500,
          });
        }
        refetchRooms();
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
    <div className="py-20 lg:py-10">
      <Helmet>
        <title>Manage Rooms | Travel Stay</title>
      </Helmet>
      <h3 className="text-2xl lg:text-3xl font-semibold text-center">
        Manage Rooms
      </h3>
      <div className="mt-10 lg:w-3/4 lg:mx-auto mx-10">
        {rooms.length ? (
          <div className="overflow-x-auto">
            <table className="table">
              {/* head */}
              <thead>
                <tr>
                  <th>No.</th>
                  <th>Room Details</th>
                  <th>Type</th>
                  <th>City</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {rooms.map((singleRoom, index) => (
                  <RoomRow
                    key={singleRoom._id}
                    singleRoom={singleRoom}
                    index={index}
                    handleApprove={handleApprove}
                    handleDeny={handleDeny}
                  ></RoomRow>
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

export default ManageRoomsAdmin;
