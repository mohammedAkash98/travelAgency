import { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import HotelCard from "./HotelCard";
import { Link } from "react-router-dom";
import { CiCircleMore } from "react-icons/ci";

const FeaturedHotels = () => {
  const [axiosSecure] = useAxiosSecure();

  const [hotels, setHotels] = useState([]);

  useEffect(() => {
    axiosSecure
      .get("/featured-hotels")
      .then((res) => {
        setHotels(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="my-20">
      <h3 className="text-2xl lg:text-3xl font-semibold text-center">
        Featured Hotels
      </h3>
      <div className="lg:w-3/4 lg:mx-auto mx-10 grid lg:grid-cols-3 gap-4 mt-10">
        {hotels.map((hotel) => (
          <HotelCard key={hotel._id} hotel={hotel}></HotelCard>
        ))}
      </div>
      <Link to={'/hotels'}>
        <button className="px-5 lg:px-10 py-3 bg-[#003276] rounded-md text-white font-semibold flex gap-2 items-center justify-center transition ease-in-out delay-150 hover:scale-95 hover:bg-[#042656] duration-300 mx-auto mt-5">
          <CiCircleMore className="text-2xl" />
          View All Hotels
        </button>
      </Link>
    </div>
  );
};

export default FeaturedHotels;
