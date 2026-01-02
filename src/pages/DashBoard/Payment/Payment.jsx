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

    const handlePayment = async()=>{
        const paymentInfo = {
            issue: report.issue,
            reportId: report._id,
            email: report.email,
        }

        const res = await axiosSecure.post('/create-checkout-session', paymentInfo)
        console.log(res.data)
        window.location.href = res.data.url 
    }

    return (
        <div>
            <h3>Boost to pay <span className="text-green-500">'2$'</span> for: {report.issue}</h3>
            <button onClick={handlePayment} className="btn btn-primary">Pay</button>
        </div>
    );
};

export default Payment;