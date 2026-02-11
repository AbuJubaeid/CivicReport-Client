import { useQuery } from "@tanstack/react-query";
import { FaTrashAlt, FaUserCheck } from "react-icons/fa";
import { IoPersonRemove } from "react-icons/io5";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const ApproveStaffs = () => {
  const axiosSecure = useAxiosSecure();

  const { refetch, data: staffs = [] } = useQuery({
    queryKey: ["staffs", "pending"],
    queryFn: async () => {
      const res = await axiosSecure.get("/staffs");
      return res.data;
    },
  });

  const updateStaffInfo = (staff, status) => {
    const updateInfo = { status: status, email: staff.email };

    axiosSecure.patch(`/staffs/${staff._id}`, updateInfo).then((res) => {
      if (res.data.modifiedCount) {
        refetch();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Staff status changed",
          showConfirmButton: false,
          timer: 2500,
        });
      }
    });
  };

  const handleApprove = (staff) => {
    updateStaffInfo(staff, "approved");
  };

  const handleReject = (staff) => {
    updateStaffInfo(staff, "rejected");
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#0f172a",
      cancelButtonColor: "#dc2626",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/staffs/${id}`).then((res) => {
          if (res.data.deletedCount) {
            refetch();
            Swal.fire(
              "Deleted!",
              "Staff request has been deleted.",
              "success"
            );
          }
        });
      }
    });
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      {/* Heading */}
      <div className="mb-6">
        <h2 className="text-2xl sm:text-3xl font-semibold text-slate-800">
          Staff Approval Requests
        </h2>
        <p className="text-slate-500 mt-1 text-sm sm:text-base">
          Pending staff requests:{" "}
          <span className="font-medium">{staffs.length}</span>
        </p>
      </div>

      {/* Table Container */}
      <div className="overflow-x-auto border border-slate-200 rounded-xl">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-slate-100 text-slate-600 uppercase text-xs tracking-wider">
            <tr>
              <th className="px-4 py-3">#</th>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Location</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Work Status</th>
              <th className="px-4 py-3 text-center">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-200">
            {staffs.map((staff, index) => (
              <tr
                key={staff._id}
                className="hover:bg-slate-50 transition"
              >
                <td className="px-4 py-3">{index + 1}</td>
                <td className="px-4 py-3 font-medium text-slate-700">
                  {staff.name}
                </td>
                <td className="px-4 py-3 text-slate-600">
                  {staff.email}
                </td>
                <td className="px-4 py-3 text-slate-600">
                  {staff.address}
                </td>

                <td
                  className={`px-4 py-3 font-medium ${
                    staff.status === "approved"
                      ? "text-green-600"
                      : "text-red-500"
                  }`}
                >
                  {staff.status}
                </td>

                <td className="px-4 py-3 text-slate-600">
                  {staff.workStatus}
                </td>

                {/* Actions with Tooltip */}
                <td className="px-4 py-3">
                  <div className="flex justify-center gap-3">

                    {/* Approve */}
                    <div className="relative group">
                      <button
                        onClick={() => handleApprove(staff)}
                        className="p-2 rounded-md bg-green-50 text-green-600 hover:bg-green-100 transition"
                      >
                        <FaUserCheck size={14} />
                      </button>
                      <span className="absolute -top-8 left-1/2 -translate-x-1/2 
                        whitespace-nowrap rounded bg-slate-800 px-2 py-1 text-xs text-white 
                        opacity-0 group-hover:opacity-100 transition pointer-events-none">
                        Approve
                      </span>
                    </div>

                    {/* Reject */}
                    <div className="relative group">
                      <button
                        onClick={() => handleReject(staff)}
                        className="p-2 rounded-md bg-yellow-50 text-yellow-600 hover:bg-yellow-100 transition"
                      >
                        <IoPersonRemove size={15} />
                      </button>
                      <span className="absolute -top-8 left-1/2 -translate-x-1/2 
                        whitespace-nowrap rounded bg-slate-800 px-2 py-1 text-xs text-white 
                        opacity-0 group-hover:opacity-100 transition pointer-events-none">
                        Reject
                      </span>
                    </div>

                    {/* Delete */}
                    <div className="relative group">
                      <button
                        onClick={() => handleDelete(staff._id)}
                        className="p-2 rounded-md bg-red-50 text-red-600 hover:bg-red-100 transition"
                      >
                        <FaTrashAlt size={13} />
                      </button>
                      <span className="absolute -top-8 left-1/2 -translate-x-1/2 
                        whitespace-nowrap rounded bg-slate-800 px-2 py-1 text-xs text-white 
                        opacity-0 group-hover:opacity-100 transition pointer-events-none">
                        Delete
                      </span>
                    </div>

                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ApproveStaffs;


