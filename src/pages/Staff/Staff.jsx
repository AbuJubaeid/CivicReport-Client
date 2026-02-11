import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const Staff = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const axiosSecure = useAxiosSecure();

    const handleStaff = (data) => {
    console.log(data);
    axiosSecure.post("/staffs", data).then((res) => {
      console.log("after saving data to database", res.data);
      if (res.data.insertedId) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title:
            "Your application has been submitted. Please wait, we will reach you.",
          showConfirmButton: false,
          timer: 2500,
        });
        reset(); // clear the form after successful submission
      }
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row items-center justify-center p-4 md:p-10">
      {/* Optional left-side illustration */}
      <div className="hidden md:flex md:w-1/2 items-center justify-center">
        <img
          src="/src/assets/image/staff-register.png"
          alt="Staff Illustration"
          className="w-full max-w-md object-contain"
        />
      </div>

      {/* Form */}
      <div className="w-full md:w-1/2 px-4 md:px-10">
        <h2 className="text-3xl md:text-4xl text-center font-bold text-gray-800 mb-4 md:text-left">
          Become a Staff
        </h2>
        <p className="text-gray-500 mb-6 text-center md:text-left">
          Fill out the form below and submit your application to join our team.
        </p>

        <form onSubmit={handleSubmit(handleStaff)} className="space-y-5">
          {/* Name */}
          <div>
            <label className="block text-gray-700 mb-1 font-medium">Name</label>
            <input
              type="text"
              {...register("name", { required: true })}
              placeholder="Full Name"
              className="w-full border border-gray-300 rounded-lg py-2.5 px-4 focus:outline-none focus:ring-1 focus:ring-cyan-500 focus:border-cyan-500 transition"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">Name is required</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-gray-700 mb-1 font-medium">Email</label>
            <input
              type="email"
              {...register("email", { required: true })}
              placeholder="Email Address"
              className="w-full border border-gray-300 rounded-lg py-2.5 px-4 focus:outline-none focus:ring-1 focus:ring-cyan-500 focus:border-cyan-500 transition"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">Email is required</p>
            )}
          </div>

          {/* Image */}
          <div>
            <label className="block text-gray-700 mb-1 font-medium">Image</label>
            <input
              type="file"
              className="file-input file-input-ghost w-full"
              {...register("image", { required: true })}
            />
            {errors.image && (
              <p className="text-red-500 text-sm mt-1">Image is required</p>
            )}
          </div>

          {/* Address */}
          <div>
            <label className="block text-gray-700 mb-1 font-medium">Address</label>
            <input
              type="text"
              {...register("address", { required: true })}
              placeholder="Type your address here"
              className="w-full border border-gray-300 rounded-lg py-2.5 px-4 focus:outline-none focus:ring-1 focus:ring-cyan-500 focus:border-cyan-500 transition"
            />
            {errors.address && (
              <p className="text-red-500 text-sm mt-1">Address is required</p>
            )}
          </div>

          {/* Submit */}
          <div>
            <button
              type="submit"
              className="w-full py-3.5 bg-cyan-500 hover:bg-cyan-600 text-white font-semibold rounded-lg transition"
            >
              Register as Staff
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Staff;

