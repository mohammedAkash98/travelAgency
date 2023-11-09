import { Link } from "react-router-dom";
import { MdOutlineArrowBack } from "react-icons/md";
import { Helmet } from "react-helmet-async";
const ErrorPage = () => {
  return (
    <div className="flex justify-center items-center">
      <Helmet>
        <title>Error | Travel Stay</title>
      </Helmet>
      <div className="space-y-4">
        <div className="w-full">
          <iframe
            src="https://embed.lottiefiles.com/animation/65664"
            className="w-full h-64 md:h-96"
          ></iframe>
        </div>
        <h3 className="text-2xl lg:text-3xl font-bold text-center">
          Something Went Wrong.
        </h3>
        <Link className="flex justify-center" to={'/'}>
          <button className="px-5 lg:px-10 py-3 mt-5 bg-[#003276] rounded-md text-white font-semibold flex gap-2 items-center">
            <MdOutlineArrowBack className="text-2xl" />
            Back To Home
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;
