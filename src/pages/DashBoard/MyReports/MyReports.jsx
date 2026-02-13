import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import { MdOutlineDeleteForever } from "react-icons/md";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useHook from "../../../hooks/useHook";

const MyReports = () => {
  const { user } = useHook();
  const axiosSecure = useAxiosSecure();
  const [selectedReport, setSelectedReport] = useState(null);
  const imageKey = import.meta.env.VITE_imageHostApiKey;

  /*FETCH REPORTS*/
  const {
    data: reports = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["MyReport", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/reports?email=${user.email}`);
      return res.data;
    },
  });

  const handleDeleteReport = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This report will be permanently removed.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/reports/${id}`).then(() => {
          refetch();
          Swal.fire("Deleted!", "Report deleted successfully.", "success");
        });
      }
    });
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;

    const issue = form.issue.value.trim();
    const category = form.category.value.trim();
    const location = form.location.value.trim();
    const imageFile = form.photo.files[0];

    
    if (!issue || !category || !location) {
      return Swal.fire("Error", "All fields are required", "error");
    }

    let photoURL = selectedReport.photoURL;

   
    if (imageFile) {
      const formData = new FormData();
      formData.append("image", imageFile);

      const imgRes = await axios.post(
        `https://api.imgbb.com/1/upload?key=${imageKey}`,
        formData,
      );

      photoURL = imgRes.data.data.url;
    }

    const updatedData = {
      photoURL,
      issue,
      category,
      location,
    };

    
    axiosSecure
      .patch(`/reports/${selectedReport._id}`, updatedData)
      .then(() => {
        Swal.fire("Updated!", "Report updated successfully.", "success");
        document.getElementById("edit_modal").close();
        refetch();
      })
      .catch(() => {
        Swal.fire("Error", "Failed to update report", "error");
      });
  };

  if (isLoading) {
    return (
      <div className="flex justify-center mt-20">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-center mb-6">My Reports</h2>

      <div className="overflow-x-auto bg-base-100 rounded-xl shadow">
        <table className="table">
          <thead className="bg-base-200">
            <tr>
              <th>#</th>
              <th>Issue</th>
              <th>Category</th>
              <th>Location</th>
              <th>Status</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {reports.map((report, index) => (
              <tr key={report._id} className="hover">
                <td>{index + 1}</td>

                <td className="max-w-xs truncate font-medium">
                  {report.issue}
                </td>

                <td>{report.category}</td>

                <td>{report.location}</td>

                
                <td>
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-sm font-medium capitalize
                     ${report.reportStatus === "pending" ? "bg-yellow-300 text-yellow-800 border border-yellow-300" : ""}
                    ${report.reportStatus === "In-Progress" ? "bg-blue-300 text-blue-800 border border-blue-300" : ""}
                    ${report.reportStatus === "Solved" ? "bg-green-300 text-green-800 border border-green-300" : ""}
                   `}
                  >
                    {report.reportStatus}
                  </span>
                </td>

                
                <td className="text-center">
                  <div className="flex justify-center gap-3">
                    
                    <div className="tooltip" data-tip="Edit Report">
                      <button
                        disabled={report.paymentStatus === "paid"}
                        onClick={() => {
                          setSelectedReport(report);
                          document.getElementById("edit_modal").showModal();
                        }}
                        className={`btn btn-md btn-ghost ${
                          report.paymentStatus === "paid" &&
                          "btn-disabled opacity-50"
                        }`}
                      >
                        <FaRegEdit size={18} />
                      </button>
                    </div>

                    
                    <div className="tooltip" data-tip="Delete Report">
                      <button
                        onClick={() => handleDeleteReport(report._id)}
                        className="btn btn-md btn-ghost text-error"
                      >
                        <MdOutlineDeleteForever size={20} />
                      </button>
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/*EDIT MODAL*/}
      <dialog id="edit_modal" className="modal">
        <div className="modal-box max-w-lg">
          <h3 className="font-bold text-lg mb-4">Edit Report</h3>

          {selectedReport && (
            <form onSubmit={handleUpdateSubmit} className="space-y-3">
              <img
                src={selectedReport.photoURL}
                alt="preview"
                className="w-full h-40 object-cover rounded"
              />

              <input
                type="file"
                name="photo"
                className="file-input file-input-bordered w-full"
              />

              <input
                name="issue"
                defaultValue={selectedReport.issue}
                className="input input-bordered w-full"
                placeholder="Issue"
              />

              <input
                name="category"
                defaultValue={selectedReport.category}
                className="input input-bordered w-full"
                placeholder="Category"
              />

              <input
                name="location"
                defaultValue={selectedReport.location}
                className="input input-bordered w-full"
                placeholder="Location"
              />

              <div className="modal-action">
                <button className="btn btn-primary" type="submit">
                  Save Changes
                </button>
                <button
                  type="button"
                  className="btn"
                  onClick={() => document.getElementById("edit_modal").close()}
                >
                  Cancel
                </button>
              </div>
            </form>
          )}
        </div>
      </dialog>
    </div>
  );
};

export default MyReports;
