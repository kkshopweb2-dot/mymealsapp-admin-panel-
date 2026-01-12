import React from 'react';
import { FaBell, FaSignOutAlt } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../redux/authSlice';
import styles from './Header/Header.module.css';

const Header = ({ admin }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <header className={styles['dashboard-header']}>

      {/* LEFT — EMPTY */}
      <div className={styles['left-section']}>
      </div>

      {/* RIGHT — Notifications + Profile + Logout */}
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

        <button className={styles['logout-btn']} onClick={handleLogout}>
          <FaSignOutAlt /> Logout
        </button>

      </div>

    </header>
  );
};

export default Header;

