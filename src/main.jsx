import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Roots from './Root/Roots.jsx';
import ErrorPage from './component/ErrorPage/ErrorPage.jsx';
import Home from './component/Home/Home.jsx';
import Login from './component/Shared/Login.jsx';
import Register from './component/Shared/Register.jsx';
import DashboardLayout from './component/DashboardLayout/DashboardLayout.jsx';
import CompanyDetailsPage from './component/DashboardPages/CompanyDetailsPage.jsx';
import AiChatBot from './component/DashboardPages/AiChatBot.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element:<Roots/> ,
    errorElement:<ErrorPage/>,
    children: [
      {
        path: "/",
        element:<Home/> ,
      },
      {
        path: "/login",
        element:<Login/> ,
      },
      {
        path: "/register",
        element:<Register/> ,
      },
    ],
  },

  {
    path:"/dashboard",
    element:( <DashboardLayout/>),
    children:[
      {
        index:true,
        element:<CompanyDetailsPage/>
      },
      {
        path:"/dashboard/chat",
        element:<AiChatBot/>
      }
    ]
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
  </StrictMode>,
)
