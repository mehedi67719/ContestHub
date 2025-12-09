import { createBrowserRouter } from "react-router";
import Root from "./Root";
import Home from "../Pages/Home";
import Allcontest from "../Pages/Allcontest";


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
        }
    ]
  },
]);