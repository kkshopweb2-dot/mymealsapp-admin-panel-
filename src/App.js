// src/App.js
import React, { lazy, Suspense, useState, useEffect } from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
} from "react-router-dom";

import Header from "./component/Header.jsx";
import Sidebar from "./component/Sidebar.jsx";
import PrivateRoute from "./component/PrivateRoute.jsx";

// Lazy Components
const Dashboard = lazy(() => import("./component/Dashboard/Dashboard.jsx"));


// ------------------- LAYOUT -------------------
const AppLayout = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    if (!isSidebarOpen) {
      document.body.classList.add("sidebar-closed");
    } else {
      document.body.classList.remove("sidebar-closed");
    }
  }, [isSidebarOpen]);

  return (
    <div className="app-layout">
      <Sidebar isOpen={isSidebarOpen} />
      <div className="main-content">
        <Header toggleSidebar={toggleSidebar} />
        <main className="content-area">
          <Suspense fallback={<div className="loading">Loading...</div>}>
            <Outlet />
          </Suspense>
        </main>
      </div>
    </div>
  );
};


// ------------------- ROUTER CONFIG -------------------
const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <Dashboard />, // default page
      },

      // Protected Routes (inside PrivateRoute)
      {
        element: <PrivateRoute />,
        children: [
          { path: "dashboard", element: <Dashboard /> },
        ],
      },
    ],
  },

  
]);


// ------------------- APP ROOT -------------------
function App() {
  return <RouterProvider router={router} />;
}

export default App;
