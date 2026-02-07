import { NavLink } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import "./page.css";

const Navbar = () => {
  const role = localStorage.getItem("role");
  const email = localStorage.getItem("email") || "—";
  const username = localStorage.getItem("username") || "User";

  const [open, setOpen] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  const dropdownRef = useRef(null);

  // 🔹 Close dropdown when clicking outside
  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
        setShowDetails(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // 🔹 Logout
  const logout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark app-navbar">
      <div className="container">

        <NavLink className="navbar-brand" to="/">
          ProductHub
        </NavLink>

        <div className="collapse navbar-collapse show">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink className="nav-link" to="/">About</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/dashboard">Dashboard</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/products">Products</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/categories">Categories</NavLink>
            </li>

            {role === "Admin" && (
              <>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/users">Users</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/franchises">Franchises</NavLink>
                </li>
              </>
            )}
          </ul>

          {/* 👤 PROFILE */}
          <div className="profile-wrapper" ref={dropdownRef}>
            <img
              src="/pngwing.com.png"
              alt="Profile"
              className="avatar-img"
              onClick={() => setOpen(!open)}
            />

            {open && (
              <div className="profile-dropdown">

                <button
                  className="dropdown-item fw-bold"
                  onClick={() => setShowDetails(!showDetails)}
                >
                  User Details
                </button>

                {showDetails && (
                  <div className="dropdown-section">
                    <div><strong>Name:</strong> {username}</div>
                    <div><strong>Role:</strong> {role}</div>
                    <div><strong>Email:</strong> {email}</div>
                  </div>
                )}

                <hr />

                <button
                  className="dropdown-item text-danger"
                  onClick={logout}
                >
                  Logout
                </button>

              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
