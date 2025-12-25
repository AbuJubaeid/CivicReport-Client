import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useHook from "../../../hooks/useHook";

const MyReports = () => {
    const { user } = useHook()
    const axiosSecure = useAxiosSecure()

    const {  data: reports = [] } = useQuery({
    queryKey: ['MyReport', user?.email],
    queryFn: async ()=>{
        const res = await axiosSecure.get(`/reports?email=${user.email}`)
        return res.data
    },
  })
    return (
        <div>
            <h2>My reports are here: {reports.length}</h2>
        </div>
    );
};

export default MyReports;