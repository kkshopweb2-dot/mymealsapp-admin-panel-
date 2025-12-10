import React from "react";
import { NavLink } from "react-router-dom";
import {
  FaHome,
  FaUserAlt,
  FaRedoAlt,
  FaUtensils,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaExclamationCircle,
  FaCommentDots,
} from "react-icons/fa";
import "../css/sidebar.css";
import logo from "../assets/logo.png";   


const Sidebar = ({ isOpen }) => {
  return (
    <aside className={`sidebar ${isOpen ? "open" : "closed"}`}>
      {/* LOGO IMAGE */}
      <div className="logo">
        <img src={logo} alt="MyMeal Logo" className="logo-img" />
      </div>

      <nav className="sidebar-nav">
        <ul>
          <li>
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                isActive ? "menu-link active" : "menu-link"
              }
            >
              <FaHome /> Dashboard
            </NavLink>
          </li>

          <li>
            <a href="#" className="coming-soon">
              <FaUserAlt /> Pause and Resume
            </a>
          </li>

          <li>
            <a href="#" className="coming-soon">
              <FaRedoAlt /> Renewal
            </a>
          </li>

          <li>
            <a href="#" className="coming-soon">
              <FaUtensils /> Change Your Meal Preference
            </a>
          </li>

          <li>
            <a href="#" className="coming-soon">
              <FaMapMarkerAlt /> Change Your Delivery Location
            </a>
          </li>

          <li>
            <a href="#" className="coming-soon">
              <FaPhoneAlt /> Update Contact No.
            </a>
          </li>

          <li>
            <a href="#" className="coming-soon">
              <FaExclamationCircle /> Raise a Complaint
            </a>
          </li>

          <li>
            <a href="#" className="coming-soon">
              <FaCommentDots /> Feedback
            </a>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;