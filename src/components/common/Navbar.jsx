import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
      <div className="container">
        <NavLink className="navbar-brand" to="/">InventorySys</NavLink>
        <div className="navbar-nav">
          <NavLink className="nav-link" to="/dashboard">Dashboard</NavLink>
          <NavLink className="nav-link" to="/products">Products</NavLink>
          <NavLink className="nav-link" to="/inventory">Inventory</NavLink>
          <NavLink className="nav-link" to="/reports">Reports</NavLink>
        </div>
      </div>
    </nav>
  );
}
