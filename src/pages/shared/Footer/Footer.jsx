import logo from "../../../assets/images/travel-stay-logo.png";
const Footer = () => {
  return (
    <div className=" border-t-2">
      <footer className="footer p-10 bg-white text-base-content ">
        <div className="flex flex-col h-20 gap-2">
          <img className="h-full" src={logo} alt="Travel Stay Logo" />
          <h2 className=" text-2xl lg:text-3xl font-bold">
            Travel <span className="text-[#003276]">Stay</span>
          </h2>
        </div>
        <div>
          <span className="footer-title">Services</span>
          <a className="link link-hover">Branding</a>
          <a className="link link-hover">Design</a>
          <a className="link link-hover">Marketing</a>
          <a className="link link-hover">Advertisement</a>
        </div>
        <div>
          <span className="footer-title">Company</span>
          <a className="link link-hover">About us</a>
          <a className="link link-hover">Contact</a>
          <a className="link link-hover">Jobs</a>
          <a className="link link-hover">Press kit</a>
        </div>
        <div>
          <span className="footer-title">Legal</span>
          <a className="link link-hover">Terms of use</a>
          <a className="link link-hover">Privacy policy</a>
          <a className="link link-hover">Cookie policy</a>
        </div>
      </footer>
      <div className="divider py-5"></div>
      <div className="footer pb-10 footer-center text-base-content">
        <div>
          <p className="font-semibold">Copyright © 2023 - All right reserved by Travel Stay.</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
