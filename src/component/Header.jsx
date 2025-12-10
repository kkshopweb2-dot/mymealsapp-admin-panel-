import React from 'react';
import { FaBars } from 'react-icons/fa';
import styles from './Header/Header.module.css';

const Header = ({ toggleSidebar }) => {
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
    </header>
  );
};

export default Header;
