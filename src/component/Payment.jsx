import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  FaEye,
  FaRedo,
  FaBan,
  FaFileInvoice,
} from "react-icons/fa";
import styles from "../css/Payment.module.css";

const ITEMS_PER_PAGE = 5;

const Payment = () => {
  const [payments, setPayments] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [page, setPage] = useState(1);

  // UI states
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [refundDays, setRefundDays] = useState(3);

  // Admin only
  const userRole = "Admin";

  useEffect(() => {
    fetchPayments();
  }, []);

  const fetchPayments = async () => {
    try {
      const res = await axios.get("/api/payments");
      setPayments(res.data || mockPayments);
    } catch {
      setPayments(mockPayments);
    }
  };

  /* Filters */
  const filteredPayments = payments.filter((p) =>
    p.customer.toLowerCase().includes(search.toLowerCase()) &&
    (statusFilter ? p.status === statusFilter : true)
  );

  /* Pagination */
  const totalPages = Math.ceil(filteredPayments.length / ITEMS_PER_PAGE);
  const paginatedPayments = filteredPayments.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  const retryPayment = (id) => alert(`Retry payment ${id}`);
  const refundPayment = (id) =>
    window.confirm("Refund payment?") && alert(`Refunded ${id}`);

  const downloadInvoice = (id) =>
    alert(`Invoice generated for ${id}`);

  /* Analytics */
  const analytics = {
    revenue: payments.reduce((a, b) => a + b.amount, 0),
    success: payments.filter((p) => p.status === "Success").length,
    failed: payments.filter((p) => p.status === "Failed").length,
    refunded: payments.filter((p) => p.status === "Refunded").length,
  };

  return (
    <div className={styles.paymentContainer}>
      <h1 className={styles.title}>Payment Management</h1>

      {/* ANALYTICS */}
      <div className={styles.analyticsGrid}>
        <Stat title="Revenue" value={`$${analytics.revenue}`} />
        <Stat title="Success" value={analytics.success} />
        <Stat title="Failed" value={analytics.failed} />
        <Stat title="Refunded" value={analytics.refunded} />
      </div>

      <div className={styles.contentGrid}>
        {/* AUTO REFUND RULE */}
        <div className={styles.card}>
          <h3 className={styles.cardTitle}>Auto Refund Rule</h3>
          <label className="block text-sm font-medium text-gray-600 mb-2">Refund if delayed (days)</label>
          <input
            type="number"
            value={refundDays}
            onChange={(e) => setRefundDays(e.target.value)}
            className={styles.inputField}
          />
          <button className={`${styles.primaryBtn} mt-4 w-full`}>
            Save Rule
          </button>
        </div>

        {/* FILTERS */}
        <div className={styles.card}>
          <h3 className={styles.cardTitle}>Search & Filter</h3>
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
              <option>Success</option>
              <option>Failed</option>
              <option>Pending</option>
              <option>Refunded</option>
            </select>
          </div>
        </div>
      </div>

      {/* TABLE */}
      <div className={styles.tableContainer}>
        <table className={styles.paymentTable}>
          <thead className={styles.tableHeader}>
            <tr>
              <th>Txn</th>
              <th>Customer</th>
              <th className="text-center">Order</th>
              <th className="text-center">Gateway</th>
              <th className="text-center">Amount</th>
              <th className="text-center">Status</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedPayments.map((pay) => (
              <tr key={pay.id} className={styles.tableRow}>
                <td className={styles.tableCell}>{pay.transactionId}</td>
                <td className={styles.tableCell}>{pay.customer}</td>
                <td className={`${styles.tableCell} text-center`}>#{pay.orderId}</td>
                <td className={`${styles.tableCell} text-center`}>{pay.gateway}</td>
                <td className={`${styles.tableCell} text-center`}>${pay.amount}</td>
                <td className={`${styles.tableCell} text-center`}>
                  <StatusBadge status={pay.status} />
                </td>
                <td className={`${styles.tableCell} text-center`}>
                  <button
                    onClick={() => setSelectedPayment(pay)}
                    className={`${styles.actionBtn} ${styles.btnEye}`}
                    title="View Details"
                  >
                    <FaEye />
                  </button>

                  <button
                    onClick={() => downloadInvoice(pay.transactionId)}
                    className={`${styles.actionBtn} ${styles.btnInvoice}`}
                    title="Invoice"
                  >
                    <FaFileInvoice />
                  </button>

                  {pay.status === "Failed" && (
                    <button
                      onClick={() => retryPayment(pay.transactionId)}
                      className={`${styles.actionBtn} ${styles.btnRetry}`}
                      title="Retry"
                    >
                      <FaRedo />
                    </button>
                  )}

                  {pay.status === "Success" && (
                    <button
                      onClick={() => refundPayment(pay.transactionId)}
                      className={`${styles.actionBtn} ${styles.btnRefund}`}
                      title="Refund"
                    >
                      <FaBan />
                    </button>
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
              page === i + 1 ? styles.pageBtnActive : ""
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>

      {/* PAYMENT DETAIL MODAL */}
      {selectedPayment && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <h3 className="text-xl font-bold mb-4 text-gray-800">Payment Detail</h3>
            <div className="space-y-3">
              <p className="flex justify-between border-b pb-2">
                <span className="text-gray-500">Txn ID:</span>
                <span className="font-semibold">{selectedPayment.transactionId}</span>
              </p>
              <p className="flex justify-between border-b pb-2">
                <span className="text-gray-500">Customer:</span>
                <span className="font-semibold">{selectedPayment.customer}</span>
              </p>
              <p className="flex justify-between border-b pb-2">
                <span className="text-gray-500">Amount:</span>
                <span className="font-bold text-lg text-blue-600">${selectedPayment.amount}</span>
              </p>
              <p className="flex justify-between items-center">
                <span className="text-gray-500">Status:</span>
                <StatusBadge status={selectedPayment.status} />
              </p>
            </div>

            <button
              onClick={() => setSelectedPayment(null)}
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
      status === "Success"
        ? styles.statusSuccess
        : status === "Failed"
        ? styles.statusFailed
        : status === "Refunded"
        ? styles.statusRefunded
        : styles.statusPending
    }`}
  >
    {status}
  </span>
);

export default Payment;

/* Mock Data */
const mockPayments = [
  {
    id: 1,
    transactionId: "TXN10001",
    orderId: 1001,
    customer: "John Doe",
    gateway: "Stripe",
    amount: 79,
    status: "Success",
  },
  {
    id: 2,
    transactionId: "TXN10002",
    orderId: 1002,
    customer: "Sarah Smith",
    gateway: "Razorpay",
    amount: 299,
    status: "Failed",
  },
];
