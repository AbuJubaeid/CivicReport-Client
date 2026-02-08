import { useQuery } from "@tanstack/react-query";
import { useRef, useState } from "react";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const AssignStaff = () => {
  const axiosSecure = useAxiosSecure();
  const staffModalRef = useRef();
  const [selectedReport, setSelectedReport] = useState();

  const { data: reports = [], refetch } = useQuery({
    queryKey: ["reports", "pending-report"],
    queryFn: async () => {
      const res = await axiosSecure.get("/reports?reportStatus=pending-report");
      return res.data;
    },
  });

  const { data: staffs = [] } = useQuery({
    queryKey: ["reports", "available"],
    enabled: !!selectedReport,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/staffs?status=approved&workStatus=available`,
      );
      return res.data;
    },
  });

  const openStaffModal = (report) => {
    setSelectedReport(report);
    staffModalRef.current.showModal();
  };

  const handleAssignStaff = staff =>{
    const staffInfo = {
        staffId : staff._id,
        staffName : staff.name,
        staffEmail : staff.email,
        reportId : selectedReport._id
    }

    axiosSecure.patch(`/reports/${selectedReport._id}`, staffInfo)
    .then(res=>{
        if(res.data.modifiedCount){
            staffModalRef.current.close()
            refetch()
            Swal.fire({
                      position: "top-end",
                      icon: "success",
                      title:
                        "Staff assigned",
                      showConfirmButton: false,
                      timer: 2500,
                    });
        }
    })
  }

  return (
    <div>
      <h2>pending report: {reports.length}</h2>
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Location</th>
              <th>Payment Status</th>
              <th>Created At</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {reports.map((report, index) => (
              <tr key={report._id}>
                <th>{index + 1}</th>
                <td>{report.issue}</td>
                <td>{report.location}</td>
                <td>{report.paymentStatus}</td>
                <td>{report.createdAt}</td>
                <td>
                  <button
                    onClick={() => openStaffModal(report)}
                    className="btn btn-primary"
                  >
                    Assign Staff
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <dialog
        ref={staffModalRef}
        className="modal modal-bottom sm:modal-middle"
      >
        <div className="modal-box">
          <h3 className="font-bold text-lg">Staffs: {staffs.length}</h3>
          <div className="modal-action">
            <form method="dialog">
              <div className="overflow-x-auto">
                <table className="table table-zebra">
                  {/* head */}
                  <thead>
                    <tr>
                      <th></th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {staffs.map((staff, index)=>
                    <tr>
                      <th>{index + 1}</th>
                      <td>{staff.name}</td>
                      <td>{staff.email}</td>
                      <td>
                        <button 
                        onClick={()=>handleAssignStaff(staff)}
                        className="btn btn-primary">Assign</button>
                      </td>
                    </tr>
                    )}
                    
                  </tbody>
                </table>
              </div>
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default AssignStaff;
