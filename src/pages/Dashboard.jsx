import { useEffect, useState } from "react";
import { getDashboardStats } from "../api/dashboard";
import { getProducts } from "../api/productApi";
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
        // Load stats ONLY for Admin & Manager
        if (role !== "User") {
            getDashboardStats()
                .then(data => setStats(data))
                .catch(() => console.error("Dashboard stats failed"));
        }

        // Load products for ALL roles
        getProducts()
            .then(data => setProducts(data.slice(0, 6))) // show max 6
            .catch(() => console.error("Product load failed"));
    }, [role]);

    return (
        <div className="dashboard-container">
            {/* HEADER */}
            <div className="dashboard-header">
                <h1>Dashboard</h1>
                <p>
                    Welcome back, <b>{username}</b> ({role})
                </p>
            </div>

            {/* ================= ADMIN / MANAGER DASHBOARD ================= */}
            {(role === "Admin" || role === "Manager") && (
                <>
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
                </>
            )}

            {/* ================= PRODUCT DASHBOARD (ALL USERS) ================= */}
            <div className="dashboard-info">
                <h2>Product Highlights</h2>

                <div className="dashboard-product-list">
                    {products.map(p => (
                        <div key={p.id} className="dashboard-product-card">
                            <h4>{p.name}</h4>

                            <p className="price">
                                <del className="old-price">₹{(p.price * 2) - (p.price / 2)}</del>
                                <span className="new-price">₹{p.price}</span>
                            </p>

                            <p className="product-desc">
                                {p.name} is one of our featured products designed to support
                                efficient inventory tracking and sales operations.
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
