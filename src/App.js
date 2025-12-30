// src/App.js
import React, { lazy } from "react";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import PrivateRoute from "./component/PrivateRoute.jsx";

// Lazy Components
const DashboardPage = lazy(() => import("./pages/DashboardPage.jsx"));
const LoginPage = lazy(() => import("./pages/LoginPage.jsx"));
const UserDetails = lazy(() => import("./component/UserDetails.jsx"));
const UserLifecycle = lazy(() => import("./component/UserLifecycle.jsx"));
const Dashboard = lazy(() => import("./component/Dashboard/Dashboard.jsx"));

// ------------------- ROUTER CONFIG -------------------
const router = createBrowserRouter([
  {
    path: "/",
    element: <DashboardPage />,
    children: [
      // Protected Routes
      {
        element: <PrivateRoute />,
        children: [
          { index: true, element: <Dashboard /> },
          { path: "dashboard", element: <Dashboard /> },
          { path: "users", element: <UserDetails /> }, // ✅ USER DETAILS ROUTE
          { path: "user-lifecycle", element: <UserLifecycle /> },
          { path: "order-details", element: <Dashboard /> },
          { path: "create-order", element: <Dashboard /> },
          { path: "meal-creation", element: <Dashboard /> },
          { path: "plan-master", element: <Dashboard /> },
          { path: "meal-master", element: <Dashboard /> },
          { path: "payment-table", element: <Dashboard /> },
          { path: "employee-details", element: <Dashboard /> },
          { path: "notifications", element: <Dashboard /> },
          { path: "system-configurations", element: <Dashboard /> },
        ],
      },
    ],
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
]);

// ------------------- APP ROOT -------------------
function App() {
  return <RouterProvider router={router} />;
}

export default App;
