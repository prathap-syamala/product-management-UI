import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";
import { Outlet } from "react-router-dom";
import "../styles/custom.css"

const MainLayout = () => {
    return (
        <div className="app-layout">
            <div className="app-content">
                <h1 style={{ color: "white" }}>Prodex</h1>
                <Navbar />
                <div className="container mt-4">
                    <Outlet />
                </div>
                 <Footer />
            </div>
        </div>
    );
};

export default MainLayout;
