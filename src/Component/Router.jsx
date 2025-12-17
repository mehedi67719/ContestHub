import { createBrowserRouter } from "react-router";
import Root from "./Root";
import Home from "../Pages/Home";
import Allcontest from "../Pages/Allcontest";
import Leaderboard from "../Pages/Leaderboard";
import AboutUs from "../Pages/AboutUs";
import Login from "../Pages/Authentication/Login.";
import Register from "../Pages/Authentication/Register";
import Viewdetels from "../Pages/Viewdetels";
import Payment from "../Pages/Payment/Payment";
import Pymentsuccess from "../Pages/Payment/Pymentsuccess";
import Paymentcancle from "../Pages/Payment/Paymentcancle";
import DasboardRoot from "../Pages/dashboard/DasboardRoot";
import MYprofile from "../Pages/dashboard/MYprofile";
import Myparticipated from "../Pages/dashboard/Myparticipated";
import Mywinner from "../Pages/dashboard/Mywinner";
import Managecontest from "../Pages/dashboard/Managecontest";
import Manageuser from "../Pages/dashboard/MaNAGEUSER";
import AdminHome from "../Pages/dashboard/AdminHome";
import Normaluserrequest from "../Pages/dashboard/Normaluserrequest";




export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root/>,
    children:[
        {
            index:true,
            Component:Home
        },
        {
          path:"/all-contests",
          Component:Allcontest
        },
        {
          path:"/leaderboard",
          Component:Leaderboard
        },
        {
          path:"/about-us",
          Component:AboutUs
        },
        {
          path:"/login",
          Component:Login
        },
        {
          path:"/register",
          Component:Register
        },
        {
          path:`/contest/:id`,
          Component:Viewdetels
        },
        {
          path:"/payment/:id",
          Component:Payment
        },
        {
          path:"/payment-success/:id",
          Component:Pymentsuccess
        },
        {
          path:"/payment-cancel/:id",
          Component:Paymentcancle
        },
        {
          path:"/dashboard",
          element:<DasboardRoot/>,
          children:[
            {
              index:true,
              Component:MYprofile
            },
        
            {
              path:"/dashboard/participated-contests",
              Component:Myparticipated
            },
            {
              path:"/dashboard/winning-contests",
              Component:Mywinner
            },
            {
              path:"/dashboard/manage-users",
              Component:Manageuser
            },
            {
              path:"/dashboard/manage-contests",
              Component:Managecontest
            },
            {
              path:"/dashboard/admin-home",
              Component:AdminHome
            },
            {
              path:"/dashboard/normaluserrequest",
              Component:Normaluserrequest
            }
          ]
        }
    ]
  },
]);