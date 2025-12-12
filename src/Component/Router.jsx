import { createBrowserRouter } from "react-router";
import Root from "./Root";
import Home from "../Pages/Home";
import Allcontest from "../Pages/Allcontest";
import Leaderboard from "../Pages/Leaderboard";
import AboutUs from "../Pages/AboutUs";
import Login from "../Pages/Authentication/Login.";
import Register from "../Pages/Authentication/Register";


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
        }
    ]
  },
]);