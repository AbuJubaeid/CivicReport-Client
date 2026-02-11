import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useHook from "../../../hooks/useHook";

const StaffTask = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useHook();
  const { data: reports = [], refetch } = useQuery({
    queryKey: ["reports", user.email, "In-Progress"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/reports/staff?staffEmail=${user.email}&reportStatus=In-Progress`);
      return res.data;
    },
  });
  const handleStatusUpdate = (report, status) =>{
    const statusInfo = { 
      reportStatus: status,
      staffId: report.staffId,
      }

    axiosSecure.patch(`/reports/${report._id}/status`, statusInfo)
    .then(res=>{
      if(res.data.modifiedCount){
        refetch()
                    Swal.fire({
                              position: "top-end",
                              icon: "success",
                              title:
                                "Report status updated",
                              showConfirmButton: false,
                              timer: 2500,
                            });
      }
    })
  }
  return (
    <div>
      <h2>Reports: {reports.length}</h2>
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Location</th>
              <th>Created At</th>
              <th>Confirm</th>
              <th>Other Actions</th>
            </tr>
          </thead>
          <tbody>
            {reports.map((report, index)=><tr key={report._id}>
              <th>{index + 1}</th>
              <td>{report.issue}</td>
              <td>{report.location}</td>
              <td>{report.createdAt}</td>
              <td>
                {
                  report.reportStatus === "In-Progress" ? 
                  <>
                  <button
                onClick={()=>handleStatusUpdate(report, 'Processing')} 
                className="btn btn-primary mr-2">Accept</button>
                <button className="btn btn-warning">Reject</button>
                  </>
                  : 
                  <span> Report Acccepted</span>
                }
              </td>
              <td>
                <button
                onClick={()=>handleStatusUpdate(report, 'Marked')} 
                className="btn btn-primary mr-2">Marked</button>
                <button 
                onClick={()=>handleStatusUpdate(report, 'Solved')} 
                className="btn btn-warning">Solved</button>
              </td>
            </tr>)}
            
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StaffTask;

