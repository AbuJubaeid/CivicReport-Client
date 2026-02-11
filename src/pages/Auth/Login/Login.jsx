import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Link, useNavigate } from "react-router";
import useHook from "../../../hooks/useHook";
import SocialLogin from "../socialLogin/SocialLogin";

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm();

  const { signInWithEmailAndPasswordFunc, sendPasswordResetEmailFunc } =
    useHook();

  const handleSignin = (data) => {
    signInWithEmailAndPasswordFunc(data.email, data.password)
      .then((result) => console.log(result.user))
      .catch((error) => console.log(error));
    navigate("/");
  };

  const handleForgetPassword = () => {
    const email = getValues("email");
    if (!email) {
      toast("Please enter your email first");
      return;
    }
    sendPasswordResetEmailFunc(email)
      .then(() => toast("Password reset email sent!"))
      .catch((error) => console.log(error));
  };

  return (
    <div className="min-h-screen my-6 flex flex-col lg:flex-row">

      {/* LEFT SIDE */}
      <div className="lg:w-1/2 flex items-center justify-center px-6 lg:px-24">
        <div className="w-full max-w-md">

          {/* Heading */}
          <h2 className="text-3xl font-semibold text-center text-slate-800 mb-2">
            Welcome back
          </h2>
          <p className="text-slate-500 text-center mb-10 text-base">
            Sign in to continue managing civic reports transparently.
          </p>

          {/* FORM (Card Removed) */}
          <form
            onSubmit={handleSubmit(handleSignin)}
            className="space-y-7"
          >

            {/* Email */}
            <div className="relative">
              <input
                type="email"
                {...register("email", { required: true })}
                placeholder="Email address"
                className="w-full border border-slate-300 rounded-lg
                py-3.5 px-4 text-slate-800
                focus:outline-none focus:border-slate-700 focus:ring-1 focus:ring-slate-300
                transition"
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">
                  Email is required
                </p>
              )}
            </div>

            {/* Password with Eye Toggle */}
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
                className="w-full border border-slate-300 rounded-lg
                py-3.5 px-4 pr-12 text-slate-800
                focus:outline-none focus:border-slate-700 focus:ring-1 focus:ring-slate-300
                transition"
              />

              {/* Eye Icon */}
              <div
                className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-slate-500"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <AiOutlineEyeInvisible size={20} />
                ) : (
                  <AiOutlineEye size={20} />
                )}
              </div>

              {errors.password?.type === "required" && (
                <p className="text-red-500 text-xs mt-1">
                  Password is required
                </p>
              )}
              {errors.password?.type === "minLength" && (
                <p className="text-red-500 text-xs mt-1">
                  Minimum 6 characters required
                </p>
              )}
              {errors.password?.type === "pattern" && (
                <p className="text-red-500 text-xs mt-1">
                  Must include uppercase, lowercase, number & symbol
                </p>
              )}
            </div>

            {/* Forgot password */}
            <div className="flex justify-end">
              <button
                type="button"
                onClick={handleForgetPassword}
                className="text-sm text-slate-600 hover:text-slate-900 transition"
              >
                Forgot password?
              </button>
            </div>

            {/* Login button */}
            <button
              type="submit"
              className="w-full py-3.5 rounded-lg
              bg-slate-900 text-white font-medium
              hover:bg-slate-800 active:scale-[0.98]
              transition"
            >
              Sign in
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-4 my-8">
            <span className="flex-1 h-px bg-slate-200" />
            <span className="text-sm text-slate-500">or</span>
            <span className="flex-1 h-px bg-slate-200" />
          </div>

          {/* Social login */}
          <SocialLogin />

          {/* Register */}
          <p className="mt-8 text-sm text-center text-slate-600">
            Don’t have an account?
            <Link
              to="/register"
              className="ml-1 font-medium text-slate-900 hover:underline"
            >
              Register
            </Link>
          </p>

        </div>
      </div>

      {/* RIGHT SIDE IMAGE */}
      <div className="lg:w-1/2 hidden lg:flex items-center justify-start pl-16">
        <img
          src="/src/assets/image/login.png"
          alt="Login Illustration"
          className="w-full max-w-xl object-contain"
        />
      </div>

    </div>
  );
};

export default Login;























