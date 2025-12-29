import React from 'react';
import { FaBell } from 'react-icons/fa';
import styles from './Header/Header.module.css';

const Header = ({ admin }) => {

  return (
    <header className={styles['dashboard-header']}>

      {/* LEFT — EMPTY */}
      <div className={styles['left-section']}>
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

