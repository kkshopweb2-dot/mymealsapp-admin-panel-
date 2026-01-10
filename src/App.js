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
const OrderDetail = lazy(() => import("./component/OrderDetail.jsx"));
const Dashboard = lazy(() => import("./component/Dashboard/Dashboard.jsx"));
const Meal = lazy(() => import("./component/Meal.jsx"));

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
          { path: "order-details", element: <OrderDetail /> },
          { path: "meals", element: <Meal /> },
          { path: "meal-creation", element: <Dashboard /> },
          { path: "plan-master", element: <Dashboard /> },
          { path: "meal-master", element: <Dashboard /> },
          { path: "payment-table", element: <Dashboard /> },
          { path: "payment-gateway", element: <Dashboard /> },
          { path: "employee-details", element: <Dashboard /> },
          { path: "notifications", element: <Dashboard /> },
          { path: "system-configurations", element: <Dashboard /> },
          { path: "settings", element: <Dashboard /> },
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
