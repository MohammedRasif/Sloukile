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
import AdminNotification from './component/AdminDashboard/AdminDashboardSidebar/AdminNotification.jsx';
import RegisterVerification from './component/Shared/RegisterVerification.jsx';
import ForgerPasswordVerification from './component/Shared/ForgerPasswordVerification.jsx';
import ForgetPassword from './component/Shared/ForgetPassword.jsx';
import ConfirmPassword from './component/Shared/ConfrimPassowrd.jsx';
import { Provider } from 'react-redux';
import store from './Redux/store.js';
import PostProject from './component/DashboardPages/PostProject.jsx';
// import CreateProject from './component/DashboardPages/CreateProject.jsx';
// import PrivateRoutes from './Root/PrivateRoute.jsx';
// import Planning from './component/DashboardPages/Planing.jsx';

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
      {
        path: "/register_verification",
        element: <RegisterVerification />,
      },
      {
        path: "/forgetPassword_verification",
        element: <ForgerPasswordVerification />,
      },
      {
        path: "/forget_Password",
        element: <ForgetPassword />,
      },
      {
        path: "/confrim_password",
        element: <ConfirmPassword />,
      },
    ],
  },

  {
    path: "/dashboard",
    element: <DashboardLayout />,
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
      {
        path: "/dashboard/post_project",
        element: <PostProject />
      },
      // {
      //   path: "/dashboard/planing",
      //   element: <Planning />
      // },
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
      },
      {
        path: "/admin_dashboard/notification",
        element: <AdminNotification />
      },
    ]
  }
]);

createRoot(document.getElementById('root')).render(
  <ThemeProvider>
    <StrictMode>
      <Provider store={store}>
        <React.StrictMode>
          <RouterProvider router={router} />
        </React.StrictMode>
      </Provider>
    </StrictMode>
  </ThemeProvider>,
)
