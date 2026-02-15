import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Link, useNavigate } from "react-router";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useHook from "../../../hooks/useHook";
import SocialLogin from "../socialLogin/SocialLogin";

const Register = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const {
    createUserWithEmailAndPasswordFunc,
    updateProfileFunc,
    signOutFunc,
  } = useHook();

  const axiosSecure = useAxiosSecure();

  const handleRegister = (data) => {
    const profileImg = data.photo[0];

    createUserWithEmailAndPasswordFunc(data.email, data.password)
      .then(() => {

        // prepare data for imgbb
        const formData = new FormData();
        formData.append("image", profileImg);

        const imageApiURL = `https://api.imgbb.com/1/upload?key=${
          import.meta.env.VITE_imageHostApiKey
        }`;

        axios.post(imageApiURL, formData).then((res) => {
          const photoURL = res.data.data.url;

          // create user in database
          const userInfo = {
            email: data.email,
            displayName: data.name,
            photoURL: photoURL,
          };

          axiosSecure.post("/users", userInfo).then((res) => {
            if (res.data.insertedId) {
              toast("user created successfully");
            }
          });

          // update user profile
          const userProfile = {
            displayName: data.name,
            photoURL: photoURL,
          };

          updateProfileFunc(userProfile)
            .then(() => {
              // ✅ SIGN OUT AFTER EVERYTHING IS DONE
              signOutFunc()
                .then(() => {
                  navigate("/login");
                })
                .catch((error) => {
                  console.log(error);
                });
            })
            .catch((error) => {
              console.log(error);
            });
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-base-200">
      {/* LEFT SIDE: FORM */}
      <div className="lg:w-1/2 flex flex-col text-center justify-center px-12 py-16">
        <h1 className="text-5xl font-bold mb-4">Register Now!</h1>
        <p className="text-gray-600 mb-8">
          Join CivicReport and start reporting civic issues transparently.
        </p>

        <form
          onSubmit={handleSubmit(handleRegister)}
          className="flex flex-col gap-4 w-full"
        >
          {/* Name */}
          <div>
            <input
              type="text"
              {...register("name", { required: true })}
              placeholder="Full Name"
              className="w-full border border-gray-300 rounded-lg py-3 px-4 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition"
            />
            {errors.name && (
              <p className="text-red-500 text-xs mt-1">Name is required</p>
            )}
          </div>

          {/* Photo */}
          <div>
            <input
              type="file"
              {...register("photo", { required: true })}
              className="file-input file-input-ghost w-full"
            />
            {errors.photo && (
              <p className="text-red-500 text-xs mt-1">Photo is required</p>
            )}
          </div>

          {/* Email */}
          <div>
            <input
              type="email"
              {...register("email", { required: true })}
              placeholder="Email Address"
              className="w-full border border-gray-300 rounded-lg py-3 px-4 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition"
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">Email is required</p>
            )}
          </div>

          {/* Password */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              {...register("password", {
                required: true,
                minLength: 6,
                pattern:
                  /^(?=.{6,}$)(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).*$/,
              })}
              placeholder="Password"
              className="w-full border border-gray-300 rounded-lg py-3 px-4 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition"
            />
            <div
              className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <AiOutlineEyeInvisible size={20} />
              ) : (
                <AiOutlineEye size={20} />
              )}
            </div>

            {errors.password?.type === "required" && (
              <p className="text-red-500 text-xs mt-1">Password is required</p>
            )}
            {errors.password?.type === "minLength" && (
              <p className="text-red-500 text-xs mt-1">
                Password must be 6 characters or longer
              </p>
            )}
            {errors.password?.type === "pattern" && (
              <p className="text-red-500 text-xs mt-1">
                Must include uppercase, lowercase, number & special char
              </p>
            )}
          </div>

          <button className="w-full py-3.5 rounded-lg
              bg-slate-900 text-white font-medium
              hover:bg-slate-800 active:scale-[0.98]
              transition">
            Register
          </button>
        </form>

        <div className="my-6 w-full">
          <SocialLogin />
        </div>

        <p className="text-sm text-center text-gray-600">
          Already have an account?{" "}
          <Link
            className="text-cyan-500 font-medium hover:underline"
            to="/login"
          >
            Login
          </Link>
        </p>
      </div>

      {/* RIGHT SIDE IMAGE */}
      <div className="lg:w-1/2 hidden lg:flex items-center justify-center px-12">
        <img
          src="https://i.ibb.co.com/XT1Ppnb/register.png"
          alt="Register Illustration"
          className="w-full max-w-xl object-contain"
        />
      </div>
    </div>
  );
};

export default Register;

