import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useContext } from "react";
import { AuthContext } from "../../../provider/AuthProvider";
import RoomRow from "../../../components/RoomRow";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";

const ManageRoomsOwner = () => {
  const { user } = useContext(AuthContext);
  const [axiosSecure] = useAxiosSecure();
  const { data: rooms = [], refetch: refetchRooms } = useQuery(
    ["rooms"],
    async () => {
      const res = await axiosSecure.get(`/rooms-owner?email=${user.email}`);
      return res.data;
    }
  );

  console.log(rooms)

  const handleDeleteRoom = (_id) => {
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
          .delete(`/room/${_id}`)
          .then((res) => {
            if (res.data.deletedCount) {
              Swal.fire("Deleted!", "Your file has been deleted.", "success");
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
      }
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
                    handleDeleteRoom={handleDeleteRoom}
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

export default ManageRoomsOwner;
