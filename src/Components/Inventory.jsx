import { useState } from "react";
import { FaTrash, FaPlus, FaEdit, FaSave } from "react-icons/fa";

const InventoryPage = () => {
  const [items, setItems] = useState([
    {
      id: 1,
      name: "Rice 10kg Bag",
      price: 550,
      quantity: 20,
      image:
        "https://tse3.mm.bing.net/th/id/OIP.F6eU-iuS7i4_1tqqEx3jewAAAA?rs=1&pid=ImgDetMain&o=7&rm=3",
    },
    {
      id: 2,
      name: "Sunflower Oil 1L",
      price: 180,
      quantity: 35,
      image:
        "https://images-na.ssl-images-amazon.com/images/I/71aIVWt58%2BL._SX679_.jpg",
    },
    {
      id: 3,
      name: "Tata Salt 1kg",
      price: 25,
      quantity: 100,
      image:
        "https://cdn.shopify.com/s/files/1/1147/6900/products/tata_salt_1kg_ec5c7f50-e4f9-472c-9ff9-49bc9b67b9a1_1600x.jpg?v=1597483138",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [editId, setEditId] = useState(null); 

  const handleEditToggle = (id) => setEditId(id);

  const handleChange = (id, field, value) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, [field]: (field === "name" || field === "image") ? value : Number(value) } : item
      )
    );
  };

  const handleSave = () => setEditId(null);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      setItems((prev) => prev.filter((item) => item.id !== id));
    }
  };

  const handleAdd = () => {
    const newItem = {
      id: Date.now(),
      name: "New Item",
      price: 0,
      quantity: 0,
      image: "https://via.placeholder.com/200x150?text=New+Item",
    };
    setItems((prev) => [newItem, ...prev]);
    setEditId(newItem.id);
  };

  const filteredItems = items.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container py-5 position-relative">
      <h2 className="mb-4 text-center fw-bold">Inventory</h2>

      {/* Search Bar */}
      <div className="mb-4 d-flex justify-content-center">
        <input
          type="text"
          className="form-control w-50"
          placeholder="Search items..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="row g-3">
        {filteredItems.length > 0 ? (
          filteredItems.map((item) => {
            const isEditing = editId === item.id;
            return (
              <div className="col-md-3 col-sm-6" key={item.id}>
                <div className="card h-100 shadow-sm">
                  <img
                    src={item.image}
                    className="card-img-top"
                    alt={item.name}
                    style={{ height: "200px", objectFit: "contain" }}
                  />
                  <div className="card-body p-2">
                    {/* Name */}
                    {isEditing ? (
                      <input
                        type="text"
                        className="form-control mb-1 fw-bold"
                        value={item.name}
                        onChange={(e) => handleChange(item.id, "name", e.target.value)}
                      />
                    ) : (
                      <h6 className="card-title fw-bold mb-1">{item.name}</h6>
                    )}

                    {/* Price & Quantity */}
                    {isEditing ? (
                      <>
                        <input
                          type="number"
                          className="form-control mb-1"
                          value={item.price}
                          onChange={(e) => handleChange(item.id, "price", e.target.value)}
                        />
                        <input
                          type="number"
                          className="form-control mb-1"
                          value={item.quantity}
                          onChange={(e) => handleChange(item.id, "quantity", e.target.value)}
                        />
                      </>
                    ) : (
                      <p className="card-text mb-1" style={{ fontSize: "0.9rem" }}>
                        <strong>Price:</strong> ₹{item.price} <br />
                        <strong>Quantity:</strong> {item.quantity}
                      </p>
                    )}

                    {isEditing && (
                    <input
                        type="text"
                        className="form-control mb-1"
                        value={item.image}
                        onChange={(e) => handleChange(item.id, "image", e.target.value)}
                        placeholder="Image URL"
                    />
                    )}

                    <div className="d-flex justify-content-between">
                      {isEditing ? (
                        <button className="btn btn-success btn-sm" onClick={handleSave}>
                          <FaSave className="me-1" /> Save
                        </button>
                      ) : (
                        <button
                          className="btn btn-primary btn-sm"
                          onClick={() => handleEditToggle(item.id)}
                        >
                          <FaEdit className="me-1" /> Edit
                        </button>
                      )}
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleDelete(item.id)}
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <p className="text-center w-100">No items found.</p>
        )}
      </div>

      {/* Floating Add Button */}
      <button
        className="btn btn-primary position-fixed d-flex align-items-center justify-content-center shadow-lg"
        style={{
          bottom: "30px",
          right: "30px",
          width: "60px",
          height: "60px",
          borderRadius: "15px",
          fontSize: "26px",
        }}
        onClick={handleAdd}
      >
        <FaPlus />
      </button>
    </div>
  );
};

export default InventoryPage;
