import { useState } from "react";
import { FaPlus, FaBoxOpen, FaEllipsisV } from "react-icons/fa";

const SuppliersPage = () => {
  const [suppliers, setSuppliers] = useState([
    { id: 1, name: "ABC Foods", contact: "9876543210", website: "https://abcfoods.com", items: ["Rice", "Salt", "Oil"] },
    { id: 2, name: "FreshMart", contact: "9123456780", website: "https://freshmart.com", items: ["Sugar", "Flour", "Oil"] },
    { id: 3, name: "Daily Essentials", contact: "9988776655", website: "https://dailyessentials.com", items: ["Tea", "Coffee", "Salt"] },
    { id: 4, name: "GreenGrocers", contact: "9012345678", website: "https://greengrocers.com", items: ["Vegetables", "Fruits"] },
  ]);

  const [expandedSupplierId, setExpandedSupplierId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingSupplier, setEditingSupplier] = useState(null);

  // Toggle items display
  const handleToggleItems = (id) => {
    setExpandedSupplierId(expandedSupplierId === id ? null : id);
  };

  // Delete supplier
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this supplier?")) {
      setSuppliers((prev) => prev.filter((s) => s.id !== id));
    }
  };

  // Open modal for add or edit
  const handleOpenModal = (supplier = null) => {
    if (supplier) {
      setEditingSupplier({
        ...supplier,
        items: supplier.items.join(", "),
      });
    } else {
      setEditingSupplier({
        name: "",
        contact: "",
        website: "",
        items: "",
      });
    }
    setShowModal(true);
  };

  // Handle input change
  const handleModalChange = (e) => {
    const { name, value } = e.target;
    setEditingSupplier((prev) => ({ ...prev, [name]: value }));
  };

  // Save supplier
  const handleModalSave = () => {
    if (!editingSupplier.name) return alert("Supplier name is required");

    const updatedSupplier = {
      ...editingSupplier,
      items: editingSupplier.items
        ? editingSupplier.items.split(",").map((i) => i.trim())
        : [],
    };

    if (editingSupplier.id) {
      setSuppliers((prev) =>
        prev.map((s) => (s.id === editingSupplier.id ? updatedSupplier : s))
      );
    } else {
      const newId =
        suppliers.length > 0 ? Math.max(...suppliers.map((s) => s.id)) + 1 : 1;
      setSuppliers((prev) => [{ ...updatedSupplier, id: newId }, ...prev]);
    }

    setShowModal(false);
    setEditingSupplier(null);
  };

  const filteredSuppliers = suppliers.filter((supplier) => {
    const search = searchTerm.toLowerCase();
    const matchesNameOrId =
      supplier.name.toLowerCase().includes(search) ||
      String(supplier.id).padStart(6, "0").includes(search);
    const matchesItems = supplier.items.some((item) =>
      item.toLowerCase().includes(search)
    );
    return matchesNameOrId || matchesItems;
  });

  return (
    <div className="container py-5 position-relative">
      <h2 className="mb-4 text-center fw-bold">Suppliers</h2>

      {/* Search */}
      <div className="mb-4 d-flex justify-content-center">
        <input
          type="text"
          className="form-control w-50"
          placeholder="Search by Name, ID or Item..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Headings row */}
      <div className="row fw-bold text-center bg-white p-2 rounded shadow-sm mb-2">
        <div className="col">ID</div>
        <div className="col">Name</div>
        <div className="col">Contact</div>
        <div className="col">Website</div>
        <div className="col">Actions</div>
      </div>

      {/* Supplier list */}
      {filteredSuppliers.length > 0 ? (
        filteredSuppliers.map((supplier) => {
          const isExpanded = supplier.id === expandedSupplierId;
          return (
            <div className="row align-items-center text-center bg-white shadow-sm rounded mb-2 py-2" key={supplier.id} style={{ fontSize: "0.9rem" }}>
              <div className="col">{String(supplier.id).padStart(6, "0")}</div>
              <div className="col">{supplier.name}</div>
              <div className="col">{supplier.contact}</div>
              <div className="col">
                <a href={supplier.website} target="_blank" rel="noopener noreferrer">
                  {supplier.website || "-"}
                </a>
              </div>

              {/* Actions */}
              <div className="col d-flex justify-content-center align-items-center">
                <button
                  className="btn btn-sm btn-outline-primary me-2"
                  onClick={() => handleToggleItems(supplier.id)}
                >
                  <FaBoxOpen />
                </button>

                <div className="dropdown">
                  <button
                    className="btn btn-sm btn-light"
                    type="button"
                    data-bs-toggle="dropdown"
                  >
                    <FaEllipsisV />
                  </button>
                  <ul className="dropdown-menu dropdown-menu-end">
                    <li>
                      <button
                        className="dropdown-item"
                        onClick={() => handleOpenModal(supplier)}
                      >
                        Edit
                      </button>
                    </li>
                    <li>
                      <button
                        className="dropdown-item text-danger"
                        onClick={() => handleDelete(supplier.id)}
                      >
                        Delete
                      </button>
                    </li>
                  </ul>
                </div>
              </div>

              {isExpanded && (
                <div className="col-12 text-start bg-light mt-2 p-2 rounded">
                  <strong>Items Supplied:</strong>
                  {supplier.items.length > 0 ? (
                    <ul className="mb-0 small">
                      {supplier.items.map((item, idx) => (
                        <li key={idx}>{item}</li>
                      ))}
                    </ul>
                  ) : (
                    <p className="mb-0 small">No items added yet.</p>
                  )}
                </div>
              )}
            </div>
          );
        })
      ) : (
        <p className="text-center">No suppliers found.</p>
      )}

      {/* Floating Add Supplier Button */}
      <button
        className="btn btn-success position-fixed d-flex align-items-center justify-content-center shadow"
        style={{
          bottom: "30px",
          right: "30px",
          width: "60px",
          height: "60px",
          borderRadius: "12px",
          fontSize: "28px",
        }}
        onClick={() => handleOpenModal()}
      >
        <FaPlus />
      </button>
    </div>
  );
};

export default SuppliersPage;
