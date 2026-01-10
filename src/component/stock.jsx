// src/components/Stock.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "../css/Stock.module.css";

const API_BASE = process.env.REACT_APP_API_BASE || "http://localhost:5000"; 
// Adjust above to your backend base URL

const Stock = () => {
  const [items, setItems] = useState([]);
  const [filter, setFilter] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Form state
  const [form, setForm] = useState({
    id: null,
    name: "",
    quantity: "",
    price: "",
  });

  const fetchItems = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API_BASE}/stock`);
      setItems(res.data);
    } catch (err) {
      console.error(err);
      setError("Error fetching stock items");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_BASE}/stock/${id}`);
      setItems(items.filter((i) => i._id !== id));
    } catch (err) {
      console.error(err);
      setError("Delete failed");
    }
  };

  const handleSave = async () => {
    try {
      if (form.id) {
        await axios.put(`${API_BASE}/stock/${form.id}`, form);
      } else {
        await axios.post(`${API_BASE}/stock`, form);
      }
      setForm({ id: null, name: "", quantity: "", price: "" });
      fetchItems();
    } catch (err) {
      console.error(err);
      setError("Save failed");
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const filteredItems = items.filter((i) =>
    i.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Stock Management</h1>

      {error && <p className={styles.errorText}>{error}</p>}

      {/* Search */}
      <div className={styles.searchBox}>
        <input
          type="text"
          placeholder="Search stock..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className={styles.inputField}
        />
      </div>

      {/* Table */}
      {loading ? (
        <p className="text-gray-600">Loading items...</p>
      ) : (
        <div className={styles.tableContainer}>
          <table className={styles.stockTable}>
            <thead className={styles.tableHeader}>
              <tr>
                <th className={styles.tableCell}>Name</th>
                <th className={styles.tableCell}>Qty</th>
                <th className={styles.tableCell}>Price</th>
                <th className={styles.tableCell}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredItems.map((item) => (
                <tr key={item._id} className={styles.tableRow}>
                  <td className={styles.tableCell}>{item.name}</td>
                  <td className={styles.tableCell}>{item.quantity}</td>
                  <td className={styles.tableCell}>${item.price}</td>
                  <td className={styles.tableCell}>
                    <button
                      onClick={() =>
                        setForm({
                          id: item._id,
                          name: item.name,
                          quantity: item.quantity,
                          price: item.price,
                        })
                      }
                      className={`${styles.actionBtn} ${styles.editBtn}`}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(item._id)}
                      className={`${styles.actionBtn} ${styles.deleteBtn}`}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Form */}
      <div className={styles.formCard}>
        <h2 className={styles.formTitle}>
          {form.id ? "Edit Stock Item" : "Add New Stock Item"}
        </h2>
        <div className={styles.formGroup}>
          <input
            type="text"
            placeholder="Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className={styles.inputField}
          />
        </div>
        <div className={styles.formGroup}>
          <input
            type="number"
            placeholder="Quantity"
            value={form.quantity}
            onChange={(e) => setForm({ ...form, quantity: e.target.value })}
            className={styles.inputField}
          />
        </div>
        <div className={styles.formGroup}>
          <input
            type="number"
            placeholder="Price"
            value={form.price}
            onChange={(e) => setForm({ ...form, price: e.target.value })}
            className={styles.inputField}
          />
        </div>
        <button
          onClick={handleSave}
          className={styles.saveBtn}
        >
          Save Item
        </button>
      </div>
    </div>
  );
};

export default Stock;
