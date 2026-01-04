import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const PaymentSuccess = () => {
    const [ searchParams ] = useSearchParams()
    const [ paymentInfo, setPaymentInfo ] = useState({}) 
    const sessionId = searchParams.get('session_id')
    console.log(sessionId)
    const axiosSecure = useAxiosSecure()

    useEffect(()=>{
        if(sessionId){
            axiosSecure.patch(`/payment-success?session_id=${sessionId}`)
            .then(res=>{
                console.log(res.data)
                setPaymentInfo({
                    transactionId: res.data.transactionId,
                    trackingId: res.data.trackingId
,
                })
            })
        }
    }, [sessionId, axiosSecure])
    return (
        <div>
            <h2>Payment is successfull</h2>
            <h3>Transaction id: {paymentInfo.transactionId}</h3>
            <h3>TrackingId id: {paymentInfo.trackingId}</h3>
        </div>
    );
};

export default PaymentSuccess;