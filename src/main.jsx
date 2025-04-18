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
import Project from './component/DashboardPages/Project.jsx';
// import ProductDetails from './component/DashboardPages/ProjectDetails.jsx';
import ProjectDetails from './component/DashboardPages/ProjectDetails.jsx';
import ProjectEdit from './component/DashboardPages/ProjectEdit.jsx';
import AddEmploye from './component/DashboardPages/AddEmploye.jsx';
import TaskProgress from './component/DashboardPages/TaskProgress.jsx';
import Setting from './component/DashboardPages/Setting.jsx';
import ManageSubscription from './component/DashboardPages/ManageSubscription.jsx';
import { ThemeProvider } from './context/ThemeContext.jsx';
import Team from './component/DashboardPages/Team.jsx';
import Risks from './component/DashboardPages/Risks.jsx';
import AdminDashboardLayout from './component/AdminDashboard/AdminDashboardLayout/AdminDashboardLayout.jsx';
import AdminDashboard from './component/AdminDashboard/AdminDashboardPages/AdminDashboard.jsx';
import AdminUserManagement from './component/AdminDashboard/AdminDashboardSidebar/AdminUserManagement.jsx';
import AdminSubscrption from './component/AdminDashboard/AdminDashboardSidebar/AdminSubscrption.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Roots />,
    // errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
    ],
  },

  {
    path: "/dashboard",
    element: (<DashboardLayout />),
    children: [
      {
        index: true,
        element: <CompanyDetailsPage />
      },
      {
        path: "/dashboard/chat",
        element: <AiChatBot />
      },
      {
        path: "/dashboard/Project",
        element: <Project />
      },
      {
        path: "/dashboard/ProjectDetails",
        element: <ProjectDetails />
      },
      {
        path: "/dashboard/ProjectEdit",
        element: <ProjectEdit />
      },
      {
        path: "/dashboard/addEmploye",
        element: <AddEmploye />
      },
      {
        path: "/dashboard/taskProgress",
        element: <TaskProgress />
      },
      {
        path: "/dashboard/setting",
        element: <Setting />
      },
      {
        path: "/dashboard/manageSubscription",
        element: <ManageSubscription />
      },
      {
        path: "/dashboard/team",
        element: <Team />
      },
      {
        path: "/dashboard/risks",
        element: <Risks />
      },
    ]
  },
  {
    path: "/admin_dashboard",
    element: <AdminDashboardLayout />,
    children: [
      {
        index: true,
        element: <AdminDashboard />
      },
      {
        path: "/admin_dashboard/user_management",
        element: <AdminUserManagement />
      },
      {
        path: "/admin_dashboard/subscription",
        element: <AdminSubscrption />
      }
    ]
  }
]);

createRoot(document.getElementById('root')).render(
  <ThemeProvider>
    <StrictMode>
      <React.StrictMode>
        <RouterProvider router={router} />
      </React.StrictMode>
    </StrictMode>
  </ThemeProvider>,
)
