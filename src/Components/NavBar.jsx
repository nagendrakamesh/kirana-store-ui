import { NavLink, useNavigate } from "react-router-dom";
import { FaShoppingCart, FaUserCircle, FaTachometerAlt, FaSignOutAlt } from "react-icons/fa";
import "../Styles/navbar.css";

const NavBar = () => {

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    window.location.reload();
    navigate("/");
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-success shadow-sm">
      <div className="container-fluid">
        <NavLink className="navbar-brand fw-bold" to="/">
          <FaShoppingCart className="me-2" />
          KiranaStore.com
        </NavLink>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNavDropdown">


        {
          (localStorage.getItem("token")) ? 
          <ul className="navbar-nav ms-auto">
            <li className="nav-item dropdown ms-3">
                <a
                className="nav-link dropdown-toggle d-flex align-items-center"
                href="#"
                id="profileDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                >
                <FaUserCircle size={24} className="me-1" />
                Profile
                </a>
                <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="profileDropdown">
                <li>
                    <NavLink className="dropdown-item" to="/profile">
                    <FaTachometerAlt className="me-2" /> Profile
                    </NavLink>
                </li>
                <li>
                    <NavLink className="dropdown-item" onClick={handleLogout} to="/">
                    <FaSignOutAlt className="me-2" /> Logout
                    </NavLink>
                </li>
                </ul>
            </li>

          </ul>
          :
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <NavLink className="nav-link" to="/login">
                Login
              </NavLink>
            </li>
            <li className="nav-item d-flex align-items-center">
              <NavLink className="btn btn-warning btn-sm ms-2" to="/register">
                Register
              </NavLink>
            </li>
          </ul>

        }
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
