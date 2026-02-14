import { createBrowserRouter } from "react-router";
import DashBoardLayout from "../layout/DashBoardLayout";
import RootLayout from "../layout/RootLayout";
import AboutUs from "../pages/AboutUs/AboutUs";
import AllReport from "../pages/AllReport/AllReport";
import Login from "../pages/Auth/Login/Login";
import Register from "../pages/Auth/Register/Register";
import CreateIssue from "../pages/CreateIssue/CreateIssue";
import ApproveStaffs from "../pages/DashBoard/ApproveStaffs/ApproveStaffs";
import AssignStaff from "../pages/DashBoard/AssignStaff/AssignStaff";
import CompletedReport from "../pages/DashBoard/CompletedReport/CompletedReport";
import MyReports from "../pages/DashBoard/MyReports/MyReports";
import PaymentCancell from "../pages/DashBoard/Payment/PaymentCancell";
import PaymentSuccess from "../pages/DashBoard/Payment/PaymentSuccess";
import PaymentHistory from "../pages/DashBoard/PaymentHistory/PaymentHistory";
import StaffTask from "../pages/DashBoard/StaffTask/StaffTask";
import UserManager from "../pages/DashBoard/UserManager/UserManager";
import Home from "../pages/Home/Home/Home";
import Impact from "../pages/Impact/Impact";
import ReportDetailPage from "../pages/ReportDetailPage/ReportDetailPage";
import Staff from "../pages/Staff/Staff";
import UserProfile from "../pages/UserProfile/UserProfile";
import AdminOnlyRoute from "./AdminOnlyRoute";
import PrivateRoute from "./PrivateRoute";
import StaffOnlyRoute from "./StaffOnlyRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "register",
        Component: Register,
      },
      {
        path: "login",
        Component: Login,
      },
      {
        path: "create-issue",
        element: (
          <PrivateRoute>
            <CreateIssue></CreateIssue>
          </PrivateRoute>
        ),
      },
      {
        path: "all-report",
        element: <AllReport></AllReport>,
      },
      {
        path: "about-us",
        Component: AboutUs,
      },
      {
        path: "impact",
        Component: Impact,
      },
      {
        path: "staff",
        element: (
          <PrivateRoute>
            <Staff></Staff>
          </PrivateRoute>
        ),
      },
      {
        path: "report-detail/:id",
        element: (
          <PrivateRoute>
            <ReportDetailPage></ReportDetailPage>
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "dashboard",
    element: (
      <PrivateRoute>
        <DashBoardLayout></DashBoardLayout>
      </PrivateRoute>
    ),
    children: [
      {
        path: "my-reports",
        Component: MyReports,
      },
      {
        path: "payment-success",
        Component: PaymentSuccess,
      },
      {
        path: "payment-cancelled",
        Component: PaymentCancell,
      },
      {
        path: "payment-history",
        Component: PaymentHistory,
      },
      {
        path: "user-profile",
        element: (
          <PrivateRoute>
            <UserProfile />
          </PrivateRoute>
        ),
      },

      // staff route only
      {
        path: "staff-task",
        element: (
          <StaffOnlyRoute>
            <StaffTask></StaffTask>
          </StaffOnlyRoute>
        ),
      },
      {
        path: "completed-report",
        element: (
          <StaffOnlyRoute>
            <CompletedReport></CompletedReport>
          </StaffOnlyRoute>
        ),
      },

      // admin route only
      {
        path: "approve-staff",
        element: (
          <AdminOnlyRoute>
            <ApproveStaffs></ApproveStaffs>
          </AdminOnlyRoute>
        ),
      },
      {
        path: "assign-staff",
        element: (
          <AdminOnlyRoute>
            <AssignStaff></AssignStaff>
          </AdminOnlyRoute>
        ),
      },
      {
        path: "user-manager",
        element: (
          <AdminOnlyRoute>
            <UserManager></UserManager>
          </AdminOnlyRoute>
        ),
      },
    ],
  },
]);
