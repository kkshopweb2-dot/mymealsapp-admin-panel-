import React, { useState } from 'react';
import Sidebar from '../component/Sidebar';
import Header from '../component/Header';
import Dashboard from '../component/Dashboard/Dashboard';
import styles from './DashboardPage.module.css';

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
    <div className={styles.dashboardContainer}>
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      <div className={`${styles.mainContent} ${sidebarOpen ? styles.sidebarOpen : styles.sidebarClosed}`}>
        <Header 
          admin={admin} 
        />
        <Dashboard />
      </div>
    </div>
  );
};

export default DashboardPage;
