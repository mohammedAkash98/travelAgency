import { MdOutlineFileDownloadDone } from "react-icons/md";
import loginBg from "../../assets/images/login.svg";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { BiErrorCircle } from "react-icons/bi";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import Swal from "sweetalert2";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../provider/AuthProvider";
import SocialLogin from "../../components/SocialLogin";
import { Helmet } from "react-helmet-async";

const Login = () => {
    const { loginUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const [open, setOpen] = useState(0);
  const [wrongPasswordError, setWrongPasswordError] = useState(false);
  const [notFoundError, setNotFoundError] = useState(false);
  const [inputType, setInputType] = useState("password");

  /* Handling See Password */
  const handleToggle = () => {
    if (open == 0) {
      setOpen(1);
    } else {
      setOpen(0);
    }
    if (!open) {
      setInputType("text");
    } else {
      setInputType("password");
    }
  };
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    loginUser(data.email, data.password)
      .then(() => {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Logged In Successfully",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate(from, { replace: true });
        reset();
      })
      .catch((error) => {
        if (error.message === "Firebase: Error (auth/wrong-password).") {
          setWrongPasswordError(true);
        }
        if (error.message === "Firebase: Error (auth/user-not-found).") {
          setNotFoundError(true);
        }
      });
  };
  return (
    <div className="py-28 grid lg:grid-cols-2 gap-8">
      <Helmet>
        <title>Login | Travel Stay</title>
      </Helmet>
      <div className="lg:flex lg:justify-center lg:items-center">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="border border-[#003276] p-5 lg:w-3/4 lg:mx-auto mx-10 rounded-md space-y-3"
        >
          <h3 className="text-center text-2xl lg:text-3xl font-semibold">
            Please Login
          </h3>
          {/* Email Field */}
          <div className="space-y-1">
            <p className="font-semibold">Email Address</p>
            <div className="input input-md outline-none input-bordered">
              <input
                type="email"
                name="email"
                {...register("email", { required: true })}
                placeholder="Email Address"
                className=" h-full border-none w-11/12 outline-none"
              />
            </div>
            {errors.email && (
              <span className="text-red-600 flex items-center gap-1">
                <BiErrorCircle /> This field is required
              </span>
            )}
          </div>
          {/* Password Field */}
          <div className="space-y-1">
            <p className="font-semibold">Password</p>
            <div className="flex justify-between items-center input input-md outline-none input-bordered">
              <input
                type={inputType}
                name="password"
                {...register("password", {
                  required: true,
                  minLength: 6,
                  maxLength: 20,
                  pattern: /^(?=.*?[A-Z])(?=.*?[#?!@$%^&*-]).{6,}$/,
                })}
                placeholder="Password (Must have to more than 6 characters)"
                id="password"
                className=" h-full border-none w-11/12 outline-none"
              />
              <div className="text-lg">
                <AiFillEye
                  onClick={handleToggle}
                  className={!open ? "" : "hidden"}
                />
                <AiFillEyeInvisible
                  onClick={handleToggle}
                  className={!open ? "hidden" : ""}
                />
              </div>
            </div>
            {errors.password?.type === "required" && (
              <p className="text-red-600 flex items-center gap-1">
                <BiErrorCircle /> Password is required
              </p>
            )}
            {errors.password?.type === "minLength" && (
              <p className="text-red-600 flex items-center gap-1">
                <BiErrorCircle /> Password must be 6 characters.
              </p>
            )}
            {errors.password?.type === "maxLength" && (
              <p className="text-red-600 flex items-center gap-1">
                <BiErrorCircle /> Password must be less or equal than 20
                characters.
              </p>
            )}
            {errors.password?.type === "pattern" && (
              <p className="text-red-600 flex items-baseline gap-1">
                <BiErrorCircle />
                Password must contain at least one upppercase and one special
                character.
              </p>
            )}
            {wrongPasswordError && (
              <p className="text-red-600 flex items-baseline gap-1">
                <BiErrorCircle />
                Wrong Password.
              </p>
            )}
            {notFoundError && (
              <p className="text-red-600 flex items-baseline gap-1">
                <BiErrorCircle />
                User Not Found.
              </p>
            )}
          </div>
          {/* Submit Button */}
          <div>
            <button className="flex gap-2 justify-center items-center bg-[#003276] px-3 py-3 font-semibold rounded-md transition ease-in-out delay-150 text-white hover:scale-95 hover:bg-[#042656] duration-300 w-full">
              <MdOutlineFileDownloadDone className="text-2xl" />
              Submit
            </button>
          </div>
          <div>
            Don&apos;t have an account?{" "}
            <Link to={"/register"} className="underline text-[#003276]">
              Register
            </Link>
          </div>
          <div className="divider"></div>
          <SocialLogin></SocialLogin>
        </form>
      </div>
      <img
        src={loginBg}
        alt="Contact Us"
        className="lg:mx-auto px-10 lg:px-0"
      />
    </div>
  );
};

export default Login;
