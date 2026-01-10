import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import {
  FaEye,
  FaEdit,
  FaTrash,
  FaTruck,
} from "react-icons/fa";
import styles from "../css/Order.module.css";

const ITEMS_PER_PAGE = 5;

const Order = () => {
  const [orders, setOrders] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [page, setPage] = useState(1);

  // Admin panel role
  const userRole = "Admin";

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.get("/api/orders");
      setOrders(response.data || mockOrders);
    } catch {
      setOrders(mockOrders);
    }
  };

  const deleteOrder = (id) => {
    if (window.confirm("Delete this order?")) {
      setOrders(orders.filter((order) => order.id !== id));
    }
  };

  /* Filters */
  const filteredOrders = orders.filter((order) => {
    return (
      order.customer.toLowerCase().includes(search.toLowerCase()) &&
      (statusFilter ? order.status === statusFilter : true)
    );
  });

  /* Pagination */
  const totalPages = Math.ceil(filteredOrders.length / ITEMS_PER_PAGE);
  const paginatedOrders = filteredOrders.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  return (
    <div className={styles.orderContainer}>
      {/* Header */}
      <div className={styles.header}>
        <h1 className={styles.title}>Order Management</h1>
      </div>

      {/* Filters */}
      <div className={styles.filterCard}>
        <input
          type="text"
          placeholder="Search customer..."
          className={styles.inputField}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className={styles.selectField}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="">All Status</option>
          <option>Pending</option>
          <option>Confirmed</option>
          <option>In Production</option>
          <option>Out for Delivery</option>
          <option>Delivered</option>
          <option>Cancelled</option>
        </select>
      </div>

      {/* Table */}
      <div className={styles.tableContainer}>
        <table className={styles.orderTable}>
          <thead className={styles.tableHeader}>
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th className="text-center">Plan</th>
              <th className="text-center">Amount</th>
              <th className="text-center">Status</th>
              <th className="text-center">Order Date</th>
              <th className="text-center">Admin Actions</th>
            </tr>
          </thead>

          <tbody>
            {paginatedOrders.length > 0 ? (
              paginatedOrders.map((order) => (
                <tr key={order.id} className={styles.tableRow}>
                  <td className={styles.tableCell}>#{order.id}</td>
                  <td className={styles.tableCell}>{order.customer}</td>
                  <td className={`${styles.tableCell} text-center`}>{order.plan}</td>
                  <td className={`${styles.tableCell} text-center`}>${order.amount}</td>
                  <td className={`${styles.tableCell} text-center`}>
                    <span
                      className={`${styles.statusBadge} ${
                        order.status === "Delivered"
                          ? styles.statusDelivered
                          : order.status === "Cancelled"
                          ? styles.statusCancelled
                          : styles.statusPending
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className={`${styles.tableCell} text-center`}>{order.date}</td>

                  {/* Admin Actions */}
                  <td className={`${styles.tableCell} text-center`}>
                    <NavLink
                      to={`/orders/${order.id}`}
                      title="View Order"
                      className={`${styles.actionButton} ${styles.viewBtn}`}
                    >
                      <FaEye />
                    </NavLink>

                    <NavLink
                      to={`/orders/${order.id}/edit`}
                      title="Edit Order"
                      className={`${styles.actionButton} ${styles.editBtn}`}
                    >
                      <FaEdit />
                    </NavLink>

                    <NavLink
                      to={`/orders/${order.id}/delivery`}
                      title="Delivery Details"
                      className={`${styles.actionButton} ${styles.deliveryBtn}`}
                    >
                      <FaTruck />
                    </NavLink>

                    {userRole === "Admin" && (
                      <button
                        onClick={() => deleteOrder(order.id)}
                        title="Delete Order"
                        className={`${styles.actionButton} ${styles.deleteBtn}`}
                      >
                        <FaTrash />
                      </button>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center p-4 text-gray-500">
                  No orders found
                </td>
              </tr>
            )}
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
              page === i + 1 ? styles.pageBtnActive : ""
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Order;

/* Mock Orders */
const mockOrders = [
  {
    id: 1001,
    customer: "John Doe",
    plan: "Keto Weekly",
    amount: 79,
    status: "Pending",
    date: "2025-01-10",
  },
  {
    id: 1002,
    customer: "Sarah Smith",
    plan: "Vegan Monthly",
    amount: 299,
    status: "Delivered",
    date: "2025-01-08",
  },
];
