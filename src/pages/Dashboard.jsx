import { useEffect, useState } from "react";
import { getDashboardStats, getDashboardProducts } from "../api/dashboard";
import "./Dashboard.css";

const Dashboard = () => {
  const username = localStorage.getItem("username");
  const role = localStorage.getItem("role");

  const [stats, setStats] = useState({
    products: 0,
    categories: 0,
    users: 0,
    franchises: 0
  });

  const [products, setProducts] = useState([]);

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const statsData = await getDashboardStats();
        setStats(statsData);

        const productData = await getDashboardProducts();
        setProducts(productData);
      } catch (err) {
        console.error("Dashboard load failed", err);
      }
    };

    loadDashboard();
  }, []);

  return (
    <div className="dashboard-container">
      {/* Header */}
      <div className="dashboard-header">
        <h1>Dashboard</h1>
        <p>
          Welcome back, <b>{username}</b> ({role})
        </p>
      </div>

      {/* Stats Cards */}
      <div className="dashboard-cards">
        <div className="card">
          <h3>Products</h3>
          <p className="card-number">{stats.products}</p>
        </div>

        <div className="card">
          <h3>Categories</h3>
          <p className="card-number">{stats.categories}</p>
        </div>

        <div className="card">
          <h3>Users</h3>
          <p className="card-number">{stats.users}</p>
        </div>

        <div className="card">
          <h3>Franchises</h3>
          <p className="card-number">{stats.franchises}</p>
        </div>
      </div>

      {/* Product Highlights Section */}
      <div className="dashboard-info">
        <h2 className="section-title">Product Highlights</h2>

        {products.length === 0 ? (
          <p className="text-muted">No products available</p>
        ) : (
          <div className="dashboard-product-grid">
            {products.map(p => (
              <div key={p.id} className="product-highlight-card">
                <div className="product-header">
                  <h4>{p.name}</h4>
                  <span className="price">₹{p.price}</span>
                </div>

                <p className="category">
                  Category: <b>{p.category}</b>
                </p>

                <p className="description">
                  {p.name} plays a vital role in managing inventory and
                  streamlining sales operations across multiple franchises.
                </p>
              </div>
            ))}
          </div>
        )}
      </div>


    </div>
  );
};

export default Dashboard;
