import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const Payment = () => {
    const {reportId} = useParams()
    const axiosSecure = useAxiosSecure()

    const { isLoading, data: report = []} = useQuery({
        queryKey: ['reports', reportId],
        queryFn: async ()=>{
            const res = await axiosSecure.get(`/reports/${reportId}`)
            return res.data
        }
    })

    if(isLoading){
        return <span className="loading loading-ring loading-xl"></span>
    }
    return (
        <div>
            Boost to pay: {report.issue}
        </div>
    );
};

export default Payment;