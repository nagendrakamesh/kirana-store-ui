// Sidebar.jsx
import { NavLink, Navigate } from "react-router-dom";
import { FaBox, FaTruck, FaUsers, FaClipboardList } from "react-icons/fa";
import "../Styles/sidebar.css";

const Sidebar = () => {

  return (
    (localStorage.getItem("token")) ? 
    <div className="sidebar d-flex flex-column p-3">
      <h4 className="text-white fw-bold mb-4 text-center">Menu</h4>
      <NavLink to="/inventory" className="sidebar-link">
        <FaBox className="me-2" /> Inventory
      </NavLink>
      <NavLink to="/customers" className="sidebar-link">
        <FaUsers className="me-2" /> Customers
      </NavLink>
      <NavLink to="/suppliers" className="sidebar-link">
        <FaTruck className="me-2" /> Suppliers
      </NavLink>
      <NavLink to="/product-stock" className="sidebar-link">
        <FaClipboardList className="me-2" /> Product Stock
      </NavLink>
      <NavLink to="/orders" className="sidebar-link">
        <FaClipboardList className="me-2" /> Orders
      </NavLink>
    </div>
     :
     <div></div>
  );
};

export default Sidebar;
