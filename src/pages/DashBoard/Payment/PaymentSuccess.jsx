import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const [paymentInfo, setPaymentInfo] = useState({});
  const sessionId = searchParams.get("session_id");
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    if (sessionId) {
      axiosSecure
        .patch(`/payment-success?session_id=${sessionId}`)
        .then((res) => {
          setPaymentInfo({
            transactionId: res.data.transactionId,
            trackingId: res.data.trackingId,
          });
        });
    }
  }, [sessionId, axiosSecure]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md sm:max-w-lg bg-white rounded-xl shadow-md p-6 sm:p-8">
        
        
        <div className="flex justify-center mb-4">
          <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center">
            <svg
              className="w-7 h-7 text-green-600"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
        </div>

        
        <h2 className="text-xl sm:text-2xl font-semibold text-center text-gray-800">
          Payment Successful
        </h2>

        <p className="text-sm text-gray-500 text-center mt-1">
          Thank you for your payment. Your transaction was completed successfully.
        </p>

        
        <div className="mt-6 space-y-3">
          <div className="flex justify-between text-sm sm:text-base">
            <span className="text-gray-500">Transaction ID</span>
            <span className="font-medium text-gray-800 break-all">
              {paymentInfo.transactionId || "—"}
            </span>
          </div>

          <div className="flex justify-between text-sm sm:text-base">
            <span className="text-gray-500">Tracking ID</span>
            <span className="font-medium text-gray-800 break-all">
              {paymentInfo.trackingId || "—"}
            </span>
          </div>
        </div>

        
        <div className="mt-8">
          <button
            onClick={() => window.location.href = "/"}
            className="w-full py-2.5 rounded-lg bg-green-600 text-white font-medium hover:bg-green-700 transition"
          >
            Go to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
