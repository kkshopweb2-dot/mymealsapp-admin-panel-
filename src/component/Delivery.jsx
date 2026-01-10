import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  FaEye,
  FaTruck,
  FaCheckCircle,
  FaUser,
} from "react-icons/fa";

const ITEMS_PER_PAGE = 5;

const Delivery = () => {
  const [deliveries, setDeliveries] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [page, setPage] = useState(1);

  const [selectedDelivery, setSelectedDelivery] = useState(null);

  // Admin only
  const userRole = "Admin";

  useEffect(() => {
    fetchDeliveries();
  }, []);

  const fetchDeliveries = async () => {
    try {
      const res = await axios.get("/api/deliveries");
      setDeliveries(res.data || mockDeliveries);
    } catch {
      setDeliveries(mockDeliveries);
    }
  };

  /* Filters */
  const filteredDeliveries = deliveries.filter((d) =>
    d.customer.toLowerCase().includes(search.toLowerCase()) &&
    (statusFilter ? d.status === statusFilter : true)
  );

  /* Pagination */
  const totalPages = Math.ceil(filteredDeliveries.length / ITEMS_PER_PAGE);
  const paginatedDeliveries = filteredDeliveries.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  const updateStatus = (id, status) => {
    setDeliveries(
      deliveries.map((d) =>
        d.id === id ? { ...d, status } : d
      )
    );
  };

  const assignRider = (id, rider) => {
    setDeliveries(
      deliveries.map((d) =>
        d.id === id ? { ...d, rider } : d
      )
    );
  };

  /* Analytics */
  const analytics = {
    total: deliveries.length,
    pending: deliveries.filter((d) => d.status === "Pending").length,
    out: deliveries.filter((d) => d.status === "Out for Delivery").length,
    delivered: deliveries.filter((d) => d.status === "Delivered").length,
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-semibold mb-6">
        Delivery Management
      </h1>

      {/* ANALYTICS */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <Stat title="Total Deliveries" value={analytics.total} />
        <Stat title="Pending" value={analytics.pending} />
        <Stat title="Out for Delivery" value={analytics.out} />
        <Stat title="Delivered" value={analytics.delivered} />
      </div>

      {/* FILTERS */}
      <div className="bg-white p-4 rounded shadow mb-4 grid grid-cols-3 gap-4">
        <input
          placeholder="Search customer..."
          className="border p-2 rounded"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="border p-2 rounded"
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="">All Status</option>
          <option>Pending</option>
          <option>Packed</option>
          <option>Out for Delivery</option>
          <option>Delivered</option>
        </select>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded shadow overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-3">Order</th>
              <th className="border p-3">Customer</th>
              <th className="border p-3">Address</th>
              <th className="border p-3">Rider</th>
              <th className="border p-3">Status</th>
              <th className="border p-3">Actions</th>
            </tr>
          </thead>

          <tbody>
            {paginatedDeliveries.map((d) => (
              <tr key={d.id}>
                <td className="border p-3">#{d.orderId}</td>
                <td className="border p-3">{d.customer}</td>
                <td className="border p-3">{d.address}</td>
                <td className="border p-3 text-center">
                  {d.rider || "Unassigned"}
                </td>
                <td className="border p-3 text-center">
                  <StatusBadge status={d.status} />
                </td>

                <td className="border p-3 text-center space-x-3">
                  <button
                    onClick={() => setSelectedDelivery(d)}
                    className="text-indigo-600"
                  >
                    <FaEye />
                  </button>

                  {d.status !== "Delivered" && (
                    <>
                      <button
                        onClick={() =>
                          updateStatus(d.id, "Out for Delivery")
                        }
                        className="text-blue-600"
                      >
                        <FaTruck />
                      </button>

                      <button
                        onClick={() =>
                          updateStatus(d.id, "Delivered")
                        }
                        className="text-green-600"
                      >
                        <FaCheckCircle />
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* PAGINATION */}
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

      {/* DELIVERY DETAIL MODAL */}
      {selectedDelivery && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <div className="bg-white p-6 rounded w-96">
            <h3 className="font-semibold mb-3">
              Delivery Details
            </h3>
            <p><b>Order:</b> #{selectedDelivery.orderId}</p>
            <p><b>Customer:</b> {selectedDelivery.customer}</p>
            <p><b>Address:</b> {selectedDelivery.address}</p>
            <p><b>Status:</b> {selectedDelivery.status}</p>

            <button
              onClick={() => setSelectedDelivery(null)}
              className="mt-4 bg-gray-600 text-white px-4 py-1 rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

/* Helpers */
const Stat = ({ title, value }) => (
  <div className="bg-white p-4 shadow rounded">
    <h4>{title}</h4>
    <p className="text-xl font-bold">{value}</p>
  </div>
);

const StatusBadge = ({ status }) => (
  <span
    className={`px-2 py-1 rounded text-sm ${
      status === "Delivered"
        ? "bg-green-100 text-green-700"
        : status === "Out for Delivery"
        ? "bg-blue-100 text-blue-700"
        : "bg-yellow-100 text-yellow-700"
    }`}
  >
    {status}
  </span>
);

export default Delivery;

/* Mock Data */
const mockDeliveries = [
  {
    id: 1,
    orderId: 1001,
    customer: "John Doe",
    address: "12 Main Street",
    rider: "Alex",
    status: "Out for Delivery",
  },
  {
    id: 2,
    orderId: 1002,
    customer: "Sarah Smith",
    address: "45 Park Avenue",
    rider: null,
    status: "Pending",
  },
];
