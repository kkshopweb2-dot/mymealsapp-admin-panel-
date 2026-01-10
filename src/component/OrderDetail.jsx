import React from "react";

const OrderDetail = () => {
  const order = {
    id: "ORD-10245",
    status: "Pending",
    orderDate: "2026-01-08 14:32",
    paymentStatus: "Paid",
    customer: {
      name: "John Doe",
      email: "john@example.com",
      phone: "+1 234 567 890",
      address: "123 Main Street, New York",
    },
    items: [
      {
        name: "Chicken Keto Bowl",
        plan: "Keto Plan",
        qty: 2,
        price: 10,
      },
      {
        name: "Vegan Salad",
        plan: "Vegan Plan",
        qty: 1,
        price: 10,
      },
    ],
    payment: {
      method: "Card",
      transactionId: "TXN998877",
      total: 30,
    },
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-semibold mb-6">Order Details</h1>

      {/* Order Header */}
      <div className="bg-white p-4 rounded shadow mb-6">
        <div className="flex justify-between">
          <div>
            <p><strong>Order ID:</strong> {order.id}</p>
            <p><strong>Order Date:</strong> {order.orderDate}</p>
          </div>
          <div>
            <p><strong>Status:</strong> {order.status}</p>
            <p><strong>Payment:</strong> {order.paymentStatus}</p>
          </div>
        </div>
      </div>

      {/* Customer Info */}
      <div className="bg-white p-4 rounded shadow mb-6">
        <h2 className="text-lg font-medium mb-3">Customer Information</h2>
        <p><strong>Name:</strong> {order.customer.name}</p>
        <p><strong>Email:</strong> {order.customer.email}</p>
        <p><strong>Phone:</strong> {order.customer.phone}</p>
        <p><strong>Address:</strong> {order.customer.address}</p>
      </div>

      {/* Order Items */}
      <div className="bg-white p-4 rounded shadow mb-6">
        <h2 className="text-lg font-medium mb-3">Order Summary</h2>
        <table className="w-full border">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-2 text-left">Meal</th>
              <th className="border p-2">Plan</th>
              <th className="border p-2">Qty</th>
              <th className="border p-2">Price</th>
            </tr>
          </thead>
          <tbody>
            {order.items.map((item, index) => (
              <tr key={index}>
                <td className="border p-2">{item.name}</td>
                <td className="border p-2 text-center">{item.plan}</td>
                <td className="border p-2 text-center">{item.qty}</td>
                <td className="border p-2 text-center">
                  ${item.qty * item.price}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Payment Info */}
      <div className="bg-white p-4 rounded shadow mb-6">
        <h2 className="text-lg font-medium mb-3">Payment Details</h2>
        <p><strong>Method:</strong> {order.payment.method}</p>
        <p><strong>Transaction ID:</strong> {order.payment.transactionId}</p>
        <p><strong>Total Amount:</strong> ${order.payment.total}</p>
      </div>

      {/* Actions */}
      <div className="flex gap-3">
        <button className="px-4 py-2 bg-blue-600 text-white rounded">
          Update Status
        </button>
        <button className="px-4 py-2 bg-red-600 text-white rounded">
          Cancel Order
        </button>
      </div>
    </div>
  );
};

export default OrderDetail;
