import React, { useState } from "react";

const MealCreation = () => {
  const [meal, setMeal] = useState({
    name: "",
    category: "Lunch",
    dietType: "Keto",
    calories: "",
    price: "",
    description: "",
    allergens: "",
    isActive: true,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setMeal({
      ...meal,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Meal Created:", meal);
    alert("Meal created successfully!");
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-semibold mb-6">Create Meal</h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow space-y-6"
      >
        {/* Basic Info */}
        <div>
          <h2 className="text-lg font-medium mb-4">Meal Information</h2>
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              name="name"
              placeholder="Meal Name"
              className="border p-2 rounded"
              value={meal.name}
              onChange={handleChange}
              required
            />

            <select
              name="category"
              className="border p-2 rounded"
              value={meal.category}
              onChange={handleChange}
            >
              <option>Breakfast</option>
              <option>Lunch</option>
              <option>Dinner</option>
            </select>

            <select
              name="dietType"
              className="border p-2 rounded"
              value={meal.dietType}
              onChange={handleChange}
            >
              <option>Keto</option>
              <option>Vegan</option>
              <option>Vegetarian</option>
              <option>High Protein</option>
              <option>Balanced</option>
            </select>

            <input
              type="number"
              name="calories"
              placeholder="Calories"
              className="border p-2 rounded"
              value={meal.calories}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Pricing */}
        <div>
          <h2 className="text-lg font-medium mb-4">Pricing</h2>
          <div className="grid grid-cols-2 gap-4">
            <input
              type="number"
              name="price"
              placeholder="Price"
              className="border p-2 rounded"
              value={meal.price}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        {/* Additional Details */}
        <div>
          <h2 className="text-lg font-medium mb-4">Additional Details</h2>
          <textarea
            name="description"
            placeholder="Meal Description"
            className="border p-2 rounded w-full"
            rows="3"
            value={meal.description}
            onChange={handleChange}
          />

          <input
            type="text"
            name="allergens"
            placeholder="Allergens (e.g. nuts, dairy)"
            className="border p-2 rounded w-full mt-3"
            value={meal.allergens}
            onChange={handleChange}
          />
        </div>

        {/* Status */}
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            name="isActive"
            checked={meal.isActive}
            onChange={handleChange}
          />
          <label className="text-sm">Meal Active</label>
        </div>

        {/* Actions */}
        <div className="flex gap-4">
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white rounded"
          >
            Save Meal
          </button>
          <button
            type="reset"
            onClick={() =>
              setMeal({
                name: "",
                category: "Lunch",
                dietType: "Keto",
                calories: "",
                price: "",
                description: "",
                allergens: "",
                isActive: true,
              })
            }
            className="px-6 py-2 bg-gray-300 rounded"
          >
            Reset
          </button>
        </div>
      </form>
    </div>
  );
};

export default MealCreation;
