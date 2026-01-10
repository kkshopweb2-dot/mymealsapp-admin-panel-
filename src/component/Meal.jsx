import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import {
  FaPlus,
  FaEdit,
  FaTrash,
  FaUpload,
} from "react-icons/fa";

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
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Meals</h1>

        {userRole === "Admin" && (
          <div className="flex gap-3">
            <NavLink
              to="/meal-creation"
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded"
            >
              <FaPlus /> Add Meal
            </NavLink>

            <button className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded">
              <FaUpload /> Bulk Upload
            </button>
          </div>
        )}
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded shadow mb-4 grid grid-cols-4 gap-4">
        <input
          type="text"
          placeholder="Search meal..."
          className="border p-2 rounded"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="border p-2 rounded"
          onChange={(e) => setDietFilter(e.target.value)}
        >
          <option value="">All Diets</option>
          <option>Keto</option>
          <option>Vegan</option>
          <option>Vegetarian</option>
        </select>

        <select
          className="border p-2 rounded"
          onChange={(e) => setCategoryFilter(e.target.value)}
        >
          <option value="">All Categories</option>
          <option>Breakfast</option>
          <option>Lunch</option>
          <option>Dinner</option>
        </select>
      </div>

      {/* Table */}
      <div className="bg-white rounded shadow overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-3">Image</th>
              <th className="border p-3 text-left">Meal</th>
              <th className="border p-3">Category</th>
              <th className="border p-3">Diet</th>
              <th className="border p-3">Calories</th>
              <th className="border p-3">Price</th>
              <th className="border p-3">Status</th>
              <th className="border p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedMeals.map((meal) => (
              <tr key={meal.id}>
                <td className="border p-2 text-center">
                  <img
                    src={meal.image}
                    alt={meal.name}
                    className="w-12 h-12 rounded object-cover mx-auto"
                  />
                </td>
                <td className="border p-3">{meal.name}</td>
                <td className="border p-3 text-center">{meal.category}</td>
                <td className="border p-3 text-center">{meal.dietType}</td>
                <td className="border p-3 text-center">
                  {meal.calories} kcal
                </td>
                <td className="border p-3 text-center">${meal.price}</td>
                <td className="border p-3 text-center">
                  <span
                    className={`px-2 py-1 rounded text-sm ${
                      meal.status === "Active"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {meal.status}
                  </span>
                </td>
                <td className="border p-3 text-center space-x-3">
                  <NavLink
                    to={`/meals/edit/${meal.id}`}
                    className="text-blue-600"
                  >
                    <FaEdit />
                  </NavLink>

                  {userRole === "Admin" && (
                    <button
                      onClick={() => deleteMeal(meal.id)}
                      className="text-red-600"
                    >
                      <FaTrash />
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-end gap-2 mt-4">
        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i}
            onClick={() => setPage(i + 1)}
            className={`px-3 py-1 rounded ${
              page === i + 1
                ? "bg-blue-600 text-white"
                : "bg-gray-200"
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>
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
    image: "https://via.placeholder.com/50",
  },
  {
    id: 2,
    name: "Vegan Salad",
    category: "Dinner",
    dietType: "Vegan",
    calories: 340,
    price: 10,
    status: "Inactive",
    image: "https://via.placeholder.com/50",
  },
];
