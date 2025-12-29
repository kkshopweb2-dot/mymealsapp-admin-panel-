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
          { path: "dashboard", element: <DashboardPage /> },
          { path: "users", element: <UserDetails /> }, // ✅ USER DETAILS ROUTE
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
