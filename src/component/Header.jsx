import React from 'react';
import { FaBars, FaBell } from 'react-icons/fa';
import styles from './Header/Header.module.css';

const Header = ({ toggleSidebar, title = "Dashboard", admin }) => {

  return (
    <header className={styles['dashboard-header']}>

      {/* LEFT — Sidebar Toggle + Title */}
      <div className={styles['left-section']}>
        <button
          type="button"
          title="Toggle Menu"
          className={styles['menu-toggle']}
          onClick={toggleSidebar}
        >
          <FaBars />
          Menu
        </button>

        <h2 className={styles['page-title']}>{title}</h2>
      </div>

      {/* RIGHT — Notifications + Profile */}
      <div className={styles['right-section']}>

        <div className={styles['icon-wrapper']}>
          <FaBell className={styles['icon']} />
        </div>

        {/* Show image ONLY if profileImage exists */}
        {admin?.profileImage && (
          <div className={styles['profile-wrapper']}>
            <img
              src={admin.profileImage}
              alt="Admin Profile"
              className={styles['profile-img']}
            />
          </div>
        )}

      </div>

    </header>
  );
};

export default Header;

