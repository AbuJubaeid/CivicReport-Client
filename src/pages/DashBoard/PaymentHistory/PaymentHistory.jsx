import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { GrFormView } from "react-icons/gr";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useHook from "../../../hooks/useHook";

const PaymentHistory = () => {
  const { user } = useHook();
  const axiosSecure = useAxiosSecure();
  const [selectedPayment, setSelectedPayment] = useState(null);

  const { data: payments = [], isLoading } = useQuery({
    queryKey: ["payments", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments?email=${user?.email}`);
      return res.data;
    },
  });

  if (isLoading) {
    return (
      <div className="flex justify-center mt-20">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-6 text-center">
        <h2 className="text-3xl font-bold">Payment History</h2>
        <p className="text-gray-500 mt-1">
          Review all payments made for boosting your reported issues.
        </p>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-base-100 rounded-xl shadow-sm">
        <table className="table">
          <thead className="bg-base-200">
            <tr>
              <th>#</th>
              <th>Report</th>
              <th>Amount</th>
              <th>Paid On</th>
              <th>Transaction</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {payments.length === 0 && (
              <tr>
                <td colSpan="6" className="text-center py-10 text-gray-500">
                  No payment history found
                </td>
              </tr>
            )}

            {payments.map((payment, index) => (
              <tr key={payment._id} className="hover">
                <td>{index + 1}</td>
                <td className="font-medium">{payment.name}</td>

                <td className="font-semibold text-success">
                  ${payment.amount}
                </td>

                <td className="text-sm text-gray-500">
                  {new Date(payment.paidAt).toLocaleDateString()}
                </td>

                <td className="font-mono text-sm truncate max-w-xs">
                  {payment.transactionId}
                </td>

                <td>
                  <button
                    onClick={() => setSelectedPayment(payment)}
                    className="btn btn-sm btn-outline"
                  >
                    <GrFormView className="text-xl" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Receipt Modal */}
      {selectedPayment && (
        <dialog open className="modal modal-bottom sm:modal-middle">
          <div className="modal-box">
            <h3 className="font-bold text-xl mb-4">Payment Receipt</h3>

            <div className="space-y-2 text-sm">
              <p><strong>Report:</strong> {selectedPayment.name}</p>
              <p><strong>Email:</strong> {selectedPayment.email}</p>
              <p><strong>Amount:</strong> ${selectedPayment.amount}</p>
              <p><strong>Status:</strong> Paid</p>
              <p>
                <strong>Date:</strong>{" "}
                {new Date(selectedPayment.paidAt).toLocaleString()}
              </p>
              <p className="break-all">
                <strong>Transaction ID:</strong>{" "}
                {selectedPayment.transactionId}
              </p>
            </div>

            <div className="modal-action">
              <button
                onClick={() => setSelectedPayment(null)}
                className="btn"
              >
                Close
              </button>
            </div>
          </div>
        </dialog>
      )}
    </div>
  );
};

export default PaymentHistory;

