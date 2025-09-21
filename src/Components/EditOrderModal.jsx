import React, { useState, useEffect } from "react";

const EditOrderModal = ({ show, handleClose, order, products, onSave }) => {
  const [editedOrder, setEditedOrder] = useState({ ...order });

  useEffect(() => {
    if (order) {
      setEditedOrder({ ...order });
    }
  }, [order]);

  const handleChange = (field, value) => {
    setEditedOrder({ ...editedOrder, [field]: value });
  };

  const handleItemChange = (index, field, value) => {
    const updatedItems = [...editedOrder.items];
    updatedItems[index][field] = value;
    setEditedOrder({ ...editedOrder, items: updatedItems });
  };

  const handleRemoveItem = (index) => {
    const updatedItems = [...editedOrder.items];
    updatedItems.splice(index, 1);
    setEditedOrder({ ...editedOrder, items: updatedItems });
  };

  const handleAddItem = (productId) => {
    const product = products.find((p) => p.productId === parseInt(productId));
    if (product) {
      setEditedOrder({
        ...editedOrder,
        items: [
          ...editedOrder.items,
          {
            productId: product.productId,
            productName: product.productName,
            quantity: 1,
          },
        ],
      });
    }
  };

  const handleSave = () => {
    onSave(editedOrder);
    handleClose();
  };

  return (
    <div
      className={`modal fade ${show ? "show d-block" : ""}`}
      tabIndex="-1"
      style={{ backgroundColor: show ? "rgba(0,0,0,0.5)" : "transparent" }}
    >
      <div className="modal-dialog modal-lg modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Edit Order</h5>
            <button type="button" className="btn-close" onClick={handleClose}></button>
          </div>
          <div className="modal-body">
            {/* Customer Info */}
            <div className="mb-3">
              <label className="form-label">Customer Name</label>
              <input
                type="text"
                className="form-control"
                value={editedOrder.customerName || ""}
                onChange={(e) => handleChange("customerName", e.target.value)}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Customer Address</label>
              <input
                type="text"
                className="form-control"
                value={editedOrder.customerAddress || ""}
                onChange={(e) => handleChange("customerAddress", e.target.value)}
              />
            </div>

            <div className="form-check mb-3">
              <input
                type="checkbox"
                className="form-check-input"
                id="completedCheck"
                checked={editedOrder.completed || false}
                onChange={(e) => handleChange("completed", e.target.checked)}
              />
              <label className="form-check-label" htmlFor="completedCheck">
                Mark as Completed
              </label>
            </div>

            {/* Order Items */}
            <h6>Order Items</h6>
            {editedOrder.items?.map((item, index) => (
              <div
                key={index}
                className="d-flex align-items-center justify-content-between border rounded p-2 mb-2"
              >
                <span>
                  {item.productName} (ID: {item.productId})
                </span>
                <input
                  type="number"
                  min="1"
                  className="form-control mx-2"
                  style={{ width: "80px" }}
                  value={item.quantity}
                  onChange={(e) =>
                    handleItemChange(index, "quantity", e.target.value)
                  }
                />
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => handleRemoveItem(index)}
                >
                  Remove
                </button>
              </div>
            ))}

            {/* Add new product */}
            <div className="mt-3">
              <label className="form-label">Add Product</label>
              <select
                className="form-select"
                defaultValue=""
                onChange={(e) => handleAddItem(e.target.value)}
              >
                <option value="" disabled>
                  Select a product...
                </option>
                {products.map((p) => (
                  <option key={p.productId} value={p.productId}>
                    {p.productName} (ID: {p.productId})
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="modal-footer">
            <button className="btn btn-secondary" onClick={handleClose}>
              Cancel
            </button>
            <button className="btn btn-primary" onClick={handleSave}>
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditOrderModal;
