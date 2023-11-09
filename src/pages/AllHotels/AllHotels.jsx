import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import ResultCard from "../SearchResult/ResultCard";
import { AiOutlineCalendar } from "react-icons/ai";
import { useContext, useEffect, useRef, useState } from "react";
import { format } from "date-fns";
import { DateRange } from "react-date-range";
import { BiErrorCircle } from "react-icons/bi";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../provider/AuthProvider";
import { Helmet } from "react-helmet-async";
import Toggle from "react-toggle";

const AllHotels = () => {
  const { user } = useContext(AuthContext);
  const [axiosSecure] = useAxiosSecure();
  const navigate = useNavigate();
  const { data: hotels = [] } = useQuery(["reserve"], async () => {
    const res = await axiosSecure.get(`/rooms`);
    return res.data;
  });

  const { data: sortedHotels = [] } = useQuery(["sorted-hotels"], async () => {
    const res = await axiosSecure.get(`/sorted-hotels`);
    return res.data;
  });

  const [hotelData, setHotelData] = useState(hotels);


  const [dateError, setDateError] = useState(false);

  const [biscuitReady, setBiscuitReady] = useState(false);

  const handleBiscuitChange = () => {
    setBiscuitReady(!biscuitReady);
  };
  useEffect(() => {
    if (biscuitReady) {
      setHotelData(sortedHotels);
    } else {
      setHotelData(hotels);
    }
  }, [hotels, biscuitReady]);

  // date state
  const [range, setRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  // open close
  const [open, setOpen] = useState(false);

  // get the target element to toggle
  const refOne = useRef(null);

  useEffect(() => {
    // event listeners
    document.addEventListener("keydown", hideOnEscape, true);
    document.addEventListener("click", hideOnClickOutside, true);
  }, []);

  // hide dropdown on ESC press
  const hideOnEscape = (e) => {
    // console.log(e.key)
    if (e.key === "Escape") {
      setOpen(false);
    }
  };

  // Hide on outside click
  const hideOnClickOutside = (e) => {
    // console.log(refOne.current)
    // console.log(e.target)
    if (refOne.current && !refOne.current.contains(e.target)) {
      setOpen(false);
    }
  };

  // Set the minimum selectable date as the current date
  const minSelectableDate = new Date();

  const handleReserve = (room) => {
    setDateError(false);
    if (
      format(range[0].startDate, "dd/MM/yyyy") !==
      format(range[0].endDate, "dd/MM/yyyy")
    ) {
      const startDate = format(range[0].startDate, "dd/MM/yyyy");
      const endDate = format(range[0].endDate, "dd/MM/yyyy");
      Swal.fire({
        title: "Are you sure?",
        text: `Reserving to ${room.hotelName} for ${startDate} to ${endDate}`,
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
              reservedDate: `${startDate} to ${endDate}`,
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
    } else {
      // Date range is not selected
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please Select Date",
      });
      setDateError(true);
    }
  };
  return (
    <div className="py-20">
      <Helmet>
        <title>All Hotels | Travel Stay</title>
      </Helmet>
      <h3 className="text-2xl lg:text-3xl font-semibold text-center mt-10">
        All Hotels
      </h3>
      <div className="space-y-1 lg:w-2/5 lg:mx-auto mt-10 mx-10">
        <h3 className="text-xl lg:text-2xl font-semibold text-center">
          Please Select Date
        </h3>
        <div className="flex justify-between items-center input input-md outline-none input-bordered">
          <div className="text-lg">
            <AiOutlineCalendar />
          </div>
          <div className="w-11/12 relative">
            <input
              type="text"
              name="date"
              value={`${format(range[0].startDate, "dd/MM/yyyy")} to ${format(
                range[0].endDate,
                "dd/MM/yyyy"
              )}`}
              onClick={() => setOpen((open) => !open)}
              className=" h-full border-none outline-none w-full"
            />
            <div ref={refOne}>
              {open && (
                <DateRange
                  onChange={(item) => setRange([item.selection])}
                  editableDateInputs={true}
                  moveRangeOnFirstSelection={false}
                  ranges={range}
                  months={1}
                  direction="horizontal"
                  className="calendarElement"
                  minDate={minSelectableDate} // Set the minimum selectable date
                />
              )}
            </div>
          </div>
        </div>
        {dateError && (
          <span className="text-red-600 flex items-center gap-1">
            <BiErrorCircle /> Please Select Dates
          </span>
        )}
      </div>

      <div className="mt-10 lg:w-3/4 lg:mx-auto mx-10">
        <div className="flex justify-end">
          <form className="flex items-center gap-2">
            <span id="biscuit-label">Filter By Total Guests</span>
            <Toggle
              id="biscuit-status"
              checked={biscuitReady}
              aria-labelledby="biscuit-label"
              onChange={handleBiscuitChange}
            />
          </form>
        </div>
        {hotelData.length ? (
          <div className=" grid lg:grid-cols-3 gap-4 mt-10">
            {hotelData.map((room) => (
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
    </div>
  );
};

export default AllHotels;
