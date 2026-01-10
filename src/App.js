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
const Plans = lazy(() => import("./component/Plans.jsx"));
const Order = lazy(() => import("./component/Order.jsx"));
const Payment = lazy(() => import("./component/Payment.jsx"));
const Delivery = lazy(() => import("./component/Delivery.jsx"));
const Stock = lazy(() => import("./component/stock.jsx"));
const Production = lazy(() => import("./component/production.jsx"));
const Purchase = lazy(() => import("./component/Purchase.jsx"));
const Employees = lazy(() => import("./component/Employees.jsx"));
const Salary = lazy(() => import("./component/Salary.jsx"));
const Mail = lazy(() => import("./component/Mail.jsx"));

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
          { path: "orders", element: <Order /> },
          { path: "payments", element: <Payment /> },
          { path: "delivery", element: <Delivery /> },
          { path: "stock", element: <Stock /> },
          { path: "production", element: <Production /> },
          { path: "purchase", element: <Purchase /> },
          { path: "employees", element: <Employees /> },
          { path: "salary", element: <Salary /> },
          { path: "mail", element: <Mail /> },
          { path: "meals", element: <Meal /> },
          { path: "meal-creation", element: <Dashboard /> },
          { path: "plans", element: <Plans /> },
          { path: "plan-master", element: <Plans /> },
          { path: "meal-master", element: <Dashboard /> },
          { path: "payment-table", element: <Payment /> },
          { path: "payment-gateway", element: <Dashboard /> },
          { path: "employee-details", element: <Employees /> },
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
