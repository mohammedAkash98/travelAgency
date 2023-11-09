import { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import CityCard from "./CityCard";

const TopCities = () => {
  const imageUrls = [
    "https://i.ibb.co/WWXcmGs/dubai.jpg",
    "https://i.ibb.co/jJ2yW80/venice.jpg",
    "https://i.ibb.co/tYY07NX/new-york.jpg",
  ];
  const [topCities, setTopCities] = useState([]);
  const [axiosSecure] = useAxiosSecure();
  useEffect(() => {
    axiosSecure.get("/top-cities").then((res) => {
      setTopCities(res.data);
    });
  }, []);
  return (
    <div className="">
      <h3 className="text-2xl lg:text-3xl font-semibold text-center">
        Top Cities
      </h3>
      <div className="lg:w-3/4 lg:mx-auto mx-10 grid lg:grid-cols-3 gap-4 mt-10">
        {topCities.map((city, index) => (
          <CityCard
            key={city._id}
            city={city}
            imageUrl={imageUrls[index]}
          ></CityCard>
        ))}
      </div>
    </div>
  );
};

export default TopCities;
