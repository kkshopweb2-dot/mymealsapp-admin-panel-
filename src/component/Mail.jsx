import React, { useEffect, useState } from "react";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  FaEnvelope,
  FaPaperPlane,
  FaUsers,
  FaHeading,
  FaCommentDots,
  FaSpinner,
  FaFilePdf,
  FaHistory
} from "react-icons/fa";
import styles from "../css/Mail.module.css";

const API_BASE = process.env.REACT_APP_API_BASE || "http://localhost:5000";

const Mail = () => {
  const [employees, setEmployees] = useState([]);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);

  /* ================= FETCH ================= */
  const fetchEmployees = async () => {
    try {
      const res = await axios.get(`${API_BASE}/employees`);
      setEmployees(res.data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load employees");
    }
  };

  const fetchHistory = async () => {
    try {
      const res = await axios.get(`${API_BASE}/mail/history`);
      setHistory(res.data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load mail history");
    }
  };

  useEffect(() => {
    fetchEmployees();
    fetchHistory();
  }, []);

  /* ================= FORM ================= */
  const formik = useFormik({
    initialValues: {
      to: [],
      subject: "",
      message: "",
      template: "custom",
      attachment: null,
    },
    validationSchema: Yup.object({
      to: Yup.array().min(1, "Select at least one recipient"),
      subject: Yup.string().required("Subject is required"),
      message: Yup.string().min(10, "Message too short").required(),
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        setLoading(true);

        const formData = new FormData();
        Object.keys(values).forEach((key) => {
          if (key === "to") {
            values.to.forEach((email) =>
              formData.append("to[]", email)
            );
          } else {
            formData.append(key, values[key]);
          }
        });

        await axios.post(`${API_BASE}/mail/send`, formData);
        toast.success("Email sent successfully");
        resetForm();
        fetchHistory();
      } catch {
        toast.error("Failed to send email");
      } finally {
        setLoading(false);
      }
    },
  });

  /* ================= TEMPLATE HANDLER ================= */
  const handleTemplate = (type) => {
    const templates = {
      salary: {
        subject: "Salary Slip Notification",
        message:
          "Dear Employee,\n\nPlease find attached your salary slip.\n\nRegards,\nAdmin",
      },
      warning: {
        subject: "Official Warning",
        message:
          "This is an official warning regarding your recent conduct.\n\nAdmin",
      },
      notice: {
        subject: "Important Notice",
        message:
          "Please read this notice carefully and act accordingly.\n\nAdmin",
      },
    };

    formik.setValues({
      ...formik.values,
      subject: templates[type].subject,
      message: templates[type].message,
      template: type,
    });
  };

  return (
    <div className={styles.container}>
      <ToastContainer />

      <div className={styles.pageHeader}>
        <h1>
          <FaEnvelope />
          Mail System
        </h1>
      </div>

      {/* ================= MAIL FORM ================= */}
      <form onSubmit={formik.handleSubmit} className={styles.formCard}>
        {/* Recipients */}
        <div className={styles.formGroup}>
          <label className={styles.label}>
            <FaUsers /> Select Employees
          </label>
          <select
            multiple
            className={styles.select}
            onChange={(e) =>
              formik.setFieldValue(
                "to",
                [...e.target.selectedOptions].map((o) => o.value)
              )
            }
          >
            {employees.map((e) => (
              <option key={e._id} value={e.email}>
                {e.firstName} {e.lastName} ({e.email})
              </option>
            ))}
          </select>
        </div>

        {/* Templates */}
        <div className={styles.templateButtons}>
          <button type="button" onClick={() => handleTemplate("salary")} className={styles.btn}>
            Salary
          </button>
          <button type="button" onClick={() => handleTemplate("warning")} className={styles.btn}>
            Warning
          </button>
          <button type="button" onClick={() => handleTemplate("notice")} className={styles.btn}>
            Notice
          </button>
        </div>

        {/* Subject */}
        <div className={styles.formGroup}>
          <label className={styles.label}><FaHeading /> Subject</label>
          <input
            type="text"
            name="subject"
            placeholder="Enter subject..."
            value={formik.values.subject}
            onChange={formik.handleChange}
            className={styles.input}
          />
        </div>

        {/* Message */}
        <div className={styles.formGroup}>
          <label className={styles.label}><FaCommentDots /> Message</label>
          <textarea
            rows="5"
            name="message"
            value={formik.values.message}
            onChange={formik.handleChange}
            className={styles.textarea}
          />
        </div>

        {/* Attachment */}
        <div className={styles.formGroup}>
          <label className={styles.label}>
            <FaFilePdf /> Attach PDF
          </label>
          <input
            type="file"
            accept="application/pdf"
            onChange={(e) =>
              formik.setFieldValue("attachment", e.currentTarget.files[0])
            }
          />
        </div>

        <button type="submit" disabled={loading} className={styles.submitBtn}>
          {loading ? <FaSpinner className="animate-spin" /> : <FaPaperPlane />}
          Send Email
        </button>
      </form>

      {/* ================= HISTORY ================= */}
      <div className={styles.historySection}>
        <div className={styles.historyHeader}>
          <FaHistory /> Email History
        </div>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Recipients</th>
              <th>Subject</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {history.map((h) => (
              <tr key={h._id}>
                <td>{h.to.join(", ")}</td>
                <td>{h.subject}</td>
                <td>{new Date(h.createdAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Mail;
