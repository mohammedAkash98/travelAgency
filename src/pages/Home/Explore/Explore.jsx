import { useForm } from "react-hook-form";
import { FaCity } from "react-icons/fa";
import { BiErrorCircle } from "react-icons/bi";
import { AiOutlineCalendar, AiOutlineSearch } from "react-icons/ai";
/* 
import { addDays } from "date-fns"; */
import { useEffect, useRef, useState } from "react";
import format from "date-fns/format";
// Date Range Picker
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { DateRange } from "react-date-range";
import { useNavigate } from "react-router-dom";

const Explore = () => {
  const [dateError, setDateError] = useState(false);
  const navigate = useNavigate();
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

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    setDateError(false);
    if (
      format(range[0].startDate, "dd/MM/yyyy") !==
      format(range[0].endDate, "dd/MM/yyyy")
    ) {
      // Date range is selected
      const searchData = {
        cityName: data.cityName,
        startDate: format(range[0].startDate, "dd/MM/yyyy"),
        endDate: format(range[0].endDate, "dd/MM/yyyy"),
      };
      navigate("/search", { state: { searchData } });
      reset();
    } else {
      // Date range is not selected
      setDateError(true);
    }
  };

  return (
    <div className="py-20 space-y-5">
      <h3 className="text-2xl lg:text-3xl font-semibold text-center">
        Explore Destinations
      </h3>
      <div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="border p-5 lg:w-3/4 lg:mx-auto mx-10 rounded-md  grid lg:grid-cols-9 gap-4"
        >
          {/* City Name Field */}
          <div className="space-y-1 w-full lg:col-span-4">
            <div className="flex justify-between items-center input input-md outline-none input-bordered">
              <div className="text-lg">
                <FaCity />
              </div>
              <input
                type="text"
                name="cityName"
                {...register("cityName", {
                  required: true,
                  pattern: /^(?!\s*$).+/,
                })}
                placeholder="Where are you going?"
                className=" h-full border-none w-11/12 outline-none"
              />
            </div>
            {errors.cityName && (
              <span className="text-red-600 flex items-center gap-1">
                <BiErrorCircle /> This field is required
              </span>
            )}
          </div>

          {/* Date Range Field */}
          <div className="space-y-1 w-full lg:col-span-4">
            <div className="flex justify-between items-center input input-md outline-none input-bordered">
              <div className="text-lg">
                <AiOutlineCalendar />
              </div>
              <div className="w-11/12 relative">
                <input
                  type="text"
                  name="date"
                  value={`${format(
                    range[0].startDate,
                    "dd/MM/yyyy"
                  )} to ${format(range[0].endDate, "dd/MM/yyyy")}`}
                  readOnly
                  {...register("date", {
                    required: true,
                    pattern: /^(?!\s*$).+/,
                  })}
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

          <div>
            <button className="flex gap-2 justify-center items-center bg-[#003276] px-3 py-3 font-semibold rounded-md transition ease-in-out delay-150 text-white hover:scale-95 hover:bg-[#042656] duration-300 w-full lg:w-min">
              <AiOutlineSearch className="text-2xl" />
              Search
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Explore;
