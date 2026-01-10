import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import {
  FaPlus,
  FaEdit,
  FaTrash,
  FaLink,
  FaTags,
  FaClipboardList,
} from "react-icons/fa";
import styles from "../css/Plans.module.css";

const ITEMS_PER_PAGE = 5;

const Plans = () => {
  const [plans, setPlans] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [page, setPage] = useState(1);

  // Admin role (hardcoded for admin panel)
  const userRole = "Admin";

  useEffect(() => {
    fetchPlans();
  }, []);

  const fetchPlans = async () => {
    try {
      const response = await axios.get("/api/plans");
      setPlans(response.data || mockPlans);
    } catch {
      setPlans(mockPlans);
    }
  };

  const deletePlan = (id) => {
    if (window.confirm("Are you sure you want to delete this plan?")) {
      setPlans(plans.filter((plan) => plan.id !== id));
    }
  };

  const filteredPlans = plans.filter((plan) => {
    return (
      plan.name.toLowerCase().includes(search.toLowerCase()) &&
      (statusFilter ? plan.status === statusFilter : true)
    );
  });

  const totalPages = Math.ceil(filteredPlans.length / ITEMS_PER_PAGE);
  const paginatedPlans = filteredPlans.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.pageHeader}>
        <h1>Plan Management</h1>

        {userRole === "Admin" && (
          <div className={styles.headerActions}>
            <NavLink
              to="/plan-creation"
              className={`${styles.btn3d} ${styles.createBtn}`}
            >
              <FaPlus /> Create Plan
            </NavLink>

            <NavLink
              to="/plan-subscriptions"
              className={`${styles.btn3d} ${styles.subBtn}`}
            >
              <FaClipboardList /> Subscriptions
            </NavLink>
          </div>
        )}
      </div>

      {/* Filters */}
      <div className={styles.filters}>
        <input
          type="text"
          placeholder="Search plan..."
          className={styles.filterInput}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className={styles.filterSelect}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="">All Status</option>
          <option>Active</option>
          <option>Inactive</option>
        </select>
      </div>

      {/* Table */}
      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th className={styles.textLeft}>Plan</th>
              <th className={styles.textCenter}>Duration</th>
              <th className={styles.textCenter}>Price</th>
              <th className={styles.textCenter}>Meals / Day</th>
              <th className={styles.textCenter}>Status</th>
              <th className={styles.textCenter}>Admin Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedPlans.map((plan) => (
              <tr key={plan.id} className={styles.dataRow}>
                <td>{plan.name}</td>
                <td className={styles.textCenter}>{plan.duration} Days</td>
                <td className={styles.textCenter}>${plan.price}</td>
                <td className={styles.textCenter}>{plan.mealsPerDay}</td>
                <td className={styles.textCenter}>
                  <span
                    className={`${styles.status} ${
                      plan.status === "Active" ? styles.active : styles.inactive
                    }`}
                  >
                    {plan.status}
                  </span>
                </td>

                {/* ADMIN ACTIONS */}
                <td className={styles.textCenter}>
                  <NavLink
                    to={`/plans/edit/${plan.id}`}
                    title="Edit Plan"
                    className={`${styles.actionBtn} ${styles.edit}`}
                  >
                    <FaEdit />
                  </NavLink>

                  <NavLink
                    to={`/plans/${plan.id}/map-meals`}
                    title="Map Meals"
                    className={`${styles.actionBtn} ${styles.link}`}
                  >
                    <FaLink />
                  </NavLink>

                  <NavLink
                    to={`/plans/${plan.id}/pricing`}
                    title="Pricing Rules"
                    className={`${styles.actionBtn} ${styles.tags}`}
                  >
                    <FaTags />
                  </NavLink>

                  <NavLink
                    to={`/plans/${plan.id}/orders`}
                    title="Order-Plan Linking"
                    className={`${styles.actionBtn} ${styles.list}`}
                  >
                    <FaClipboardList />
                  </NavLink>

                  <button
                    onClick={() => deletePlan(plan.id)}
                    title="Delete Plan"
                    className={`${styles.actionBtn} ${styles.delete}`}
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className={styles.pagination}>
        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i}
            onClick={() => setPage(i + 1)}
            className={`${styles.pageBtn} ${
              page === i + 1 ? styles.activePage : ""
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Plans;

/* Mock Data */
const mockPlans = [
  {
    id: 1,
    name: "Keto Weekly Plan",
    duration: 7,
    price: 79,
    mealsPerDay: 3,
    status: "Active",
  },
  {
    id: 2,
    name: "Vegan Monthly Plan",
    duration: 30,
    price: 299,
    mealsPerDay: 2,
    status: "Inactive",
  },
];
