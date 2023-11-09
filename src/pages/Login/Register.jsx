import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { BiErrorCircle } from "react-icons/bi";
import { MdOutlineFileDownloadDone } from "react-icons/md";
import { Link, useLocation, useNavigate } from "react-router-dom";
import registerBg from "../../assets/images/registration.svg";
import { AuthContext } from "../../provider/AuthProvider";
import Swal from "sweetalert2";
import SocialLogin from "../../components/SocialLogin";
import { Helmet } from "react-helmet-async";

const Register = () => {
  const [open, setOpen] = useState(0);
  const [inputType, setInputType] = useState("password");
  const navigate = useNavigate();
  const location = useLocation();
  const from = location?.state?.from?.pathname || "/";

  const { createUser, updateUserProfile } = useContext(AuthContext);

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
    createUser(data.email, data.password)
      .then(() => {
        updateUserProfile(data.name, data.photo)
          .then(() => {
            const savedUser = {
              name: data.name,
              email: data.email,
              photo: data.photo,
              role: "user",
            };
            fetch("https://travel-stay-server.vercel.app/users", {
              method: "POST",
              headers: { "content-type": "application/json" },
              body: JSON.stringify(savedUser),
            })
              .then((res) => res.json())
              .then((data) => {
                if (data.insertedId) {
                  reset();
                }
              });
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Signed Up Successfully",
              showConfirmButton: false,
              timer: 1500,
            });

            navigate(from, { replace: true });
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log("Error:", errorCode, "Error Message:", errorMessage);
        if (errorCode === "auth/email-already-in-use") {
          Swal.fire({
            title: "Error!",
            text: "This Email Already In Use.",
            icon: "error",
            confirmButtonText: "Got It",
          });
        }
      });
  };
  return (
    <div className="py-28 grid lg:grid-cols-2 gap-8">
      <Helmet>
        <title>Register | Travel Stay</title>
      </Helmet>
      <div className="lg:flex lg:justify-center lg:items-center">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="border border-[#003276] p-5 lg:w-3/4 lg:mx-auto mx-10 rounded-md space-y-3"
        >
          <h3 className="text-center text-2xl lg:text-3xl font-semibold">
            Please Register
          </h3>
          {/* Name Field */}
          <div className="space-y-1">
            <p className="font-semibold">Your Name</p>
            <div className="input input-md outline-none input-bordered">
              <input
                type="text"
                name="name"
                {...register("name")}
                placeholder="Your Full Name"
                className=" h-full border-none w-11/12 outline-none"
              />
            </div>
          </div>
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
          </div>

          {/* Photo URL Field */}
          <div className="space-y-1">
            <p className="font-semibold">Photo URL</p>
            <div className="input input-md outline-none input-bordered">
              <input
                type="text"
                name="photo"
                {...register("photo")}
                placeholder="Enter Photo URL"
                className=" h-full border-none w-11/12 outline-none"
              />
            </div>
          </div>
          {/* Submit Button */}
          <div>
            <button className="flex gap-2 justify-center items-center bg-[#003276] px-3 py-3 font-semibold rounded-md transition ease-in-out delay-150 text-white hover:scale-95 hover:bg-[#042656] duration-300 w-full">
              <MdOutlineFileDownloadDone className="text-2xl" />
              Submit
            </button>
          </div>
          <div>
            Already have an account?{" "}
            <Link to={"/login"} className="underline text-[#003276]">
              Login
            </Link>
          </div>
          <div className="divider"></div>
          <SocialLogin></SocialLogin>
        </form>
      </div>
      <img
        src={registerBg}
        alt="Contact Us"
        className="lg:mx-auto px-10 lg:px-0"
      />
    </div>
  );
};

export default Register;
