import { lazy } from "react";
import { Navigate, useRoutes } from "react-router-dom";
const Home = lazy(() => import("../pages/home"))
const My = lazy(() => import("../pages/my/index.tsx"))
const Friend = lazy(() => import("../pages/friend"))
const Download = lazy(() => import("../pages/download"))
const GetRoutes = () => {
    const routes = useRoutes([
        {
            path: "/home",
            element: <Home></Home>
        }, {
            path: "/my",
            element: <My></My>
        }, {
            path: "/friend",
            element: <Friend></Friend>,
            // render:()=>{
            //     return localStorage.getItem("token") ? <Friend></Friend> : null;
            // }
        }, {
            path: "/download",
            element: <Download></Download>
        }, {
            path: "/*",
            element: <Navigate to="/home"></Navigate>
        }
    ])
    return routes;
}
export default GetRoutes;