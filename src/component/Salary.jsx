// src/components/Salary.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  FaMoneyCheckAlt,
  FaSearch,
  FaEdit,
  FaTrash,
  FaPlus,
  FaSave,
  FaSpinner,
  FaUserTie,
  FaCalendarAlt,
  FaMoneyBillWave,
  FaCheckCircle,
  FaClock,
  FaBoxOpen,
  FaInfoCircle
} from "react-icons/fa";
import styles from "../css/Salary.module.css";

const API_BASE = process.env.REACT_APP_API_BASE || "http://localhost:5000";
const ITEMS_PER_PAGE = 5;

const Salary = () => {
  const [salaries, setSalaries] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [filter, setFilter] = useState("");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  /* ================= FETCH ================= */
  const fetchSalaries = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API_BASE}/salary`);
      setSalaries(res.data);
    } catch {
      toast.error("Failed to fetch salaries");
    } finally {
      setLoading(false);
    }
  };

  const fetchEmployees = async () => {
    try {
      const res = await axios.get(`${API_BASE}/employees`);
      setEmployees(res.data);
    } catch {
      toast.error("Failed to fetch employees");
    }
  };

  useEffect(() => {
    fetchSalaries();
    fetchEmployees();
  }, []);

  /* ================= DELETE ================= */
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this salary record?")) return;
    try {
      await axios.delete(`${API_BASE}/salary/${id}`);
      toast.success("Salary record deleted");
      fetchSalaries();
    } catch {
      toast.error("Delete failed");
    }
  };

  /* ================= FORM ================= */
  const formik = useFormik({
    initialValues: {
      id: null,
      employeeId: "",
      month: "",
      amount: "",
      status: "paid",
    },
    validationSchema: Yup.object({
      employeeId: Yup.string().required("Employee is required"),
      month: Yup.string().required("Month is required"),
      amount: Yup.number().positive().required("Amount is required"),
      status: Yup.string().required(),
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        if (values.id) {
          await axios.put(`${API_BASE}/salary/${values.id}`, values);
          toast.success("Salary updated");
        } else {
          await axios.post(`${API_BASE}/salary`, values);
          toast.success("Salary added");
        }
        resetForm();
        fetchSalaries();
      } catch {
        toast.error("Save failed");
      }
    },
  });

  /* ================= FILTER + PAGINATION ================= */
  const filtered = salaries.filter(
    (s) =>
      s.employeeName?.toLowerCase().includes(filter.toLowerCase()) ||
      s.month.includes(filter)
  );

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  const getStatusBadge = (status) => {
    const s = status.toLowerCase();
    if (s === 'paid') {
      return <span className={`${styles.badge} ${styles.statusPaid}`}><FaCheckCircle /> Paid</span>;
    } else {
      return <span className={`${styles.badge} ${styles.statusPending}`}><FaClock /> Pending</span>;
    }
  };

  return (
    <div className={styles.container}>
      <ToastContainer position="top-right" autoClose={3000} />

      <div className={styles.header}>
        <div className={styles.title}>
          <FaMoneyCheckAlt className="text-blue-500" />
          Salary Management
        </div>

        <div className={styles.searchWrapper}>
          <FaSearch className={styles.searchIcon} />
          <input
            type="text"
            placeholder="Search by employee or month..."
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className={`${styles.input3d} ${styles.inputWithIcon}`}
          />
        </div>
      </div>

      {/* Table */}
      {loading ? (
        <div className={styles.loading}>
          <FaSpinner className={styles.spinner} />
          <p>Loading salary data...</p>
        </div>
      ) : (
        <div className={styles.tableContainer}>
          {filtered.length === 0 ? (
            <div className={styles.emptyState}>
              <FaBoxOpen size={50} className="mb-4 text-gray-300 mx-auto" />
              <p>No salary records found.</p>
            </div>
          ) : (
            <>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Employee</th>
                    <th>Month</th>
                    <th>Amount</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {paginated.map((sal) => (
                    <tr key={sal._id} className={styles.tableRow}>
                      <td className="font-semibold text-gray-700">{sal.employeeName}</td>
                      <td className="text-gray-600 font-mono">{sal.month}</td>
                      <td className="font-bold text-green-600 font-mono">${sal.amount}</td>
                      <td>{getStatusBadge(sal.status)}</td>
                      <td>
                        <div className="flex gap-3">
                          <button
                            onClick={() =>
                              formik.setValues({
                                id: sal._id,
                                employeeId: sal.employeeId,
                                month: sal.month,
                                amount: sal.amount,
                                status: sal.status,
                              })
                            }
                            className={`${styles.btn3d} ${styles.btnIcon} ${styles.btnEdit}`}
                            title="Edit"
                          >
                            <FaEdit />
                          </button>
                          <button
                            onClick={() => handleDelete(sal._id)}
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

              {/* Pagination */}
              {totalPages > 1 && (
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
              )}
            </>
          )}
        </div>
      )}

      {/* Form Section */}
      <div className={styles.formSection}>
        <div className={styles.formHeader}>
          {formik.values.id ? <FaEdit className="text-yellow-500" /> : <FaPlus className="text-blue-500" />}
          {formik.values.id ? "Edit Salary Record" : "Add Salary Record"}
        </div>

        <form onSubmit={formik.handleSubmit}>
          <div className={styles.formGrid}>
            {/* Employee */}
            <div className="flex flex-col">
              <label className="mb-2 text-sm font-bold text-gray-600 ml-2">
                <FaUserTie className="inline mr-1 text-gray-400"/> Employee
              </label>
              <select
                name="employeeId"
                value={formik.values.employeeId}
                onChange={formik.handleChange}
                className={styles.input3d}
              >
                <option value="">Select Employee</option>
                {employees.map((e) => (
                  <option key={e._id} value={e._id}>
                    {e.firstName} {e.lastName}
                  </option>
                ))}
              </select>
              {formik.touched.employeeId && formik.errors.employeeId && (
                <p className={styles.errorText}>{formik.errors.employeeId}</p>
              )}
            </div>

            {/* Month */}
            <div className="flex flex-col">
              <label className="mb-2 text-sm font-bold text-gray-600 ml-2">
                <FaCalendarAlt className="inline mr-1 text-gray-400"/> Month
              </label>
              <input
                type="month"
                name="month"
                value={formik.values.month}
                onChange={formik.handleChange}
                className={styles.input3d}
              />
              {formik.touched.month && formik.errors.month && (
                <p className={styles.errorText}>{formik.errors.month}</p>
              )}
            </div>

            {/* Amount */}
            <div className="flex flex-col">
              <label className="mb-2 text-sm font-bold text-gray-600 ml-2">
                <FaMoneyBillWave className="inline mr-1 text-gray-400"/> Amount
              </label>
              <input
                type="number"
                name="amount"
                placeholder="0.00"
                value={formik.values.amount}
                onChange={formik.handleChange}
                className={styles.input3d}
              />
              {formik.touched.amount && formik.errors.amount && (
                <p className={styles.errorText}>{formik.errors.amount}</p>
              )}
            </div>

            {/* Status */}
            <div className="flex flex-col">
              <label className="mb-2 text-sm font-bold text-gray-600 ml-2">
                <FaInfoCircle className="inline mr-1 text-gray-400"/> Payment Status
              </label>
              <select
                name="status"
                value={formik.values.status}
                onChange={formik.handleChange}
                className={styles.input3d}
              >
                <option value="paid">Paid</option>
                <option value="pending">Pending</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end mt-6">
            <button
              type="submit"
              className={`${styles.btn3d} ${styles.btnPrimary}`}
            >
              <FaSave />
              {formik.values.id ? "Update Salary" : "Save Salary"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Salary;