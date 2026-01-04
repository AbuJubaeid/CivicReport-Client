import { useQuery } from "@tanstack/react-query";
import { FaRegEdit } from "react-icons/fa";
import { GrFormView } from "react-icons/gr";
import { MdOutlineDeleteForever } from "react-icons/md";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useHook from "../../../hooks/useHook";

const MyReports = () => {
  const { user } = useHook();
  const axiosSecure = useAxiosSecure();

  const { data: reports = [], refetch } = useQuery({
    queryKey: ["MyReport", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/reports?email=${user.email}`);
      return res.data;
    },
  });

  const handleDeleteReport = (id) => {
    console.log(id);
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/reports/${id}`).then((res) => {
          console.log(res.data);
          if (res.data.deletedCount) {
            refetch()
            Swal.fire({
              title: "Deleted!",
              text: "Your report has been deleted.",
              icon: "success",
            });
          }
        });
      }
    });
  };

  const handlePayment = async(report)=>{
        const paymentInfo = {
            issue: report.issue,
            reportId: report._id,
            email: report.email,
        }

        const res = await axiosSecure.post('/create-checkout-session', paymentInfo)
        console.log(res.data)
        window.location.assign(res.data.url ) 
    }

  return (
    <div>
      <h2>My reports are here: {reports.length}</h2>
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Report Name</th>
              <th>Category</th>
              <th>Location</th>
              <th>Status</th>
              <th>Priority</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {reports.map((report, index) => (
              <tr key={report._id}>
                <th>{index + 1}</th>
                <td>{report.issue}</td>
                <td>{report.category}</td>
                <td>{report.location}</td>
                <td>Pending</td>
                <td>
                    {
                        report.priorityStatus === 'boosted' ? 
                        <span className="text-gray-400">Paid</span> : 
                        <button onClick={()=>handlePayment(report)} className="btn btn-secondary text-sm">Boost</button>
                    }
                </td>
                <td>
                  <button className="btn btn-square hover:bg-secondary">
                    <GrFormView />
                  </button>
                  <button className="btn btn-square hover:bg-secondary mx-2">
                    <FaRegEdit />
                  </button>
                  <button
                    onClick={() => handleDeleteReport(report._id)}
                    className="btn btn-square hover:bg-secondary"
                  >
                    <MdOutlineDeleteForever />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyReports;
