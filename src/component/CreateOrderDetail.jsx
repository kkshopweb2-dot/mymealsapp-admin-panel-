import React, { useState } from "react";

const CreateOrderDetail = () => {
  const [order, setOrder] = useState({
    userId: "",
    customerName: "",
    email: "",
    phone: "",
    address: "",
    items: [],
    paymentMethod: "Card",
    status: "Pending",
  });

  const [mealInput, setMealInput] = useState({
    mealName: "",
    plan: "",
    price: "",
    qty: 1,
  });

  const addMeal = () => {
    if (!mealInput.mealName || !mealInput.price) return;

    setOrder({
      ...order,
      items: [...order.items, mealInput],
    });

    setMealInput({
      mealName: "",
      plan: "",
      price: "",
      qty: 1,
    });
  };

  const removeMeal = (index) => {
    const updatedItems = order.items.filter((_, i) => i !== index);
    setOrder({ ...order, items: updatedItems });
  };

  const calculateTotal = () => {
    return order.items.reduce(
      (total, item) => total + item.price * item.qty,
      0
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Order Created:", order);
    alert("Order created successfully!");
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-semibold mb-6">Create Order</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Customer Details */}
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-lg font-medium mb-4">Customer Details</h2>

          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Customer Name"
              className="border p-2 rounded"
              value={order.customerName}
              onChange={(e) =>
                setOrder({ ...order, customerName: e.target.value })
              }
              required
            />
            <input
              type="email"
              placeholder="Email"
              className="border p-2 rounded"
              value={order.email}
              onChange={(e) =>
                setOrder({ ...order, email: e.target.value })
              }
              required
            />
            <input
              type="text"
              placeholder="Phone"
              className="border p-2 rounded"
              value={order.phone}
              onChange={(e) =>
                setOrder({ ...order, phone: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Delivery Address"
              className="border p-2 rounded col-span-2"
              value={order.address}
              onChange={(e) =>
                setOrder({ ...order, address: e.target.value })
              }
            />
          </div>
        </div>

        {/* Meal Selection */}
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-lg font-medium mb-4">Add Meals</h2>

          <div className="grid grid-cols-4 gap-4">
            <input
              type="text"
              placeholder="Meal Name"
              className="border p-2 rounded"
              value={mealInput.mealName}
              onChange={(e) =>
                setMealInput({ ...mealInput, mealName: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Plan"
              className="border p-2 rounded"
              value={mealInput.plan}
              onChange={(e) =>
                setMealInput({ ...mealInput, plan: e.target.value })
              }
            />
            <input
              type="number"
              placeholder="Price"
              className="border p-2 rounded"
              value={mealInput.price}
              onChange={(e) =>
                setMealInput({ ...mealInput, price: Number(e.target.value) })
              }
            />
            <input
              type="number"
              min="1"
              placeholder="Qty"
              className="border p-2 rounded"
              value={mealInput.qty}
              onChange={(e) =>
                setMealInput({ ...mealInput, qty: Number(e.target.value) })
              }
            />
          </div>

          <button
            type="button"
            onClick={addMeal}
            className="mt-4 px-4 py-2 bg-green-600 text-white rounded"
          >
            Add Meal
          </button>

          {/* Meal List */}
          {order.items.length > 0 && (
            <table className="w-full mt-4 border">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border p-2">Meal</th>
                  <th className="border p-2">Plan</th>
                  <th className="border p-2">Qty</th>
                  <th className="border p-2">Price</th>
                  <th className="border p-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {order.items.map((item, index) => (
                  <tr key={index}>
                    <td className="border p-2">{item.mealName}</td>
                    <td className="border p-2 text-center">{item.plan}</td>
                    <td className="border p-2 text-center">{item.qty}</td>
                    <td className="border p-2 text-center">
                      ${item.qty * item.price}
                    </td>
                    <td className="border p-2 text-center">
                      <button
                        type="button"
                        onClick={() => removeMeal(index)}
                        className="text-red-600"
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Order Settings */}
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-lg font-medium mb-4">Order Settings</h2>

          <div className="grid grid-cols-2 gap-4">
            <select
              className="border p-2 rounded"
              value={order.paymentMethod}
              onChange={(e) =>
                setOrder({ ...order, paymentMethod: e.target.value })
              }
            >
              <option>Card</option>
              <option>Cash</option>
              <option>UPI</option>
            </select>

            <select
              className="border p-2 rounded"
              value={order.status}
              onChange={(e) =>
                setOrder({ ...order, status: e.target.value })
              }
            >
              <option>Pending</option>
              <option>Confirmed</option>
              <option>Preparing</option>
              <option>Delivered</option>
            </select>
          </div>
        </div>

        {/* Summary */}
        <div className="bg-white p-4 rounded shadow flex justify-between items-center">
          <h2 className="text-lg font-semibold">
            Total: ${calculateTotal()}
          </h2>
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white rounded"
          >
            Create Order
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateOrderDetail;
