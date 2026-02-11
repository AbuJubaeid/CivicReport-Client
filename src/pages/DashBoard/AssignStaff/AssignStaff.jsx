import { useQuery } from "@tanstack/react-query";
import { useRef, useState } from "react";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const AssignStaff = () => {
  const axiosSecure = useAxiosSecure();
  const staffModalRef = useRef();
  const [selectedReport, setSelectedReport] = useState();

  const { data: reports = [], refetch } = useQuery({
    queryKey: ["reports", "pending"],
    queryFn: async () => {
      const res = await axiosSecure.get("/reports?reportStatus=pending");
      return res.data;
    },
  });

  const { data: staffs = [] } = useQuery({
    queryKey: ["reports", "available"],
    enabled: !!selectedReport,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/staffs?status=approved&workStatus=available`
      );
      return res.data;
    },
  });

  const openStaffModal = (report) => {
    setSelectedReport(report);
    staffModalRef.current.showModal();
  };

  const handleAssignStaff = (staff) => {
    const staffInfo = {
      staffId: staff._id,
      staffName: staff.name,
      staffEmail: staff.email,
      reportId: selectedReport._id,
    };

    axiosSecure.patch(`/reports/${selectedReport._id}`, staffInfo).then((res) => {
      if (res.data.modifiedCount) {
        staffModalRef.current.close();
        refetch();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Staff assigned",
          showConfirmButton: false,
          timer: 2500,
        });
      }
    });
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl sm:text-3xl font-semibold text-slate-800">
          Assign Staff
        </h2>
        <p className="text-slate-500 mt-1 text-sm sm:text-base">
          Pending Reports:{" "}
          <span className="font-medium">{reports.length}</span>
        </p>
      </div>

      {/* Desktop / Tablet Table */}
      <div className="hidden md:block overflow-x-auto border border-slate-200 rounded-xl">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-slate-100 text-slate-600 uppercase text-xs tracking-wider">
            <tr>
              <th className="px-4 py-3">#</th>
              <th className="px-4 py-3">Issue</th>
              <th className="px-4 py-3">Location</th>
              <th className="px-4 py-3">Payment</th>
              <th className="px-4 py-3">Created</th>
              <th className="px-4 py-3 text-center">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {reports.map((report, index) => (
              <tr key={report._id} className="hover:bg-slate-50 transition">
                <td className="px-4 py-3">{index + 1}</td>
                <td className="px-4 py-3 font-medium text-slate-700">
                  {report.issue}
                </td>
                <td className="px-4 py-3 text-slate-600">
                  {report.location}
                </td>
                <td className="px-4 py-3 text-slate-600">
                  {report.paymentStatus}
                </td>
                <td className="px-4 py-3 text-slate-600">
                  {report.createdAt}
                </td>
                <td className="px-4 py-3 text-center">
                  <button
                    onClick={() => openStaffModal(report)}
                    className="px-4 py-2 text-sm rounded-md bg-slate-800 text-white hover:bg-slate-700 transition"
                  >
                    Assign Staff
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card Layout */}
      <div className="md:hidden space-y-4">
        {reports.map((report, index) => (
          <div
            key={report._id}
            className="border border-slate-200 rounded-lg p-4 shadow-sm"
          >
            <p className="text-sm text-slate-500 mb-1">
              #{index + 1}
            </p>
            <h3 className="font-semibold text-slate-800">
              {report.issue}
            </h3>
            <p className="text-sm text-slate-600 mt-1">
              📍 {report.location}
            </p>
            <p className="text-sm text-slate-600">
              💳 {report.paymentStatus}
            </p>
            <p className="text-sm text-slate-500">
              🕒 {report.createdAt}
            </p>
            <button
              onClick={() => openStaffModal(report)}
              className="mt-3 w-full py-2 rounded-md bg-slate-800 text-white text-sm hover:bg-slate-700 transition"
            >
              Assign Staff
            </button>
          </div>
        ))}
      </div>

      {/* Modal */}
      <dialog
        ref={staffModalRef}
        className="modal modal-bottom sm:modal-middle"
      >
        <div className="modal-box max-w-2xl rounded-xl">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">
            Available Staff ({staffs.length})
          </h3>

          <div className="overflow-x-auto border border-slate-200 rounded-lg">
            <table className="min-w-full text-sm text-left">
              <thead className="bg-slate-100 text-slate-600 uppercase text-xs">
                <tr>
                  <th className="px-4 py-3">#</th>
                  <th className="px-4 py-3">Name</th>
                  <th className="px-4 py-3">Email</th>
                  <th className="px-4 py-3 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {staffs.map((staff, index) => (
                  <tr key={staff._id} className="hover:bg-slate-50 transition">
                    <td className="px-4 py-3">{index + 1}</td>
                    <td className="px-4 py-3 font-medium text-slate-700">
                      {staff.name}
                    </td>
                    <td className="px-4 py-3 text-slate-600">
                      {staff.email}
                    </td>
                    <td className="px-4 py-3 text-center">
                      <button
                        onClick={() => handleAssignStaff(staff)}
                        className="px-3 py-1.5 text-xs rounded-md bg-slate-800 text-white hover:bg-slate-700 transition"
                      >
                        Assign
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-5 text-right">
            <form method="dialog">
              <button className="px-4 py-2 text-sm rounded-md border border-slate-300 hover:bg-slate-100 transition">
                Close
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default AssignStaff;

