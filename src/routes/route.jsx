import { createBrowserRouter } from "react-router";
import RootLayout from "../layout/RootLayout";
import AboutUs from "../pages/AboutUs/AboutUs";
import Login from "../pages/Auth/Login/Login";
import Register from "../pages/Auth/Register/Register";
import CreateIssue from "../pages/CreateIssue/CreateIssue";
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
]);