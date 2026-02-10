// import { useForm } from "react-hook-form";
// import toast from "react-hot-toast";
// import { Link } from "react-router";
// import useHook from "../../../hooks/useHook";
// import SocialLogin from "../socialLogin/SocialLogin";

// const Register = () => {
//   const { register, handleSubmit, formState: { errors }, getValues } = useForm();
//   const { signInWithEmailAndPasswordFunc, sendPasswordResetEmailFunc } = useHook();

//   const handleSignin = (data) => {
//     signInWithEmailAndPasswordFunc(data.email, data.password)
//       .then(result => console.log(result.user))
//       .catch(error => console.log(error));
//   };

//   const handleForgetPassword = () => {
//     const email = getValues("email");
//     if (!email) {
//       toast("Please enter your email first");
//       return;
//     }
//     sendPasswordResetEmailFunc(email)
//       .then(() => toast("Password reset email sent!"))
//       .catch(error => console.log(error));
//   };

//   return (
//     <div className="min-h-screen flex flex-col lg:flex-row bg-gradient-to-r from-cyan-50 via-slate-50 to-cyan-50">

//       {/* Left side: Login Form */}
//       <div className="lg:w-1/2 flex flex-col justify-center items-start p-16">
//         <p className="text-slate-600 mb-10 text-lg max-w-md">
//           Log in to your CivicReport account and manage civic issues transparently.
//         </p>

//         <form onSubmit={handleSubmit(handleSignin)} className="w-full max-w-md space-y-6">

//           {/* Email */}
//           <div className="relative">
//             <input
//               type="email"
//               {...register('email', { required: true })}
//               className="peer w-full border border-slate-300 rounded-lg py-3 px-4 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 placeholder-transparent transition"
//               placeholder="Email"
//             />
//             <label className="absolute left-4 -top-3.5 text-gray-500 text-sm peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base transition-all">
//               Email
//             </label>
//             {errors.email && <p className="text-red-500 text-xs mt-1">Email is required</p>}
//           </div>

//           {/* Password */}
//           <div className="relative">
//             <input
//               type="password"
//               {...register('password', {
//                 required: true,
//                 minLength: 6,
//                 pattern: /^(?=.{6,}$)(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).*$/,
//               })}
//               className="peer w-full border border-slate-300 rounded-lg py-3 px-4 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 placeholder-transparent transition"
//               placeholder="Password"
//             />
//             <label className="absolute left-4 -top-3.5 text-gray-500 text-sm peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base transition-all">
//               Password
//             </label>
//             {errors.password?.type === 'required' && <p className="text-red-500 text-xs mt-1">Password is required</p>}
//             {errors.password?.type === 'minLength' && <p className="text-red-500 text-xs mt-1">Password must be at least 6 characters</p>}
//             {errors.password?.type === 'pattern' && <p className="text-red-500 text-xs mt-1">
//               Password must include lowercase, uppercase, digit, and special character
//             </p>}
//           </div>

//           <div className="text-right">
//             <button type="button" onClick={handleForgetPassword} className="text-sm text-cyan-500 hover:underline transition">
//               Forgot password?
//             </button>
//           </div>

//           <button type="submit" className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-blue-500 hover:to-cyan-500 text-white font-semibold py-3 rounded-xl transition-all">
//             Login
//           </button>
//         </form>

//         <SocialLogin />

//         <p className="mt-6 text-sm text-slate-600">
//           Don't have an account? <Link to="/register" className="text-cyan-500 font-medium hover:underline">Register</Link>
//         </p>
//       </div>

//       {/* Right side: Illustration */}
//       <div className="lg:w-1/2 flex items-center justify-center p-16">
//         <img
//           src="/src/assets/image/login.png"
//           alt="Login Illustration"
//           className="w-full max-w-lg"
//         />
//       </div>

//     </div>
//   );
// };

// export default Register;


// ----------------

import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Link } from "react-router";
import useHook from "../../../hooks/useHook";
import SocialLogin from "../socialLogin/SocialLogin";

const Register = () => {
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

          {/* Form Card */}
          <div className="border border-slate-200 rounded-xl p-8 shadow-sm">

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

              {/* Password */}
              <div className="relative">
                <input
                  type="password"
                  {...register("password", {
                    required: true,
                    minLength: 6,
                    pattern:
                      /^(?=.{6,}$)(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).*$/,
                  })}
                  placeholder="Password"
                  className="w-full border border-slate-300 rounded-lg
                  py-3.5 px-4 text-slate-800
                  focus:outline-none focus:border-slate-700 focus:ring-1 focus:ring-slate-300
                  transition"
                />

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

export default Register;









