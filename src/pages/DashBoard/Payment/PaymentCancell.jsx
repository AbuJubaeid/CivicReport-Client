import { Link } from "react-router";

const PaymentCancell = () => {
    return (
        <div>
            <h2>Payment is cancelled</h2>
            <Link to="/dashboard/my-reports"><button className="btn btn-primary">Try Again</button></Link>
        </div>
    );
};

export default PaymentCancell;