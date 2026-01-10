import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  FaHome,
  FaUsers,
  FaUtensils,
  FaClipboardList,
  FaShoppingCart,
  FaCreditCard,
  FaTruck,
  FaBoxes,
  FaIndustry,
  FaShoppingBag,
  FaUserTie,
  FaMoneyBillWave,
  FaEnvelope,
  FaCogs,
  FaChevronDown,
  FaChevronUp,
  FaBars,
} from "react-icons/fa";

import "../css/elegant-sidebar.css";
import logo from "../assets/logo.png";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const [openMenu, setOpenMenu] = useState(null);

  const toggleMenu = (menu) => {
    setOpenMenu(openMenu === menu ? null : menu);
  };

  return (
    <aside className={`elegant-sidebar ${isOpen ? "open" : "closed"}`}>
      {/* Logo */}
      <div className="logo-container">
        <div className="logo">
          <img src={logo} alt="MyMeals Logo" className="logo-img" />
        </div>
        <button className="menu-toggle" onClick={toggleSidebar}>
          <FaBars />
        </button>
      </div>

      <nav className="sidebar-nav">
        <ul>
          {/* Dashboard */}
          <li>
            <NavLink to="/dashboard" className="menu-link">
              <FaHome /> <span>Dashboard</span>
            </NavLink>
          </li>

          {/* Users */}
          <li>
            <NavLink to="/users" className="menu-link">
              <FaUsers /> <span>Users</span>
            </NavLink>
          </li>

          {/* Meals */}
          <li>
            <NavLink to="/meals" className="menu-link">
              <FaUtensils /> <span>Meals</span>
            </NavLink>
          </li>

          {/* Plans */}
          <li>
            <NavLink to="/plans" className="menu-link">
              <FaClipboardList /> <span>Plans</span>
            </NavLink>
          </li>

          {/* Orders */}
          <li>
            <NavLink to="/orders" className="menu-link">
              <FaShoppingCart /> <span>Orders</span>
            </NavLink>
          </li>

          {/* Payments */}
          <li>
            <NavLink to="/payments" className="menu-link">
              <FaCreditCard /> <span>Payments</span>
            </NavLink>
          </li>

          {/* Delivery */}
          <li>
            <NavLink to="/delivery" className="menu-link">
              <FaTruck /> <span>Delivery</span>
            </NavLink>
          </li>

          {/* Stock */}
          <li>
            <NavLink to="/stock" className="menu-link">
              <FaBoxes /> <span>Stock</span>
            </NavLink>
          </li>

          {/* Production */}
          <li>
            <NavLink to="/production" className="menu-link">
              <FaIndustry /> <span>Production</span>
            </NavLink>
          </li>

          {/* Purchase */}
          <li>
            <NavLink to="/purchase" className="menu-link">
              <FaShoppingBag /> <span>Purchase</span>
            </NavLink>
          </li>

          {/* Employees */}
          <li>
            <NavLink to="/employees" className="menu-link">
              <FaUserTie /> <span>Employees</span>
            </NavLink>
          </li>

          {/* Salary */}
          <li>
            <NavLink to="/salary" className="menu-link">
              <FaMoneyBillWave /> <span>Salary</span>
            </NavLink>
          </li>

          {/* Mail */}
          <li>
            <NavLink to="/mail" className="menu-link">
              <FaEnvelope /> <span>Mail</span>
            </NavLink>
          </li>

          {/* Payment Gateway */}
          <li>
            <NavLink to="/payment-gateway" className="menu-link">
              <FaCreditCard /> <span>Payment Gateway</span>
            </NavLink>
          </li>

          {/* Settings */}
          <li>
            <NavLink to="/settings" className="menu-link">
              <FaCogs /> <span>Settings</span>
            </NavLink>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
