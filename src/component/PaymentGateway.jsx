import React, { useEffect, useState } from "react";
import { 
  FaCreditCard, 
  FaCog, 
  FaChartLine, 
  FaHistory, 
  FaDownload, 
  FaSave, 
  FaPlay, 
  FaMoneyBillWave,
  FaStripe,
  FaPaypal 
} from "react-icons/fa";
import styles from "../css/PaymentGateway.module.css";

export default function AdminPaymentGateway() {
  const [tab, setTab] = useState("settings");

  const [settings, setSettings] = useState({
    stripe: true,
    razorpay: false,
    paypal: false,
    currency: "USD"
  });

  const [amount, setAmount] = useState("");
  const [gateway, setGateway] = useState("stripe");

  const [payments, setPayments] = useState([]);
  const [analytics, setAnalytics] = useState(null);

  /* ---------------- SETTINGS ---------------- */

  const saveSettings = async () => {
    // Mock API call
    await new Promise(resolve => setTimeout(resolve, 500));
    alert("Payment settings saved");
  };

  /* ---------------- STRIPE CHECKOUT ---------------- */

  const startStripeCheckout = async () => {
    alert("Redirecting to Stripe Checkout...");
  };

  /* ---------------- RAZORPAY UPI POPUP ---------------- */

  const startRazorpayUPI = async () => {
    alert("Opening Razorpay UPI Popup...");
  };

  /* ---------------- START PAYMENT ---------------- */

  const startPayment = () => {
    if (!amount) {
      alert("Enter amount");
      return;
    }

    if (gateway === "stripe") startStripeCheckout();
    if (gateway === "razorpay") startRazorpayUPI();
  };

  /* ---------------- PAYMENT LOGS ---------------- */

  const loadPayments = async () => {
    // Mock data
    setPayments([
      { id: 101, gateway: "Stripe", amount: "$50.00", status: "Success", created_at: "2024-01-10", invoice_url: "#" },
      { id: 102, gateway: "PayPal", amount: "$120.00", status: "Pending", created_at: "2024-01-12", invoice_url: "#" },
      { id: 103, gateway: "Razorpay", amount: "$35.00", status: "Success", created_at: "2024-01-15", invoice_url: "#" },
    ]);
  };

  /* ---------------- ANALYTICS ---------------- */

  const loadAnalytics = async () => {
    // Mock data
    setAnalytics({
      total_revenue: "$15,240",
      total_payments: 342,
      success_rate: 98.5
    });
  };

  useEffect(() => {
    if (tab === "logs") loadPayments();
    if (tab === "analytics") loadAnalytics();
  }, [tab]);

  /* ---------------- INVOICE DOWNLOAD ---------------- */

  const downloadInvoice = (invoiceUrl) => {
    alert("Downloading Invoice...");
  };

  /* ---------------- UI ---------------- */

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.title}>
          <FaCreditCard className="text-blue-500" />
          Payment Gateway Admin
        </div>
      </div>

      {/* Tabs */}
      <div className={styles.tabContainer}>
        <button 
          onClick={() => setTab("settings")} 
          className={`${styles.tabBtn} ${tab === "settings" ? styles.activeTab : ""}`}
        >
          <FaCog className="mr-2 inline" /> Settings
        </button>
        <button 
          onClick={() => setTab("test")} 
          className={`${styles.tabBtn} ${tab === "test" ? styles.activeTab : ""}`}
        >
          <FaPlay className="mr-2 inline" /> Test Payment
        </button>
        <button 
          onClick={() => setTab("logs")} 
          className={`${styles.tabBtn} ${tab === "logs" ? styles.activeTab : ""}`}
        >
          <FaHistory className="mr-2 inline" /> Logs
        </button>
        <button 
          onClick={() => setTab("analytics")} 
          className={`${styles.tabBtn} ${tab === "analytics" ? styles.activeTab : ""}`}
        >
          <FaChartLine className="mr-2 inline" /> Analytics
        </button>
      </div>

      {/* SETTINGS */}
      {tab === "settings" && (
        <div className={styles.card}>
          <h3 className={styles.sectionTitle}>
            <FaCog className="text-gray-400" /> Gateway Configuration
          </h3>

          <div className={styles.formGroup}>
            {["stripe", "razorpay", "paypal"].map((g) => (
              <label key={g} className={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  checked={settings[g]}
                  onChange={(e) =>
                    setSettings({ ...settings, [g]: e.target.checked })
                  }
                  className="mr-3 h-5 w-5 text-blue-600 rounded"
                />
                <span className="font-semibold text-gray-700 uppercase">{g}</span>
              </label>
            ))}
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Default Currency</label>
            <select
              value={settings.currency}
              onChange={(e) =>
                setSettings({ ...settings, currency: e.target.value })
              }
              className={styles.input3d}
            >
              <option value="USD">USD ($)</option>
              <option value="INR">INR (₹)</option>
              <option value="EUR">EUR (€)</option>
            </select>
          </div>

          <button onClick={saveSettings} className={`${styles.btn3d} ${styles.btnPrimary}`}>
            <FaSave /> Save Configuration
          </button>
        </div>
      )}

      {/* TEST PAYMENT */}
      {tab === "test" && (
        <div className={styles.card}>
          <h3 className={styles.sectionTitle}>
            <FaPlay className="text-gray-400" /> Test Transaction
          </h3>

          <div className={styles.formGroup}>
            <label className={styles.label}>Amount</label>
            <input
              type="number"
              placeholder="0.00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className={styles.input3d}
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Select Gateway</label>
            <select
              value={gateway}
              onChange={(e) => setGateway(e.target.value)}
              className={styles.input3d}
            >
              <option value="stripe">Stripe Checkout</option>
              <option value="razorpay">Razorpay UPI</option>
            </select>
          </div>

          <button onClick={startPayment} className={`${styles.btn3d} ${styles.btnPrimary}`}>
            <FaMoneyBillWave /> Process Payment
          </button>
        </div>
      )}

      {/* PAYMENT LOGS */}
      {tab === "logs" && (
        <div className={styles.tableContainer}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Gateway</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {payments.length === 0 ? (
                <tr><td colSpan="6" className="text-center p-5 text-gray-500">No logs available</td></tr>
              ) : (
                payments.map((p) => (
                  <tr key={p.id} className={styles.tableRow}>
                    <td className="font-mono text-gray-500">#{p.id}</td>
                    <td className="font-bold text-gray-700">{p.gateway}</td>
                    <td className="font-bold text-green-600">{p.amount}</td>
                    <td>
                      <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${p.status === 'Success' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                        {p.status}
                      </span>
                    </td>
                    <td className="text-gray-500">{p.created_at}</td>
                    <td>
                      <button 
                        onClick={() => downloadInvoice(p.invoice_url)}
                        className={`${styles.btn3d} ${styles.btnSecondary} text-sm py-2 px-4`}
                      >
                        <FaDownload /> Invoice
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* ANALYTICS */}
      {tab === "analytics" && analytics && (
        <div className={styles.card} style={{ maxWidth: '100%' }}>
          <h3 className={styles.sectionTitle}>
            <FaChartLine className="text-gray-400" /> Performance Overview
          </h3>

          <div className={styles.statsGrid}>
            <div className={styles.statCard}>
              <div className={styles.statValue}>{analytics.total_revenue}</div>
              <div className={styles.statLabel}>Total Revenue</div>
            </div>
            <div className={styles.statCard}>
              <div className={styles.statValue}>{analytics.total_payments}</div>
              <div className={styles.statLabel}>Transactions</div>
            </div>
            <div className={styles.statCard}>
              <div className={styles.statValue}>{analytics.success_rate}%</div>
              <div className={styles.statLabel}>Success Rate</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
