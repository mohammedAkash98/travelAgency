import { MdTravelExplore } from "react-icons/md";
import { Typewriter } from "react-simple-typewriter";

const Banner = () => {
  return (
    <div className="h-screen banner flex justify-center items-center text-white px-10">
      <div className="space-y-3">
        <h3 className="lg:text-5xl text-3xl font-bold text-center">
          Travel is{" "}
          <span className="text-[#003276]">
            <Typewriter
              words={[
                "Adventure",
                "Freedom",
                "Discovery",
                "Escape",
                "Evolution",
              ]}
              loop={true}
              cursor
              cursorStyle="|"
              typeSpeed={70}
              deleteSpeed={50}
              delaySpeed={1000}
            />
          </span>
        </h3>
        <p className="text-lg lg:w-3/4 lg:mx-auto text-justify lg:text-center font-medium">
          Embark on a journey of self-discovery and exhilarating experiences.
          Unleash your wanderlust, embrace adventure, and indulge in the freedom
          of travel. Let travel be your canvas for personal expression, a
          gateway to art, style, and a revolution of the soul.
        </p>
        <button className="px-5 lg:px-10 py-3 bg-[#003276] rounded-md text-white font-semibold flex gap-2 items-center justify-center transition ease-in-out delay-150 hover:scale-95 hover:bg-[#042656] duration-300 mx-auto">
          <MdTravelExplore className="text-2xl" />
          Find Rooms
        </button>
      </div>
    </div>
  );
};

export default Banner;
