import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  FaHome,
  FaShoppingCart,
  FaUtensils,
  FaUsers,
  FaComments,
  FaChevronDown,
  FaChevronUp,
} from "react-icons/fa";

import "../css/elegant-sidebar.css"; // Use the elegant sidebar styles
import logo from "../assets/logo.png";

const Sidebar = ({ isOpen }) => {
  const [openMenu, setOpenMenu] = useState(null);

  const toggleMenu = (menuName) => {
    setOpenMenu(openMenu === menuName ? null : menuName);
  };

  return (
    <aside className={`elegant-sidebar ${isOpen ? "open" : "closed"}`}>
      {/* LOGO */}
      <div className="logo">
        <img src={logo} alt="MyMeals Logo" className="logo-img" />
      </div>

      <nav className="sidebar-nav">
        <ul>
          {/* Dashboard */}
          <li className="menu-parent">
            <div
              className="menu-link parent"
              onClick={() => toggleMenu("dashboard")}
              aria-expanded={openMenu === "dashboard"}
            >
              <FaHome /> <span>Dashboard</span>
              {openMenu === "dashboard" ? <FaChevronUp /> : <FaChevronDown />}
            </div>
            <ul className={`submenu ${openMenu === "dashboard" ? "open" : ""}`}>
              <li>
                <NavLink to="/user-details" className="menu-link">
                  User Details
                </NavLink>
              </li>
              <li>
                <NavLink to="/user-lifecycle" className="menu-link">
                  User Lifecycle
                </NavLink>
              </li>
            </ul>
          </li>

          {/* Orders */}
          <li className="menu-parent">
            <div
              className="menu-link parent"
              onClick={() => toggleMenu("orders")}
              aria-expanded={openMenu === "orders"}
            >
              <FaShoppingCart /> <span>Orders</span>
              {openMenu === "orders" ? <FaChevronUp /> : <FaChevronDown />}
            </div>
            <ul className={`submenu ${openMenu === "orders" ? "open" : ""}`}>
              <li>
                <NavLink to="/order-details" className="menu-link">
                  Order Details
                </NavLink>
              </li>
              <li>
                <NavLink to="/create-order" className="menu-link">
                  Create Order
                </NavLink>
              </li>
              <li>
                <NavLink to="/meal-creation" className="menu-link">
                  Meal Creation
                </NavLink>
              </li>
            </ul>
          </li>

          {/* Plans & Meals */}
          <li className="menu-parent">
            <div
              className="menu-link parent"
              onClick={() => toggleMenu("plans")}
              aria-expanded={openMenu === "plans"}
            >
              <FaUtensils /> <span>Plans & Meals</span>
              {openMenu === "plans" ? <FaChevronUp /> : <FaChevronDown />}
            </div>
            <ul className={`submenu ${openMenu === "plans" ? "open" : ""}`}>
              <li>
                <NavLink to="/plan-master" className="menu-link">
                  Plan Master
                </NavLink>
              </li>
              <li>
                <NavLink to="/meal-master" className="menu-link">
                  Meal Master
                </NavLink>
              </li>
            </ul>
          </li>

          {/* Employees */}
          <li className="menu-parent">
            <div
              className="menu-link parent"
              onClick={() => toggleMenu("employees")}
              aria-expanded={openMenu === "employees"}
            >
              <FaUsers /> <span>Employees</span>
              {openMenu === "employees" ? <FaChevronUp /> : <FaChevronDown />}
            </div>
            <ul className={`submenu ${openMenu === "employees" ? "open" : ""}`}>
              <li>
                <NavLink to="/payment-table" className="menu-link">
                  Payment Table
                </NavLink>
              </li>
              <li>
                <NavLink to="/employee-details" className="menu-link">
                  Employee Details
                </NavLink>
              </li>
            </ul>
          </li>

          {/* Messages */}
          <li className="menu-parent">
            <div
              className="menu-link parent"
              onClick={() => toggleMenu("messages")}
              aria-expanded={openMenu === "messages"}
            >
              <FaComments /> <span>Messages</span>
              {openMenu === "messages" ? <FaChevronUp /> : <FaChevronDown />}
            </div>
            <ul className={`submenu ${openMenu === "messages" ? "open" : ""}`}>
              <li>
                <NavLink to="/notifications" className="menu-link">
                  Messages / Notifications
                </NavLink>
              </li>
              <li>
                <NavLink to="/system-configurations" className="menu-link">
                  System Configurations
                </NavLink>
              </li>
            </ul>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
