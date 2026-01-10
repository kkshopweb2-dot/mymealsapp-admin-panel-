import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import {
  FaPlus,
  FaEdit,
  FaTrash,
  FaUpload,
} from "react-icons/fa";
import styles from "../css/Meal.module.css";

const ITEMS_PER_PAGE = 5;

const Meal = () => {
  const [meals, setMeals] = useState([]);
  const [search, setSearch] = useState("");
  const [dietFilter, setDietFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [page, setPage] = useState(1);

  // Simulated role (Admin / Staff)
  const userRole = "Admin";

  useEffect(() => {
    fetchMeals();
  }, []);

  const fetchMeals = async () => {
    try {
      // Replace with real API later
      const response = await axios.get("/api/meals"); // mock
      setMeals(response.data);
    } catch (error) {
      console.warn("Using mock data due to API error", error);
      setMeals(mockMeals);
    }
  };

  const deleteMeal = (id) => {
    if (window.confirm("Delete this meal?")) {
      setMeals(meals.filter((meal) => meal.id !== id));
    }
  };

  // Filtering
  const filteredMeals = meals.filter((meal) => {
    return (
      meal.name.toLowerCase().includes(search.toLowerCase()) &&
      (dietFilter ? meal.dietType === dietFilter : true) &&
      (categoryFilter ? meal.category === categoryFilter : true)
    );
  });

  // Pagination
  const totalPages = Math.ceil(filteredMeals.length / ITEMS_PER_PAGE);
  const paginatedMeals = filteredMeals.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.pageHeader}>
        <h1>Meals</h1>

        {userRole === "Admin" && (
          <div className={styles.headerActions}>
            <NavLink
              to="/meal-creation"
              className={styles.addButton}
            >
              <FaPlus /> Add Meal
            </NavLink>

            <button className={styles.uploadButton}>
              <FaUpload /> Bulk Upload
            </button>
          </div>
        )}
      </div>

      {/* Filters */}
      <div className={styles.filters}>
        <input
          type="text"
          placeholder="Search meal..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
        />

        <select
          onChange={(e) => {
            setDietFilter(e.target.value);
            setPage(1);
          }}
        >
          <option value="">All Diets</option>
          <option>Keto</option>
          <option>Vegan</option>
          <option>Vegetarian</option>
        </select>

        <select
          onChange={(e) => {
            setCategoryFilter(e.target.value);
            setPage(1);
          }}
        >
          <option value="">All Categories</option>
          <option>Breakfast</option>
          <option>Lunch</option>
          <option>Dinner</option>
        </select>
      </div>

      {/* Table */}
      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th className={styles.textCenter}>Image</th>
              <th>Meal</th>
              <th className={styles.textCenter}>Category</th>
              <th className={styles.textCenter}>Diet</th>
              <th className={styles.textCenter}>Calories</th>
              <th className={styles.textCenter}>Price</th>
              <th className={styles.textCenter}>Status</th>
              <th className={styles.textCenter}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedMeals.length === 0 ? (
              <tr>
                <td colSpan="8" className={styles.textCenter} style={{ padding: '2rem' }}>
                  No meals found
                </td>
              </tr>
            ) : (
              paginatedMeals.map((meal) => (
                <tr key={meal.id}>
                  <td className={styles.textCenter}>
                    <img
                      src={meal.image}
                      alt={meal.name}
                      className={styles.mealImage}
                      onError={(e) => { e.target.src = 'https://placehold.co/50?text=No+Image'; }}
                    />
                  </td>
                  <td>{meal.name}</td>
                  <td className={styles.textCenter}>{meal.category}</td>
                  <td className={styles.textCenter}>{meal.dietType}</td>
                  <td className={styles.textCenter}>
                    {meal.calories} kcal
                  </td>
                  <td className={styles.textCenter}>${meal.price}</td>
                  <td className={styles.textCenter}>
                    <span
                      className={`${styles.status} ${
                        meal.status === "Active"
                          ? styles.active
                          : styles.inactive
                      }`}
                    >
                      {meal.status}
                    </span>
                  </td>
                  <td className={styles.actions}>
                    <NavLink
                      to={`/meals/edit/${meal.id}`}
                      className={styles.editIcon}
                    >
                      <FaEdit />
                    </NavLink>

                    {userRole === "Admin" && (
                      <button
                        onClick={() => deleteMeal(meal.id)}
                        className={styles.deleteIcon}
                      >
                        <FaTrash />
                      </button>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className={styles.pagination}>
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => setPage(i + 1)}
              className={page === i + 1 ? styles.activePage : ""}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Meal;

/* Mock Data */
const mockMeals = [
  {
    id: 1,
    name: "Chicken Keto Bowl",
    category: "Lunch",
    dietType: "Keto",
    calories: 520,
    price: 12,
    status: "Active",
    image: "https://placehold.co/50",
  },
  {
    id: 2,
    name: "Vegan Salad",
    category: "Dinner",
    dietType: "Vegan",
    calories: 340,
    price: 10,
    status: "Inactive",
    image: "https://placehold.co/50",
  },
];
