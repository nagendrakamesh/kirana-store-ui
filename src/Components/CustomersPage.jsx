import React, { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { FiMoreHorizontal } from "react-icons/fi";

const CustomersPage = () => {
  const [customers, setCustomers] = useState([
    {
      id: "100001",
      name: "John Doe",
      email: "john@example.com",
      phone: "+91 98765 43210",
      address: "Hyderabad, Telangana",
    },
    {
      id: "100002",
      name: "Jane Smith",
      email: "jane@example.com",
      phone: "+91 91234 56789",
      address: "Bengaluru, Karnataka",
    },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [menuOpen, setMenuOpen] = useState(null);

  const handleOpenModal = (customer = null) => {
    if (customer) {
      setEditingCustomer({ ...customer });
    } else {
      setEditingCustomer({
        id: String(Math.floor(100000 + Math.random() * 900000)),
        name: "",
        email: "",
        phone: "",
        address: "",
      });
    }
    setShowModal(true);
    setMenuOpen(null);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingCustomer(null);
  };

  const handleModalChange = (e) => {
    const { name, value } = e.target;
    setEditingCustomer((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveCustomer = () => {
    if (customers.some((c) => c.id === editingCustomer.id)) {
      setCustomers((prev) =>
        prev.map((c) => (c.id === editingCustomer.id ? editingCustomer : c))
      );
    } else {
      setCustomers((prev) => [...prev, editingCustomer]);
    }
    handleCloseModal();
  };

  const handleDeleteCustomer = (id) => {
    setCustomers((prev) => prev.filter((c) => c.id !== id));
    setMenuOpen(null);
  };

  const filteredCustomers = customers.filter(
    (c) =>
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.phone.includes(searchQuery)
  );

  return (
    <div className="container py-5 position-relative">
      {/* Heading */}
      <h2 className="mb-4 text-center fw-bold">Customers</h2>

      {/* Search Box */}
      <div className="d-flex justify-content-center mb-4">
        <input
          type="text"
          className="form-control w-50"
          placeholder="Search by name, email or phone..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Header Row */}
      <div className="row fw-bold text-center bg-white p-2 rounded shadow-sm mb-2">
        <div className="col-2">ID</div>
        <div className="col-2">Name</div>
        <div className="col-3">Email</div>
        <div className="col-2">Phone</div>
        <div className="col-3">Address</div>
        {/* <div className="col-3">Actions</div>  */}
      </div>


      {/* Customers List */}
      <div className="row g-2">
        {filteredCustomers.map((customer) => (
          <div className="col-12" key={customer.id}>
            <div
              className="card shadow-sm border-0"
              style={{ fontSize: "0.9rem" }}
            >
              <div className="card-body d-flex justify-content-between align-items-center py-2">
                <div className="row flex-grow-1 text-center">
                  <div className="col-2">{customer.id}</div>
                  <div className="col-2">{customer.name}</div>
                  <div className="col-3">{customer.email}</div>
                  <div className="col-2">{customer.phone}</div>
                  <div className="col-3">{customer.address}</div>
                </div>

                {/* Actions */}
                <div className="position-relative">
                  <button
                    className="btn btn-sm btn-light"
                    onClick={() =>
                      setMenuOpen(menuOpen === customer.id ? null : customer.id)
                    }
                  >
                    <FiMoreHorizontal size={18} />
                  </button>

                  {menuOpen === customer.id && (
                    <div
                      className="position-absolute bg-white border rounded shadow-sm"
                      style={{
                        right: 0,
                        top: "120%",
                        zIndex: 1000,
                        minWidth: "120px",
                      }}
                    >
                      <button
                        className="dropdown-item"
                        onClick={() => handleOpenModal(customer)}
                      >
                        Edit
                      </button>
                      <button
                        className="dropdown-item text-danger"
                        onClick={() => handleDeleteCustomer(customer.id)}
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Floating Add Button */}
      <button
        className="btn btn-primary position-fixed d-flex align-items-center justify-content-center shadow"
        style={{
          bottom: "30px",
          right: "30px",
          width: "60px",
          height: "60px",
          borderRadius: "12px",
          fontSize: "24px",
        }}
        onClick={() => handleOpenModal()}
      >
        <FaPlus />
      </button>

      {/* Modal */}
      {showModal && (
        <div
          className="modal show fade d-block"
          tabIndex="-1"
          onClick={handleCloseModal}
        >
          <div
            className="modal-dialog"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  {customers.some((c) => c.id === editingCustomer?.id)
                    ? "Edit Customer"
                    : "Add Customer"}
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={handleCloseModal}
                ></button>
              </div>
              <div className="modal-body">
                <input
                  type="text"
                  className="form-control mb-2"
                  name="id"
                  placeholder="Customer ID"
                  value={editingCustomer?.id || ""}
                  disabled
                />
                <input
                  type="text"
                  className="form-control mb-2"
                  name="name"
                  placeholder="Customer Name"
                  value={editingCustomer?.name || ""}
                  onChange={handleModalChange}
                />
                <input
                  type="email"
                  className="form-control mb-2"
                  name="email"
                  placeholder="Email"
                  value={editingCustomer?.email || ""}
                  onChange={handleModalChange}
                />
                <input
                  type="text"
                  className="form-control mb-2"
                  name="phone"
                  placeholder="Phone Number"
                  value={editingCustomer?.phone || ""}
                  onChange={handleModalChange}
                />
                <input
                  type="text"
                  className="form-control mb-2"
                  name="address"
                  placeholder="Address"
                  value={editingCustomer?.address || ""}
                  onChange={handleModalChange}
                />
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={handleCloseModal}>
                  Cancel
                </button>
                <button className="btn btn-primary" onClick={handleSaveCustomer}>
                  {customers.some((c) => c.id === editingCustomer?.id)
                    ? "Update"
                    : "Add"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomersPage;
