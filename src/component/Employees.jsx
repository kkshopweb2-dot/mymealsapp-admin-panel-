// src/components/Employees.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  FaUsers,
  FaSearch,
  FaEdit,
  FaTrash,
  FaPlus,
  FaSave,
  FaSpinner,
  FaUserTie,
  FaEnvelope,
  FaPhone,
  FaIdBadge,
  FaBoxOpen
} from "react-icons/fa";
import styles from "../css/Employees.module.css";

const API_BASE = process.env.REACT_APP_API_BASE || "http://localhost:5000";

const ITEMS_PER_PAGE = 5;

const Employees = () => {
  const [employees, setEmployees] = useState([]);
  const [filter, setFilter] = useState("");
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  /* ================= FETCH ================= */
  const fetchEmployees = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API_BASE}/employees`);
      setEmployees(res.data);
    } catch (err) {
      toast.error("Failed to fetch employees");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  /* ================= DELETE ================= */
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure?")) return;
    try {
      await axios.delete(`${API_BASE}/employees/${id}`);
      toast.success("Employee deleted");
      fetchEmployees();
    } catch (err) {
      toast.error("Delete failed");
    }
  };

  /* ================= FORM ================= */
  const formik = useFormik({
    initialValues: {
      id: null,
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      role: "",
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required("First name is required"),
      lastName: Yup.string().required("Last name is required"),
      email: Yup.string().email("Invalid email").required("Email is required"),
      phone: Yup.string()
        .matches(/^[0-9]{10,15}$/, "Invalid phone number")
        .required("Phone is required"),
      role: Yup.string().required("Role is required"),
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        if (values.id) {
          await axios.put(`${API_BASE}/employees/${values.id}`, values);
          toast.success("Employee updated");
        } else {
          await axios.post(`${API_BASE}/employees`, values);
          toast.success("Employee added");
        }
        resetForm();
        fetchEmployees();
      } catch (err) {
        toast.error("Save failed");
      }
    },
  });

  /* ================= FILTER + PAGINATION ================= */
  const filtered = employees.filter(
    (e) =>
      e.firstName.toLowerCase().includes(filter.toLowerCase()) ||
      e.lastName.toLowerCase().includes(filter.toLowerCase()) ||
      e.email.toLowerCase().includes(filter.toLowerCase())
  );

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginatedData = filtered.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  return (
    <div className={styles.container}>
      <ToastContainer position="top-right" autoClose={3000} />

      <div className={styles.header}>
        <div className={styles.title}>
          <FaUsers className="text-blue-500" />
          Employee Management
        </div>

        <div className={styles.searchWrapper}>
          <FaSearch className={styles.searchIcon} />
          <input
            type="text"
            placeholder="Search employees..."
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
          <p>Loading employees...</p>
        </div>
      ) : (
        <div className={styles.tableContainer}>
          {filtered.length === 0 ? (
            <div className={styles.emptyState}>
              <FaBoxOpen size={50} className="mb-4 text-gray-300 mx-auto" />
              <p>No employees found.</p>
            </div>
          ) : (
            <>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>First</th>
                    <th>Last</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Role</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedData.map((emp) => (
                    <tr key={emp._id} className={styles.tableRow}>
                      <td className="font-semibold text-gray-700">{emp.firstName}</td>
                      <td className="text-gray-600">{emp.lastName}</td>
                      <td className="text-gray-500">{emp.email}</td>
                      <td className="text-gray-500">{emp.phone}</td>
                      <td>
                        <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-bold uppercase">
                          {emp.role}
                        </span>
                      </td>
                      <td>
                        <div className="flex gap-3">
                          <button
                            onClick={() => formik.setValues({ ...emp, id: emp._id })}
                            className={`${styles.btn3d} ${styles.btnIcon} ${styles.btnEdit}`}
                            title="Edit"
                          >
                            <FaEdit />
                          </button>
                          <button
                            onClick={() => handleDelete(emp._id)}
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

      {/* Form */}
      <div className={styles.formSection}>
        <div className={styles.formHeader}>
          {formik.values.id ? <FaEdit className="text-yellow-500" /> : <FaPlus className="text-blue-500" />}
          {formik.values.id ? "Edit Employee" : "Add Employee"}
        </div>

        <form onSubmit={formik.handleSubmit}>
          <div className={styles.formGrid}>
            <div className="flex flex-col">
              <label className="mb-2 text-sm font-bold text-gray-600 ml-2">
                <FaUserTie className="inline mr-1 text-gray-400"/> First Name
              </label>
              <input
                name="firstName"
                placeholder="First Name"
                value={formik.values.firstName}
                onChange={formik.handleChange}
                className={styles.input3d}
              />
              {formik.touched.firstName && formik.errors.firstName && (
                <p className={styles.errorText}>{formik.errors.firstName}</p>
              )}
            </div>

            <div className="flex flex-col">
              <label className="mb-2 text-sm font-bold text-gray-600 ml-2">
                <FaUserTie className="inline mr-1 text-gray-400"/> Last Name
              </label>
              <input
                name="lastName"
                placeholder="Last Name"
                value={formik.values.lastName}
                onChange={formik.handleChange}
                className={styles.input3d}
              />
              {formik.touched.lastName && formik.errors.lastName && (
                <p className={styles.errorText}>{formik.errors.lastName}</p>
              )}
            </div>

            <div className="flex flex-col">
              <label className="mb-2 text-sm font-bold text-gray-600 ml-2">
                <FaEnvelope className="inline mr-1 text-gray-400"/> Email
              </label>
              <input
                name="email"
                placeholder="Email"
                value={formik.values.email}
                onChange={formik.handleChange}
                className={styles.input3d}
              />
              {formik.touched.email && formik.errors.email && (
                <p className={styles.errorText}>{formik.errors.email}</p>
              )}
            </div>

            <div className="flex flex-col">
              <label className="mb-2 text-sm font-bold text-gray-600 ml-2">
                <FaPhone className="inline mr-1 text-gray-400"/> Phone
              </label>
              <input
                name="phone"
                placeholder="Phone"
                value={formik.values.phone}
                onChange={formik.handleChange}
                className={styles.input3d}
              />
              {formik.touched.phone && formik.errors.phone && (
                <p className={styles.errorText}>{formik.errors.phone}</p>
              )}
            </div>

            <div className="flex flex-col">
              <label className="mb-2 text-sm font-bold text-gray-600 ml-2">
                <FaIdBadge className="inline mr-1 text-gray-400"/> Role
              </label>
              <input
                name="role"
                placeholder="Role"
                value={formik.values.role}
                onChange={formik.handleChange}
                className={styles.input3d}
              />
              {formik.touched.role && formik.errors.role && (
                <p className={styles.errorText}>{formik.errors.role}</p>
              )}
            </div>
          </div>

          <div className="flex justify-end mt-6">
            <button
              type="submit"
              className={`${styles.btn3d} ${styles.btnPrimary}`}
            >
              <FaSave />
              {formik.values.id ? "Update Employee" : "Save Employee"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Employees;