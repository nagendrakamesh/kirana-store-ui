import React, { useState } from "react";
import { FaPlus } from "react-icons/fa";

const ProductStockPage = () => {
  const [search, setSearch] = useState("");
  const [productStocks, setProductStocks] = useState([
    {
      stockId: 1,
      productName: "Basmati Rice",
      productId: "P1001",
      supplierId: "S2001",
      supplierName: "Ramesh Traders",
      supplierPhone: "9876543210",
      price: 1200,
      quantity: 50,
    },
    {
      stockId: 2,
      productName: "Tur Dal",
      productId: "P1002",
      supplierId: "S2002",
      supplierName: "Suresh Wholesalers",
      supplierPhone: "9123456780",
      price: 95,
      quantity: 120,
    },
    {
      stockId: 3,
      productName: "Sunflower Oil",
      productId: "P1003",
      supplierId: "S2003",
      supplierName: "Annapurna Suppliers",
      supplierPhone: "9988776655",
      price: 160,
      quantity: 80,
    },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [newStock, setNewStock] = useState({
    stockId: "",
    productName: "",
    productId: "",
    supplierId: "",
    supplierName: "",
    supplierPhone: "",
    price: "",
    quantity: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewStock((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddStock = () => {
    if (!newStock.productName || !newStock.productId) {
      alert("Please fill required fields (Product Name & ID).");
      return;
    }
    setProductStocks((prev) => [
      ...prev,
      { ...newStock, stockId: prev.length + 1 },
    ]);
    setNewStock({
      stockId: "",
      productName: "",
      productId: "",
      supplierId: "",
      supplierName: "",
      supplierPhone: "",
      price: "",
      quantity: "",
    });
    setShowModal(false);
  };

  const filteredStocks = productStocks.filter((stock) =>
    [stock.productName, stock.productId, stock.supplierName, stock.supplierPhone]
      .some((field) =>
        field.toString().toLowerCase().includes(search.toLowerCase())
      )
  );

  return (
    <div className="container py-4">
      {/* Title with margin-top */}
      <h2 className="text-center fw-bold mb-4 mt-5">Product Stock</h2>

      {/* Search Box */}
      <div className="mb-4 d-flex justify-content-center">
        <input
          type="text"
          className="form-control w-50"
          placeholder="Search by Product Name, ID, Supplier Name, or Phone"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Stock Cards */}
      <div className="row">
        {filteredStocks.map((stock) => (
          <div className="col-12 mb-3" key={stock.stockId}>
            <div className="card shadow-sm border-0">
              <div className="card-body py-3 d-flex justify-content-between align-items-center">
                <div>
                  <h6 className="fw-bold mb-1">{stock.productName}</h6>
                  <div className="text-muted small">
                    <span className="me-3">
                      <strong>Stock ID:</strong> {stock.stockId}
                    </span>
                    <span className="me-3">
                      <strong>Product ID:</strong> {stock.productId}
                    </span>
                    <span className="me-3">
                      <strong>Supplier ID:</strong> {stock.supplierId}
                    </span>
                  </div>
                  <div className="text-muted small mt-1">
                    <span className="me-3">
                      <strong>Supplier:</strong> {stock.supplierName}
                    </span>
                    <span>
                      <strong>Phone:</strong> {stock.supplierPhone}
                    </span>
                  </div>
                </div>
                <div className="text-end">
                  <div>
                    <strong>₹{stock.price}</strong>
                  </div>
                  <div className="text-muted small">Qty: {stock.quantity}</div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Floating Add Button */}
      <button
        className="btn btn-success shadow d-flex align-items-center justify-content-center"
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          width: "50px",
          height: "50px",
          borderRadius: "8px",
          fontSize: "18px",
        }}
        onClick={() => setShowModal(true)}
      >
        <FaPlus />
      </button>

      {/* Add Stock Modal */}
      {showModal && (
        <div
          className="modal fade show"
          style={{ display: "block", background: "rgba(0,0,0,0.5)" }}
          tabIndex="-1"
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Add Product Stock</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <input
                  type="text"
                  name="productName"
                  value={newStock.productName}
                  onChange={handleChange}
                  className="form-control mb-2"
                  placeholder="Product Name"
                />
                <input
                  type="text"
                  name="productId"
                  value={newStock.productId}
                  onChange={handleChange}
                  className="form-control mb-2"
                  placeholder="Product ID"
                />
                <input
                  type="text"
                  name="supplierId"
                  value={newStock.supplierId}
                  onChange={handleChange}
                  className="form-control mb-2"
                  placeholder="Supplier ID"
                />
                <input
                  type="text"
                  name="supplierName"
                  value={newStock.supplierName}
                  onChange={handleChange}
                  className="form-control mb-2"
                  placeholder="Supplier Name"
                />
                <input
                  type="text"
                  name="supplierPhone"
                  value={newStock.supplierPhone}
                  onChange={handleChange}
                  className="form-control mb-2"
                  placeholder="Supplier Phone"
                />
                <input
                  type="number"
                  name="price"
                  value={newStock.price}
                  onChange={handleChange}
                  className="form-control mb-2"
                  placeholder="Price"
                />
                <input
                  type="number"
                  name="quantity"
                  value={newStock.quantity}
                  onChange={handleChange}
                  className="form-control mb-2"
                  placeholder="Quantity"
                />
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
                <button className="btn btn-success" onClick={handleAddStock}>
                  Add Item
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductStockPage;
