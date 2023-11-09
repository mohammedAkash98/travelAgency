import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useForm } from "react-hook-form";
import { BiErrorCircle, BiLogIn } from "react-icons/bi";
import { AuthContext } from "../../../provider/AuthProvider";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";

const UpdateRoom = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [loadedRoomData, setLoadedRoomData] = useState({});

  const location = useLocation();
  const pathname = location.pathname;

  // Extract the ID from the pathname
  const id = pathname.substring(pathname.lastIndexOf("/") + 1);

  const [axiosSecure] = useAxiosSecure();
  useEffect(() => {
    axiosSecure.get(`/room/${id}`).then((res) => {
      setLoadedRoomData(res.data);
    });
  }, []);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const roomData = {
      ...data,
      ownerName: user.displayName,
      ownerEmail: user.email,
      totalNumberOfGuest: 0,
      status: "pending",
    };
    axiosSecure
      .patch(`/room/${id}`, roomData)
      .then((res) => {
        if (res.data.modifiedCount) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Room Has Been Updated.",
            showConfirmButton: false,
            timer: 1500,
          });
        }
        reset();
        navigate('/dashboard/manage-rooms-owner')
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
        <title>Update Room | Travel Stay</title>
      </Helmet>
      <h3 className="text-2xl lg:text-3xl font-semibold text-center">
        Manage Rooms
      </h3>
      <div className="mt-10">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="border p-5 lg:w-3/4 mx-10 lg:mx-auto rounded-lg mt-10 grid lg:grid-cols-2 gap-4"
        >
          {/* Hotel Name Field */}
          <div className="space-y-1">
            <p className="font-semibold">Hotel Name</p>
            <div className="input input-md outline-none input-bordered">
              <input
                type="text"
                name="hotelName"
                defaultValue={loadedRoomData.hotelName}
                {...register("hotelName", {
                  required: true,
                  pattern: /^(?!\s*$).+/,
                })}
                placeholder="Hotel Name"
                className=" h-full border-none w-full outline-none"
              />
            </div>
            {errors.hotelName && (
              <span className="text-red-600 flex items-center gap-1">
                <BiErrorCircle /> This field is required
              </span>
            )}
          </div>

          {/* Hotel Type Field */}
          <div className="space-y-1">
            <p className="font-semibold">Hotel Type</p>
            <div className="input input-md outline-none input-bordered">
              <input
                type="text"
                name="hotelType"
                defaultValue={loadedRoomData.hotelType}
                {...register("hotelType", {
                  required: true,
                  pattern: /^(?!\s*$).+/,
                })}
                placeholder="Hotel Type"
                className=" h-full border-none w-full outline-none"
              />
            </div>
            {errors.hotelType && (
              <span className="text-red-600 flex items-center gap-1">
                <BiErrorCircle /> This field is required
              </span>
            )}
          </div>

          {/* City Field */}
          <div className="space-y-1">
            <p className="font-semibold">City</p>
            <div className="input input-md outline-none input-bordered">
              <input
                type="text"
                name="city"
                defaultValue={loadedRoomData.city}
                {...register("city", {
                  required: true,
                  pattern: /^(?!\s*$).+/,
                })}
                placeholder="Enter The City Name"
                className=" h-full border-none w-full outline-none"
              />
            </div>
            {errors.city && (
              <span className="text-red-600 flex items-center gap-1">
                <BiErrorCircle /> This field is required
              </span>
            )}
          </div>

          {/* Address Field */}
          <div className="space-y-1">
            <p className="font-semibold">Hotel Address</p>
            <div className="input input-md outline-none input-bordered">
              <input
                type="text"
                name="address"
                defaultValue={loadedRoomData.address}
                {...register("address", {
                  required: true,
                  pattern: /^(?!\s*$).+/,
                })}
                placeholder="Hotel Address"
                className=" h-full border-none w-full outline-none"
              />
            </div>
            {errors.address && (
              <span className="text-red-600 flex items-center gap-1">
                <BiErrorCircle /> This field is required
              </span>
            )}
          </div>

          {/* Photo URL Field */}
          <div className="space-y-1">
            <p className="font-semibold">Photo URL</p>
            <div className="input input-md outline-none input-bordered">
              <input
                type="text"
                name="photoURL"
                defaultValue={loadedRoomData.photoURL}
                {...register("photoURL", {
                  required: true,
                  pattern: /^(?!\s*$).+/,
                })}
                placeholder="Photo URL"
                className=" h-full border-none w-full outline-none"
              />
            </div>
            {errors.photoURL && (
              <span className="text-red-600 flex items-center gap-1">
                <BiErrorCircle /> This field is required
              </span>
            )}
          </div>

          {/* Max People Field */}
          <div className="space-y-1">
            <p className="font-semibold">Max People</p>
            <div className="input input-md outline-none input-bordered">
              <input
                type="number"
                name="maxPeople"
                defaultValue={loadedRoomData.maxPeople}
                {...register("maxPeople", {
                  required: true,
                  pattern: /[1-9]/,
                })}
                placeholder="Max People"
                className=" h-full border-none w-full outline-none"
              />
            </div>
            {errors.maxPeople && (
              <span className="text-red-600 flex items-center gap-1">
                <BiErrorCircle /> This field is required
              </span>
            )}
          </div>

          {/* Room Description Field */}
          <div className="space-y-1 lg:col-span-2">
            <p className="font-semibold">Room Description</p>
            <div className="input input-md outline-none input-bordered">
              <textarea
                name="roomDescription"
                defaultValue={loadedRoomData.roomDescription}
                {...register("roomDescription", {
                  required: true,
                  pattern: /^(?!\s*$).+/,
                })}
                placeholder="Type Here..."
                className="h-full border-none w-full outline-none"
              ></textarea>
            </div>
            {errors.roomDescription && (
              <span className="text-red-600 flex items-center gap-1">
                <BiErrorCircle /> This field is required
              </span>
            )}
          </div>

          <button className="btn btn-outline flex gap-2 justify-center items-center bg-[#003276] font-semibold rounded-md transition ease-in-out delay-150 hover:bg-[#042656] duration-300 w-full text-white lg:col-span-2">
            <BiLogIn className="text-2xl" />
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateRoom;
