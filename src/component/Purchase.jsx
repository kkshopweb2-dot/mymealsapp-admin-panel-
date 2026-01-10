// src/components/Purchase.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { 
  FaShoppingCart, 
  FaSearch, 
  FaEdit, 
  FaTrash, 
  FaPlus, 
  FaSave, 
  FaBoxOpen,
  FaSpinner,
  FaCalendarAlt,
  FaMoneyBillWave,
  FaCube,
  FaUserTie
} from "react-icons/fa";
import styles from "../css/Purchase.module.css";

const API_BASE = process.env.REACT_APP_API_BASE || "http://localhost:5000";

const Purchase = () => {
  const [purchases, setPurchases] = useState([]);
  const [filter, setFilter] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    id: null,
    supplier: "",
    item: "",
    quantity: "",
    cost: "",
    date: "",
  });

  // Fetch data
  const fetchPurchases = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API_BASE}/purchase`);
      setPurchases(res.data);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch purchases");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPurchases();
  }, []);

  // Delete
  const handleDelete = async (id) => {
    if(!window.confirm("Are you sure you want to delete this purchase?")) return;
    try {
      await axios.delete(`${API_BASE}/purchase/${id}`);
      setPurchases(purchases.filter((p) => p._id !== id));
    } catch (err) {
      console.error(err);
      setError("Delete failed");
    }
  };

  // Add/Edit save
  const handleSave = async () => {
    if (!form.supplier || !form.item || !form.quantity || !form.cost || !form.date) {
        alert("Please fill in all fields");
        return;
    }

    try {
      if (form.id) {
        await axios.put(`${API_BASE}/purchase/${form.id}`, form);
      } else {
        await axios.post(`${API_BASE}/purchase`, form);
      }
      setForm({ id: null, supplier: "", item: "", quantity: "", cost: "", date: "" });
      fetchPurchases();
    } catch (err) {
      console.error(err);
      setError("Save failed");
    }
  };

  const filteredList = purchases.filter((p) =>
    p.supplier.toLowerCase().includes(filter.toLowerCase()) ||
    p.item.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.title}>
          <FaShoppingCart className="text-blue-500" />
          Purchase Management
        </div>

        <div className={styles.searchWrapper}>
            <FaSearch className={styles.searchIcon} />
            <input
                type="text"
                placeholder="Search by supplier or item..."
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
            <p>Loading purchases...</p>
        </div>
      ) : (
        <div className={styles.tableContainer}>
            {filteredList.length === 0 ? (
                <div className={styles.emptyState}>
                    <FaBoxOpen size={50} className="mb-4 text-gray-300 mx-auto" />
                    <p>No purchases found.</p>
                </div>
            ) : (
                <table className={styles.table}>
                <thead>
                    <tr>
                    <th>Supplier</th>
                    <th>Item</th>
                    <th>Qty</th>
                    <th>Cost</th>
                    <th>Date</th>
                    <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredList.map((p) => (
                    <tr key={p._id} className={styles.tableRow}>
                        <td className="font-semibold text-gray-700">{p.supplier}</td>
                        <td className="text-gray-600">{p.item}</td>
                        <td className="font-mono text-blue-600 font-bold">{p.quantity}</td>
                        <td className="font-mono text-green-600 font-bold">${p.cost}</td>
                        <td className="text-gray-500">{new Date(p.date).toLocaleDateString()}</td>
                        <td>
                            <div className="flex gap-3">
                                <button
                                    onClick={() =>
                                    setForm({
                                        id: p._id,
                                        supplier: p.supplier,
                                        item: p.item,
                                        quantity: p.quantity,
                                        cost: p.cost,
                                        date: p.date.split("T")[0],
                                    })
                                    }
                                    className={`${styles.btn3d} ${styles.btnIcon} ${styles.btnEdit}`}
                                    title="Edit"
                                >
                                    <FaEdit />
                                </button>
                                <button
                                    onClick={() => handleDelete(p._id)}
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
            {form.id ? "Edit Purchase" : "Add Purchase"}
        </div>

        <div className={styles.formGrid}>
            <div className="flex flex-col">
                <label className="mb-2 text-sm font-bold text-gray-600 ml-2">
                    <FaUserTie className="inline mr-1 text-gray-400"/> Supplier
                </label>
                <input
                    type="text"
                    placeholder="Enter supplier name"
                    value={form.supplier}
                    onChange={(e) => setForm({ ...form, supplier: e.target.value })}
                    className={styles.input3d}
                />
            </div>

            <div className="flex flex-col">
                <label className="mb-2 text-sm font-bold text-gray-600 ml-2">
                    <FaCube className="inline mr-1 text-gray-400"/> Item Name
                </label>
                <input
                    type="text"
                    placeholder="Enter item name"
                    value={form.item}
                    onChange={(e) => setForm({ ...form, item: e.target.value })}
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
                    <FaMoneyBillWave className="inline mr-1 text-gray-400"/> Cost
                </label>
                <input
                    type="number"
                    placeholder="0.00"
                    value={form.cost}
                    onChange={(e) => setForm({ ...form, cost: e.target.value })}
                    className={styles.input3d}
                />
            </div>

            <div className="flex flex-col">
                <label className="mb-2 text-sm font-bold text-gray-600 ml-2">
                    <FaCalendarAlt className="inline mr-1 text-gray-400"/> Date
                </label>
                <input
                    type="date"
                    value={form.date}
                    onChange={(e) => setForm({ ...form, date: e.target.value })}
                    className={styles.input3d}
                />
            </div>
        </div>

        <div className="flex justify-end mt-6">
            <button
                onClick={handleSave}
                className={`${styles.btn3d} ${styles.btnPrimary}`}
            >
                <FaSave />
                {form.id ? "Update Purchase" : "Save Purchase"}
            </button>
        </div>
      </div>
    </div>
  );
};

export default Purchase;