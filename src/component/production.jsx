// src/components/Production.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { 
  FaClipboardList, 
  FaSearch, 
  FaEdit, 
  FaTrash, 
  FaPlus, 
  FaSave, 
  FaBoxOpen,
  FaSpinner,
  FaCheckCircle,
  FaHourglassHalf,
  FaClock,
  FaCube,
  FaInfoCircle
} from "react-icons/fa";
import styles from "../css/Production.module.css";

const API_BASE = process.env.REACT_APP_API_BASE || "http://localhost:5000"; 
// Replace with actual backend base URL

const Production = () => {
  const [entries, setEntries] = useState([]);
  const [filter, setFilter] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Form state for add/edit
  const [form, setForm] = useState({
    id: null,
    name: "",
    quantity: "",
    status: "", // e.g., "pending", "completed", "in-progress"
  });

  // Fetch production items
  const fetchEntries = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API_BASE}/production`);
      setEntries(res.data);
    } catch (err) {
      setError("");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEntries();
  }, []);

  // Delete an item
  const handleDelete = async (id) => {
    if(!window.confirm("Are you sure you want to delete this item?")) return;
    try {
      await axios.delete(`${API_BASE}/production/${id}`);
      setEntries(entries.filter((e) => e._id !== id));
    } catch (err) {
      setError("Delete failed");
      console.error(err);
    }
  };

  // Save add/edit form
  const handleSave = async () => {
    if (!form.name || !form.quantity || !form.status) {
      alert("Please fill in all fields");
      return;
    }
    try {
      if (form.id) {
        // Update
        await axios.put(`${API_BASE}/production/${form.id}`, form);
      } else {
        // Create
        await axios.post(`${API_BASE}/production`, form);
      }
      setForm({ id: null, name: "", quantity: "", status: "" });
      fetchEntries();
    } catch (err) {
      setError("Save failed");
      console.error(err);
    }
  };

  // Filtered list
  const filtered = entries.filter((item) =>
    item.name.toLowerCase().includes(filter.toLowerCase())
  );

  const getStatusBadge = (status) => {
    const s = status.toLowerCase();
    if (s === 'completed') {
      return <span className={`${styles.badge} ${styles.statusCompleted}`}><FaCheckCircle /> Completed</span>;
    } else if (s === 'pending') {
      return <span className={`${styles.badge} ${styles.statusPending}`}><FaClock /> Pending</span>;
    } else {
      return <span className={`${styles.badge} ${styles.statusProgress}`}><FaHourglassHalf /> In-Progress</span>;
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.title}>
          <FaClipboardList className="text-blue-500" />
          Production Management
        </div>
        
        <div className={styles.searchWrapper}>
          <FaSearch className={styles.searchIcon} />
          <input
            type="text"
            placeholder="Search production items..."
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className={`${styles.input3d} ${styles.inputWithIcon}`}
          />
        </div>
      </div>

      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4 rounded shadow-md" role="alert">
          <p>{error}</p>
        </div>
      )}

      {/* Table */}
      {loading ? (
        <div className={styles.loading}>
          <FaSpinner className={styles.spinner} />
          <p>Loading production data...</p>
        </div>
      ) : (
        <div className={styles.tableContainer}>
          {filtered.length === 0 ? (
            <div className={styles.emptyState}>
              <FaBoxOpen size={50} className="mb-4 text-gray-300 mx-auto" />
              <p>No production items found.</p>
            </div>
          ) : (
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Item Name</th>
                  <th>Quantity</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((item) => (
                  <tr key={item._id} className={styles.tableRow}>
                    <td className="font-semibold text-gray-700">{item.name}</td>
                    <td className="font-mono text-blue-600 font-bold">{item.quantity}</td>
                    <td>{getStatusBadge(item.status)}</td>
                    <td>
                      <div className="flex gap-3">
                        <button
                          onClick={() =>
                            setForm({
                              id: item._id,
                              name: item.name,
                              quantity: item.quantity,
                              status: item.status,
                            })
                          }
                          className={`${styles.btn3d} ${styles.btnIcon} ${styles.btnEdit}`}
                          title="Edit"
                        >
                          <FaEdit />
                        </button>
                        <button
                          onClick={() => handleDelete(item._id)}
                          className={`${styles.btn3d} ${styles.btnIcon} ${styles.btnDelete}`}
                          title="Delete"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}

      {/* Form */}
      <div className={styles.formSection}>
        <div className={styles.formHeader}>
          {form.id ? <FaEdit className="text-yellow-500" /> : <FaPlus className="text-blue-500" />}
          {form.id ? "Edit Item" : "Add New Item"}
        </div>

        <div className={styles.formGrid}>
          <div className="flex flex-col">
            <label className="mb-2 text-sm font-bold text-gray-600 ml-2">
                <FaCube className="inline mr-1 text-gray-400"/> Item Name
            </label>
            <input
              type="text"
              placeholder="e.g. Widget X"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className={styles.input3d}
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-2 text-sm font-bold text-gray-600 ml-2">
                <FaBoxOpen className="inline mr-1 text-gray-400"/> Quantity
            </label>
            <input
              type="number"
              placeholder="0"
              value={form.quantity}
              onChange={(e) => setForm({ ...form, quantity: e.target.value })}
              className={styles.input3d}
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-2 text-sm font-bold text-gray-600 ml-2">
                <FaInfoCircle className="inline mr-1 text-gray-400"/> Status
            </label>
            <select
              value={form.status}
              onChange={(e) => setForm({ ...form, status: e.target.value })}
              className={styles.input3d}
            >
              <option value="">Select status</option>
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
              <option value="in-progress">In-Progress</option>
            </select>
          </div>
        </div>

        <div className="flex justify-end mt-6">
          <button
            onClick={handleSave}
            className={`${styles.btn3d} ${styles.btnPrimary}`}
          >
            <FaSave />
            {form.id ? "Update Item" : "Save Item"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Production;