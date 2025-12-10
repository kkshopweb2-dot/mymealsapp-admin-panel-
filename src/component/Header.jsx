import React from 'react';
import { NavLink } from "react-router-dom";
import { FaBars } from 'react-icons/fa';
import styles from './Header/Header.module.css';
import { imageBaseURL } from '../api/baseURL';

const Header = ({ toggleSidebar, username = "User", userImage }) => {
  return (
    <header className={styles['dashboard-header']}>
      <div className={styles['left-section']}>
        <button
          type="button"
          title="menu"
          className={styles['menu-toggle']}
          style={{ color: 'black' }}
          onClick={toggleSidebar}
        >
          <FaBars />
        </button>
      </div>

      <div className={styles['header-right']}>
        {/* Hello User */}
        <div className={styles['hello-user']}>
          Hello, <strong>{username}</strong>
        </div>

        {/* Profile */}
        <NavLink to="/Profile" className={styles['profile-avatar']}>
          <img
            src={userImage ? `${imageBaseURL}${userImage}` : "https://i.pravatar.cc/40"}
            alt="User Avatar"
          />
        </NavLink>
      </div>
    </header>
  );
};

export default Header;