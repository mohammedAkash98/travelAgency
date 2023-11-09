import { MdOutlineFileDownloadDone } from "react-icons/md";
import contactBg from "../../assets/images/contact-bg.svg";
import { Helmet } from "react-helmet-async";
const Contact = () => {
  return (
    <div className="py-28 grid lg:grid-cols-2">
      <Helmet>
        <title>Contact | Travel Stay</title>
      </Helmet>
      <div className="flex justify-center items-center">
        <form className="border border-[#003276] p-5 lg:w-3/4 lg:mx-auto mx-10 rounded-md space-y-3">
          <h3 className="text-center text-2xl lg:text-3xl font-semibold">
            Contact Us
          </h3>
          <div className="space-y-1">
            <p>Email Address</p>
            <div className="input input-md outline-none input-bordered">
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                className=" h-full border-none w-11/12 outline-none"
              />
            </div>
          </div>
          <div className="space-y-1">
            <p>Your Message</p>
            <textarea
              placeholder="Type Here..."
              className="textarea textarea-bordered textarea-lg w-full"
            ></textarea>
          </div>
          <div>
            <button className="flex gap-2 justify-center items-center bg-[#003276] px-3 py-3 font-semibold rounded-md transition ease-in-out delay-150 text-white hover:scale-95 hover:bg-[#042656] duration-300 w-full">
              <MdOutlineFileDownloadDone className="text-2xl" />
              Submit
            </button>
          </div>
        </form>
      </div>
      <img src={contactBg} alt="Contact Us" className="mx-auto" />
    </div>
  );
};

export default Contact;
