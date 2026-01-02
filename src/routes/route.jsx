import { createBrowserRouter } from "react-router";
import DashBoardLayout from "../layout/DashBoardLayout";
import RootLayout from "../layout/RootLayout";
import AboutUs from "../pages/AboutUs/AboutUs";
import Login from "../pages/Auth/Login/Login";
import Register from "../pages/Auth/Register/Register";
import CreateIssue from "../pages/CreateIssue/CreateIssue";
import MyReports from "../pages/DashBoard/MyReports/MyReports";
import Payment from "../pages/DashBoard/Payment/Payment";
import PaymentCancell from "../pages/DashBoard/Payment/PaymentCancell";
import PaymentSuccess from "../pages/DashBoard/Payment/PaymentSuccess";
import Home from "../pages/Home/Home/Home";
import PrivateRoute from "./PrivateRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
        {
            index: true,
            Component: Home
        },
        {
            path: 'register',
            Component: Register,
        },
        {
            path: 'login',
            Component: Login,
        },
        {
          path: 'create-issue',
          element: <PrivateRoute><CreateIssue></CreateIssue></PrivateRoute>
        },
        {
          path: 'about-us',
          Component: AboutUs
        },
    ]
  },
  {
    path: 'dashboard',
    element: <PrivateRoute><DashBoardLayout></DashBoardLayout></PrivateRoute>,
    children:[
      {
        path: 'my-reports',
        Component: MyReports
      },
      {
        path: 'payment/:reportId',
        Component: Payment
      },
      {
        path: 'payment-success',
        Component: PaymentSuccess
      },
      {
        path: 'payment-cancelled',
        Component: PaymentCancell
      },
    ]
  }
]);