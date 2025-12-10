import { createBrowserRouter } from "react-router";
import Root from "./Root";
import Home from "../Pages/Home";
import Allcontest from "../Pages/Allcontest";
import Leaderboard from "../Pages/Leaderboard";
import AboutUs from "../Pages/AboutUs";


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
          path:"/allcontest",
          Component:Allcontest
        },
        {
          path:"/leaderboard",
          Component:Leaderboard
        },
        {
          path:"/about-us",
          Component:AboutUs
        }
    ]
  },
]);