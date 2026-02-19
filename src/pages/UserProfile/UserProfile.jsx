import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useHook from "../../hooks/useHook";
import useRole from "../../hooks/useRole";

const UserProfile = () => {
  const axiosSecure = useAxiosSecure();
  const { role } = useRole();
  const { user, setUser } = useHook();
  const [localUser, setLocalUser] = useState(null);
  const [open, setOpen] = useState(false);

  const imageKey = import.meta.env.VITE_imageHostApiKey;

  const { isLoading } = useQuery({
    queryKey: ["user-profile", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get("/users/me");
      setLocalUser(res.data);
      return res.data;
    },
  });

  if (isLoading || !localUser) {
    return (
      <div className="flex justify-center items-center h-64">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  
  const isHighPriority = localUser.priority === "High-Priority";

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const displayName = form.displayName.value.trim();
    const email = form.email.value.trim();
    const imageFile = form.photo.files[0];

    if (!displayName) {
      return Swal.fire("Error", "Name is required", "error");
    }

    let photoURL = localUser.photoURL;

    if (imageFile) {
      try {
        const formData = new FormData();
        formData.append("image", imageFile);

        const res = await fetch(
          `https://api.imgbb.com/1/upload?key=${imageKey}`,
          {
            method: "POST",
            body: formData,
          }
        );

        const data = await res.json();
        if (!data.success) throw new Error("Image upload failed");
        photoURL = data.data.url;
      } catch (err) {
        console.error(err);
        return Swal.fire("Error", "Failed to upload image", "error");
      }
    }

    const updatedData = { displayName, email, photoURL };

    try {
      await axiosSecure.patch("/users/me", updatedData);

      setUser({ ...user, ...updatedData });
      setLocalUser({ ...localUser, ...updatedData });

      Swal.fire("Updated!", "Profile updated successfully.", "success");
      setOpen(false);
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Failed to update profile", "error");
    }
  };

  const handleIncreasePriority = async (localUser) => {
    const isPaid = localUser.paymentStatus === "paid";

    if (isPaid) {
      return Swal.fire("Info", "Payment already completed", "info");
    }

    const paymentInfo = {
      issue: "Increase User Priority",
      userId: localUser._id,
      email: localUser.email,
    };

    try {
      const res = await axiosSecure.post(
        "/create-checkout-session/me",
        paymentInfo
      );
      window.location.href = res.data.url;
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Payment initialization failed", "error");
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      
      <div
        className={`shadow-xl rounded-xl p-6 flex flex-col md:flex-row gap-6 items-center
        ${
          isHighPriority
            ? "bg-green-50 border-2 border-green-400"
            : "bg-white"
        }`}
      >
        <img
          src={localUser.photoURL || "https://placehold.co/150"}
          className="w-32 h-32 rounded-full object-cover"
        />

        <div className="flex-1 space-y-2">
          <h2 className="text-2xl font-bold">{localUser.displayName}</h2>
          <p className="text-gray-600">Email: {localUser.email}</p>
          <p className="text-gray-600">Role: {localUser.role}</p>

          {role === "user" && (
            <span className="text-gray-600">
              Priority:{" "}
              <span className={isHighPriority ? "font-semibold text-yellow-700" : ""}>
                {localUser.priority || "normal"}
              </span>
            </span>
          )}
        </div>

        <div className="grid col-span-1 gap-2">
          <button onClick={() => setOpen(true)} className="btn btn-primary">
            Edit Profile
          </button>

          
          <button
            onClick={() => handleIncreasePriority(localUser)}
            disabled={isHighPriority}
            className={`btn btn-primary ${
              isHighPriority
                ? "btn-disabled opacity-60 cursor-not-allowed"
                : ""
            }`}
          >
            {isHighPriority ? "High Priority Enabled" : "Increase Priority "}
            {!isHighPriority && <small>(Pay-1000৳)</small>}
          </button>
        </div>
      </div>

      {/* EDIT MODAL */}
      {open && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <form
            onSubmit={handleUpdateSubmit}
            className="bg-white p-6 rounded-xl w-full max-w-md space-y-4"
          >
            <h2 className="text-xl font-bold text-center">Edit Profile</h2>

            <img
              src={localUser.photoURL || "https://placehold.co/150"}
              alt="preview"
              className="w-32 h-32 rounded-full object-cover mx-auto"
            />

            <input
              type="file"
              name="photo"
              className="file-input file-input-bordered w-full"
            />

            <input
              name="displayName"
              defaultValue={localUser.displayName}
              className="input input-bordered w-full"
              placeholder="Name"
            />

            <input
              name="email"
              defaultValue={localUser.email || ""}
              className="input input-bordered w-full"
              placeholder="Email"
            />

            <div className="flex justify-end gap-2">
              <button
                type="button"
                className="btn"
                onClick={() => setOpen(false)}
              >
                Cancel
              </button>
              <button type="submit" className="btn btn-primary">
                Save
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default UserProfile;

