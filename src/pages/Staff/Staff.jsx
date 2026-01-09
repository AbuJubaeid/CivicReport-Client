import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const Staff = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const axiosSecure = useAxiosSecure()


  const handleStaff = (data) => {
    console.log(data);
    axiosSecure.post("/staffs", data)
    .then((res) => {
              console.log("after saving data to database", res.data);
              if (res.data.insertedId) {
                Swal.fire({
                  position: "top-end",
                  icon: "success",
                  title: "Your application has submitted. Please wait, we will reach you",
                  showConfirmButton: false,
                  timer: 2500,
                });
              }
            });
  };

  return (
    <div>
      <h2>Be a staff</h2>
      <form onSubmit={handleSubmit(handleStaff)}>
        <fieldset className="fieldset">
          {/* staff name */}
          <label className="label">Name</label>
          <input
            type="text"
            {...register("name", { required: true })}
            className="input"
            placeholder="Name"
          />
          {errors.email?.type === "required" && (
            <p className="text-red-500">Name is required</p>
          )}
          {/* staff email */}
          <label className="label">Email</label>
          <input
            type="email"
            {...register("email", { required: true })}
            className="input"
            placeholder="Email"
          />
          {errors.email?.type === "required" && (
            <p className="text-red-500">Email is required</p>
          )}
          {/* image of issue */}
          <label className="label">Image</label>
          <input
            type="file"
            className="file-input file-input-ghost"
            {...register("image", { required: true })}
          />
          {errors.image?.type === "required" && (
            <p className="text-red-500">Image is required</p>
          )}

          {/* address */}
          <label className="label">Address</label>
          <input
            type="text"
            className="input"
            {...register("address", { required: true })}
            placeholder="Type your address here"
          />
          {errors.address?.type === "required" && (
            <p className="text-red-500">Address is required</p>
          )}


          <button className="btn btn-neutral mt-4">Register as staff</button>
        </fieldset>
      </form>
    </div>
  );
};

export default Staff;
