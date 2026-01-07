import { useEffect, useState } from "react";
import { getFranchises } from "../../api/franchiseApi";

const Footer = () => {
  const [franchises, setFranchises] = useState([]);

  useEffect(() => {
    const loadFranchises = async () => {
      try {
        const data = await getFranchises();
        setFranchises(data);
      } catch (err) {
        console.error("Failed to load franchises");
      }
    };
    loadFranchises();
  }, []);

  return (
    <footer className="app-footer">
      {/* Info Section */}
      <div className="footer-info">
        <div className="container">
          <div className="row">

            {/* Company */}
            <div className="col-md-3">
              <h6 className="footer-title">Prodex</h6>
              <p className="footer-text">
                Product Management System
              </p>
            </div>

            {/* Contact */}
            <div className="col-md-3">
              <h6 className="footer-title">Contact</h6>
              <p className="footer-text">📍 Hyderabad, India</p>
              <p className="footer-text">📧 support@prodex.com</p>
              <p className="footer-text">📞 +91 98765 43210</p>
            </div>

            {/* Management */}
            <div className="col-md-3">
              <h6 className="footer-title">Management</h6>
              <p className="footer-text">Founder: Prathap Reddy</p>
              <p className="footer-text">Operations Manager</p>
            </div>

            
            <div className="col-md-3">
              <h6 className="footer-title">Branches</h6>
              {franchises.length === 0 && (
                <p className="footer-text">No branches available</p>
              )}
              {franchises.map(f => (
                <p key={f.id} className="footer-text">
                  {f.location}
                </p>
              ))}
            </div>

          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="footer-bottom">
        © {new Date().getFullYear()} PMS Application
      </div>
    </footer>
  );
};

export default Footer;
