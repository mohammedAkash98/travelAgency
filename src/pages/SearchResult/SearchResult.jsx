import { useLocation, useNavigate } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useContext, useEffect, useState } from "react";
import ResultCard from "./ResultCard";
import { AuthContext } from "../../provider/AuthProvider";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";

const SearchResult = () => {
  const { user } = useContext(AuthContext);
  const location = useLocation();
  const { searchData } = location.state || "";

  const navigate = useNavigate();

  const [axiosSecure] = useAxiosSecure();

  const [rooms, setRooms] = useState([]);

  const search = searchData?.cityName || "";

  useEffect(() => {
    axiosSecure
      .get(`/search?city=${search}`)
      .then((res) => {
        setRooms(res.data);
      })
      .catch(() => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
        });
      });
  }, []);

  const handleReserve = (room) => {
    Swal.fire({
      title: "Are you sure?",
      text: `Reserving to ${room.hotelName} for ${searchData.startDate} to ${searchData.endDate}`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes!",
    })
      .then((result) => {
        if (result.isConfirmed) {
          const reservedRoom = {
            roomId: room._id,
            hotelName: room.hotelName,
            price: room.price,
            userEmail: user.email,
            ownerEmail: room.ownerEmail,
            reservedDate: `${searchData.startDate} to ${searchData.endDate}`,
            status: "pending",
          };

          axiosSecure.post("/reserve", reservedRoom).then((res) => {
            if (res.data.insertedId) {
              Swal.fire(
                "Reserved!",
                "Your reservation has been saved.",
                "success"
              );
            }
            navigate("/reservations");
          });
        }
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
    <div className="py-20">
      <Helmet>
        <title>Search Result | Travel Stay</title>
      </Helmet>
      <h3 className="text-2xl lg:text-3xl font-semibold text-center mt-10">
        Search Result for {searchData?.cityName}
      </h3>

      {rooms.length ? (
        <div className="lg:w-3/4 lg:mx-auto mx-10 grid lg:grid-cols-3 gap-4 mt-10">
          {rooms.map((room) => (
            <ResultCard
              key={room._id}
              room={room}
              handleReserve={handleReserve}
            ></ResultCard>
          ))}
        </div>
      ) : (
        <h3 className="text-xl lg:text-2xl font-semibold text-center mt-10">
          No Data Found
        </h3>
      )}
    </div>
  );
};

export default SearchResult;
