import { createBrowserRouter } from "react-router";
import RootLayout from "../layout/RootLayout";
import Login from "../pages/Auth/Login/Login";
import Register from "../pages/Auth/Register/Register";
import Home from "../pages/Home/Home/Home";

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
    ]
  },
]);