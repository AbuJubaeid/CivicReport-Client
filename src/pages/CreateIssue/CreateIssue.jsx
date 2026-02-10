import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useHook from "../../hooks/useHook";

const CreateIssue = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const axiosSecure = useAxiosSecure();
  const { user } = useHook();
  const navigate = useNavigate();

  const handleCreateReport = (data) => {
    const profileImg = data.image[0];
    const formData = new FormData();
    formData.append("image", profileImg);

    const imageApiURL = `https://api.imgbb.com/1/upload?key=${
      import.meta.env.VITE_imageHostApiKey
    }`;

    axios.post(imageApiURL, formData).then((res) => {
      const photoURL = res.data.data.url;

          // send photoUrl in the database
          const reportInfo = {
            photoURL: photoURL,
            name: data.name,
            email: data.email,
            issue: data.issue,
            category: data.category,
            location: data.location,
            createdAt: data.createdAt,
          };
      Swal.fire({
        title: "Confirm submission",
        text: "Do you want to create this report?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, submit",
      }).then((result) => {
        if (result.isConfirmed) {
          axiosSecure.post("/reports", reportInfo).then((res) => {
            if (res.data.insertedId) {
              navigate("/dashboard/my-reports");
              Swal.fire({
                icon: "success",
                title: "Report submitted successfully",
                timer: 2200,
                showConfirmButton: false,
              });
            }
          });
        }
      });
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4">
      <div className="max-w-4xl mx-auto">

        {/* Page Header */}
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-semibold text-slate-800">
            Report a Civic Issue
          </h2>
          <p className="mt-2 text-slate-600 max-w-xl mx-auto">
            Submit details about a public issue to help authorities take action.
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6 sm:p-8 md:p-10">

          <form
            onSubmit={handleSubmit(handleCreateReport)}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >

            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Name
              </label>
              <input
                type="text"
                defaultValue={user?.displayName}
                {...register("name", { required: true })}
                className="w-full rounded-lg border border-slate-300 px-4 py-3
                focus:outline-none focus:border-slate-700 focus:ring-1 focus:ring-slate-300"
                placeholder="Your name"
              />
              {errors.name && (
                <p className="text-red-500 text-xs mt-1">Name is required</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Email
              </label>
              <input
                type="email"
                defaultValue={user?.email}
                {...register("email", { required: true })}
                className="w-full rounded-lg border border-slate-300 px-4 py-3
                focus:outline-none focus:border-slate-700 focus:ring-1 focus:ring-slate-300"
                placeholder="Your email"
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">Email is required</p>
              )}
            </div>

            {/* Image */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Issue Image
              </label>
              <input
                type="file"
                {...register("image", { required: true })}
                className="w-full rounded-lg border border-slate-300 px-4 py-2 file:mr-4 file:py-2
                file:px-4 file:border-0 file:bg-slate-100 file:text-slate-700
                hover:file:bg-slate-200"
              />
              {errors.image && (
                <p className="text-red-500 text-xs mt-1">Image is required</p>
              )}
            </div>

            {/* Issue Title */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Issue Title
              </label>
              <input
                type="text"
                {...register("issue", { required: true })}
                className="w-full rounded-lg border border-slate-300 px-4 py-3
                focus:outline-none focus:border-slate-700 focus:ring-1 focus:ring-slate-300"
                placeholder="Briefly describe the issue"
              />
              {errors.issue && (
                <p className="text-red-500 text-xs mt-1">Issue is required</p>
              )}
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Category
              </label>
              <select
                {...register("category", { required: true })}
                className="w-full rounded-lg border border-slate-300 px-4 py-3
                focus:outline-none focus:border-slate-700 focus:ring-1 focus:ring-slate-300"
                defaultValue=""
              >
                <option value="" disabled>
                  Select category
                </option>
                <option>Road & Transport</option>
                <option>Electricity</option>
                <option>Water & Drainage</option>
                <option>Public Safety</option>
              </select>
            </div>

            {/* Location */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Location
              </label>
              <input
                type="text"
                {...register("location", { required: true })}
                className="w-full rounded-lg border border-slate-300 px-4 py-3
                focus:outline-none focus:border-slate-700 focus:ring-1 focus:ring-slate-300"
                placeholder="Issue location"
              />
              {errors.location && (
                <p className="text-red-500 text-xs mt-1">
                  Location is required
                </p>
              )}
            </div>

            {/* Submit */}
            <div className="md:col-span-2 flex justify-end mt-4">
              <button
                type="submit"
                className="px-8 py-3 rounded-lg bg-slate-800 text-white
                hover:bg-slate-900 transition font-medium"
              >
                Submit Report
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateIssue;

