import React, { useState } from 'react';
import Sidebar from '../component/Sidebar';
import Header from '../component/Header';
import Dashboard from '../component/Dashboard/Dashboard';

const DashboardPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // TEMPORARY STATIC ADMIN DATA
  const admin = {
    name: "Taslima",
    email: "admin@gmail.com",
    profileImage: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80"
  };

  return (
    <div style={{ display: 'flex' }}>
      <Sidebar isOpen={sidebarOpen} />
      <div style={{ flex: 1, marginLeft: sidebarOpen ? '250px' : '0' }}>
        <Header 
          toggleSidebar={toggleSidebar} 
          admin={admin} 
        />
        <Dashboard />
      </div>
    </div>
  );
};

export default DashboardPage;
