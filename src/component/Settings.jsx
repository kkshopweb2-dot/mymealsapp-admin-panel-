import React, { useEffect, useState } from "react";
import { 
  FaCogs, FaMobileAlt, FaMoneyBillWave, FaTools, FaSave, FaSpinner,
  FaUpload, FaClock, FaLanguage, FaTrash, FaMoon, FaSun
} from "react-icons/fa";
import styles from "../css/Settings.module.css";

const STORAGE_KEY = "admin_settings_v1";

export default function Settings() {
  const [loading, setLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [logoPreview, setLogoPreview] = useState(null);
  const [languagePreview, setLanguagePreview] = useState("en");

  const defaultSettings = {
    app_name: "",
    app_email: "",
    currency: "USD",

    stripe_enabled: false,
    razorpay_enabled: false,
    paypal_enabled: false,

    maintenance_mode: false,

    default_language: "en",
    enabled_languages: ["en"],

    business_hours: {
      monday: { open: "09:00", close: "21:00", closed: false },
      tuesday: { open: "09:00", close: "21:00", closed: false },
      wednesday: { open: "09:00", close: "21:00", closed: false },
      thursday: { open: "09:00", close: "21:00", closed: false },
      friday: { open: "09:00", close: "22:00", closed: false },
      saturday: { open: "10:00", close: "22:00", closed: false },
      sunday: { open: "10:00", close: "20:00", closed: false }
    }
  };

  const [settings, setSettings] = useState(defaultSettings);

  /* ---------------- LOAD FROM LOCAL STORAGE ---------------- */

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      setSettings(parsed.settings);
      setLogoPreview(parsed.logo || null);
      setDarkMode(parsed.darkMode || false);
      setLanguagePreview(parsed.settings.default_language);
    }
    setTimeout(() => setLoading(false), 500);
  }, []);

  /* ---------------- PERSIST ---------------- */

  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ settings, logo: logoPreview, darkMode })
    );
  }, [settings, logoPreview, darkMode]);

  /* ---------------- HANDLERS ---------------- */

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings({ ...settings, [name]: type === "checkbox" ? checked : value });
  };

  /* -------- DRAG & DROP LOGO -------- */

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) setLogoPreview(URL.createObjectURL(file));
  };

  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file) setLogoPreview(URL.createObjectURL(file));
  };

  const removeLogo = () => setLogoPreview(null);

  /* -------- LANGUAGE -------- */

  const toggleLanguage = (lang) => {
    setSettings((prev) => ({
      ...prev,
      enabled_languages: prev.enabled_languages.includes(lang)
        ? prev.enabled_languages.filter((l) => l !== lang)
        : [...prev.enabled_languages, lang]
    }));
  };

  /* -------- BUSINESS HOURS -------- */

  const updateBusinessHours = (day, field, value) => {
    setSettings({
      ...settings,
      business_hours: {
        ...settings.business_hours,
        [day]: { ...settings.business_hours[day], [field]: value }
      }
    });
  };

  if (loading) {
    return (
      <div className={styles.container}>
        <FaSpinner className={styles.spinner} /> Loading...
      </div>
    );
  }

  /* ---------------- UI ---------------- */

  return (
    <div className={`${styles.container} ${darkMode ? styles.dark : ""}`}>
      <div className={styles.header}>
        <div className={styles.title}>
          <FaCogs /> System Settings
        </div>

        <button onClick={() => setDarkMode(!darkMode)} className={styles.iconBtn}>
          {darkMode ? <FaSun /> : <FaMoon />}
        </button>
      </div>

      {/* LOGO */}
      <div
        className={styles.card}
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
      >
        <h3><FaUpload /> App Logo</h3>

        {logoPreview ? (
          <>
            <img src={logoPreview} alt="Logo" height={80} />
            <button onClick={removeLogo}><FaTrash /> Remove</button>
          </>
        ) : (
          <input type="file" accept="image/*" onChange={handleLogoUpload} />
        )}
        <p>Drag & drop logo here</p>
      </div>

      {/* BUSINESS HOURS */}
      <div className={styles.card}>
        <h3 className={styles.sectionTitle}>
          <FaClock className="text-gray-400" /> Business Hours
        </h3>

        <div className={styles.hoursGrid}>
          {Object.entries(settings.business_hours).map(([day, hours]) => (
            <div key={day} className={styles.hoursRow}>
              <div className={styles.dayLabel}>{day}</div>

              <div>
                <div 
                  className={`${styles.statusToggle} ${hours.closed ? styles.statusClosed : styles.statusOpen}`}
                  onClick={() => updateBusinessHours(day, "closed", !hours.closed)}
                >
                  {hours.closed ? "Closed" : "Open"}
                </div>
              </div>

              <div className={styles.timeControls}>
                {!hours.closed ? (
                  <>
                    <input
                      type="time"
                      value={hours.open}
                      onChange={(e) => updateBusinessHours(day, "open", e.target.value)}
                      className={styles.timeInput}
                    />
                    <span className={styles.timeSeparator}>to</span>
                    <input
                      type="time"
                      value={hours.close}
                      onChange={(e) => updateBusinessHours(day, "close", e.target.value)}
                      className={styles.timeInput}
                    />
                  </>
                ) : (
                  <span className="text-gray-400 italic text-sm">Not accepting orders</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* LANGUAGE */}
      <div className={styles.card}>
        <h3><FaLanguage /> Languages</h3>

        <select
          value={settings.default_language}
          onChange={(e) => {
            setSettings({ ...settings, default_language: e.target.value });
            setLanguagePreview(e.target.value);
          }}
        >
          <option value="en">English</option>
          <option value="hi">Hindi</option>
          <option value="fr">French</option>
        </select>

        <p>Preview: <strong>{languagePreview.toUpperCase()}</strong></p>

        {["en", "hi", "fr"].map((lang) => (
          <label key={lang}>
            <input
              type="checkbox"
              checked={settings.enabled_languages.includes(lang)}
              onChange={() => toggleLanguage(lang)}
            />
            {lang.toUpperCase()}
          </label>
        ))}
      </div>

      {/* SYSTEM */}
      <div className={styles.card}>
        <h3><FaTools /> System</h3>

        <label>
          <input
            type="checkbox"
            name="maintenance_mode"
            checked={settings.maintenance_mode}
            onChange={handleChange}
          />
          Maintenance Mode
        </label>
      </div>

      <button className={`${styles.btn3d} ${styles.btnPrimary}`}>
        <FaSave /> All Changes Saved Automatically
      </button>
    </div>
  );
}
