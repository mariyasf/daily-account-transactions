import {
    createBrowserRouter,
} from "react-router-dom";
import Root from "../Layouts/Root";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import Profile from "../Pages/Profile/Profile";
import PrivateRoute from "./PrivateRoute";
import Dashboard from "../Pages/Dashboard/Dashboard";
import Accounting from "../Pages/Accounting/Accounting";
import Report from "../Pages/Report/Report";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        children: [
            {
                path: "/",
                element: <Dashboard />,
            },
            {
                path: "/accounting",
                element: <Accounting />,
            },
            {
                path: "/report",
                element: <Report />,
            },
            {
                path: "/login",
                element: <Login />,
            },
            {
                path: "/register",
                element: <Register />,
            },
            {
                path: "/profile",
                element: <Profile />,

            },

        ]
    },
]);

export default router;