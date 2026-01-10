import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  FaEye,
  FaTruck,
  FaCheckCircle,
  FaUser,
} from "react-icons/fa";
import styles from "../css/Delivery.module.css";

const ITEMS_PER_PAGE = 5;

const Delivery = () => {
  const [deliveries, setDeliveries] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [page, setPage] = useState(1);

  const [selectedDelivery, setSelectedDelivery] = useState(null);

  // Admin only
  const userRole = "Admin";

  useEffect(() => {
    fetchDeliveries();
  }, []);

  const fetchDeliveries = async () => {
    try {
      const res = await axios.get("/api/deliveries");
      setDeliveries(res.data || mockDeliveries);
    } catch {
      setDeliveries(mockDeliveries);
    }
  };

  /* Filters */
  const filteredDeliveries = deliveries.filter((d) =>
    d.customer.toLowerCase().includes(search.toLowerCase()) &&
    (statusFilter ? d.status === statusFilter : true)
  );

  /* Pagination */
  const totalPages = Math.ceil(filteredDeliveries.length / ITEMS_PER_PAGE);
  const paginatedDeliveries = filteredDeliveries.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  const updateStatus = (id, status) => {
    setDeliveries(
      deliveries.map((d) =>
        d.id === id ? { ...d, status } : d
      )
    );
  };

  const assignRider = (id, rider) => {
    setDeliveries(
      deliveries.map((d) =>
        d.id === id ? { ...d, rider } : d
      )
    );
  };

  /* Analytics */
  const analytics = {
    total: deliveries.length,
    pending: deliveries.filter((d) => d.status === "Pending").length,
    out: deliveries.filter((d) => d.status === "Out for Delivery").length,
    delivered: deliveries.filter((d) => d.status === "Delivered").length,
  };

  return (
    <div className={styles.deliveryContainer}>
      <h1 className={styles.title}>Delivery Management</h1>

      {/* ANALYTICS */}
      <div className={styles.analyticsGrid}>
        <Stat title="Total Deliveries" value={analytics.total} />
        <Stat title="Pending" value={analytics.pending} />
        <Stat title="Out for Delivery" value={analytics.out} />
        <Stat title="Delivered" value={analytics.delivered} />
      </div>

      {/* FILTERS */}
      <div className={styles.filterCard}>
        <div className={styles.filterGrid}>
          <input
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
            <option>Packed</option>
            <option>Out for Delivery</option>
            <option>Delivered</option>
          </select>
        </div>
      </div>

      {/* TABLE */}
      <div className={styles.tableContainer}>
        <table className={styles.deliveryTable}>
          <thead className={styles.tableHeader}>
            <tr>
              <th>Order</th>
              <th>Customer</th>
              <th>Address</th>
              <th className="text-center">Rider</th>
              <th className="text-center">Status</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {paginatedDeliveries.map((d) => (
              <tr key={d.id} className={styles.tableRow}>
                <td className={styles.tableCell}>#{d.orderId}</td>
                <td className={styles.tableCell}>{d.customer}</td>
                <td className={styles.tableCell}>{d.address}</td>
                <td className={`${styles.tableCell} text-center`}>
                  {d.rider || "Unassigned"}
                </td>
                <td className={`${styles.tableCell} text-center`}>
                  <StatusBadge status={d.status} />
                </td>

                <td className={`${styles.tableCell} text-center`}>
                  <button
                    onClick={() => setSelectedDelivery(d)}
                    className={`${styles.actionBtn} ${styles.btnEye}`}
                    title="View Details"
                  >
                    <FaEye />
                  </button>

                  {d.status !== "Delivered" && (
                    <>
                      <button
                        onClick={() =>
                          updateStatus(d.id, "Out for Delivery")
                        }
                        className={`${styles.actionBtn} ${styles.btnTruck}`}
                        title="Mark Out for Delivery"
                      >
                        <FaTruck />
                      </button>

                      <button
                        onClick={() =>
                          updateStatus(d.id, "Delivered")
                        }
                        className={`${styles.actionBtn} ${styles.btnCheck}`}
                        title="Mark Delivered"
                      >
                        <FaCheckCircle />
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* PAGINATION */}
      <div className={styles.pagination}>
        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i}
            onClick={() => setPage(i + 1)}
            className={`${styles.pageBtn} ${
              page === i + 1
                ? styles.pageBtnActive
                : ""
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>

      {/* DELIVERY DETAIL MODAL */}
      {selectedDelivery && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <h3 className="text-xl font-bold mb-4 text-gray-800">
              Delivery Details
            </h3>
            <div className="space-y-3">
              <p className="flex justify-between border-b pb-2">
                <span className="text-gray-500">Order:</span>
                <span className="font-semibold">#{selectedDelivery.orderId}</span>
              </p>
              <p className="flex justify-between border-b pb-2">
                <span className="text-gray-500">Customer:</span>
                <span className="font-semibold">{selectedDelivery.customer}</span>
              </p>
              <p className="flex justify-between border-b pb-2">
                <span className="text-gray-500">Address:</span>
                <span className="font-medium">{selectedDelivery.address}</span>
              </p>
              <p className="flex justify-between items-center">
                <span className="text-gray-500">Status:</span>
                <StatusBadge status={selectedDelivery.status} />
              </p>
            </div>

            <button
              onClick={() => setSelectedDelivery(null)}
              className={styles.modalCloseBtn}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

/* Helpers */
const Stat = ({ title, value }) => (
  <div className={styles.statCard}>
    <h4 className={styles.statTitle}>{title}</h4>
    <p className={styles.statValue}>{value}</p>
  </div>
);

const StatusBadge = ({ status }) => (
  <span
    className={`${styles.statusBadge} ${
      status === "Delivered"
        ? styles.statusDelivered
        : status === "Out for Delivery"
        ? styles.statusOut
        : status === "Packed"
        ? styles.statusPacked
        : styles.statusPending
    }`}
  >
    {status}
  </span>
);

export default Delivery;

/* Mock Data */
const mockDeliveries = [
  {
    id: 1,
    orderId: 1001,
    customer: "John Doe",
    address: "12 Main Street",
    rider: "Alex",
    status: "Out for Delivery",
  },
  {
    id: 2,
    orderId: 1002,
    customer: "Sarah Smith",
    address: "45 Park Avenue",
    rider: null,
    status: "Pending",
  },
];
