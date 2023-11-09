import { Helmet } from "react-helmet-async";
import Banner from "../Banner/Banner";
import Explore from "../Explore/Explore";
import FeaturedHotels from "../FeaturedHotels/FeaturedHotels";
import TopCities from "../TopCities/TopCities";

const Home = () => {
  return (
    <div>
      <Helmet>
        <title>Home | Travel Stay</title>
      </Helmet>
      <Banner></Banner>
      <Explore></Explore>
      <TopCities></TopCities>
      <FeaturedHotels></FeaturedHotels>
    </div>
  );
};

export default Home;
