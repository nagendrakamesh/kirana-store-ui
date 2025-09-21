import React, { useState } from "react";
import EditOrderModal from "./EditOrderModal";

const OrdersPage = () => {
  const [orders, setOrders] = useState([
    {
      orderId: 1,
      customerName: "Ravi Kumar",
      customerAddress: "Hyderabad",
      items: [
        { productId: 101, productName: "Rice", quantity: 2 },
        { productId: 102, productName: "Dal", quantity: 1 },
      ],
      completed: false,
    },
  ]);

  const [products] = useState([
    { productId: 101, productName: "Rice" },
    { productId: 102, productName: "Dal" },
    { productId: 103, productName: "Sugar" },
    { productId: 104, productName: "Salt" },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const handleEdit = (order) => {
    setSelectedOrder(order);
    setShowModal(true);
  };

  const handleSave = (updatedOrder) => {
    setOrders(
      orders.map((order) =>
        order.orderId === updatedOrder.orderId ? updatedOrder : order
      )
    );
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Orders</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Customer</th>
            <th>Address</th>
            <th>Status</th>
            <th className="text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.orderId}>
              <td>{order.orderId}</td>
              <td>{order.customerName}</td>
              <td>{order.customerAddress}</td>
              <td>
                {order.completed ? (
                  <span className="badge bg-success">Completed</span>
                ) : (
                  <span className="badge bg-warning">Pending</span>
                )}
              </td>
              <td className="text-center">
                <button
                  className="btn btn-sm btn-primary me-2"
                  onClick={() => handleEdit(order)}
                >
                  Edit
                </button>
                <button className="btn btn-sm btn-danger">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedOrder && (
        <EditOrderModal
          show={showModal}
          handleClose={() => setShowModal(false)}
          order={selectedOrder}
          products={products}
          onSave={handleSave}
        />
      )}
    </div>
  );
};

export default OrdersPage;
