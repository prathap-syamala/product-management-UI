import "./About.css";

const About = () => {
  return (
    <div className="about-page">
      <div className="about-card">

        <h2 className="about-title">About This Project</h2>
        <p className="about-intro">
          <b>Product Management System</b> is a full-stack web
          application designed to manage products, categories, users, and
          franchises in a secure and efficient manner.
        </p>

        <div className="about-divider" />

        <div className="about-section">
          <h4 className="about-section-title">🎯 Project Objective</h4>
          <p className="about-text">
            To provide a centralized platform for managing inventory, users,
            and franchise operations with proper role-based access control.
          </p>
        </div>

        <div className="about-section">
          <h4 className="about-section-title">⚙️ Key Features</h4>
          <ul className="about-list">
            <li>JWT-based authentication and authorization</li>
            <li>Role-based access (Admin, Manager, User)</li>
            <li>Product and category management</li>
            <li>Franchise and user assignment</li>
            <li>Secure delete validations</li>
            <li>Modern and responsive UI</li>
          </ul>
        </div>

        <div className="about-section">
          <h4 className="about-section-title">🛠 Technologies Used</h4>
          <div className="tech-grid">
            <div className="tech-item"><b>Frontend:</b> React, Vite, Axios, Bootstrap</div>
            <div className="tech-item"><b>Backend:</b> ASP.NET Core Web API</div>
            <div className="tech-item"><b>Database:</b> SQL Server</div>
            <div className="tech-item"><b>Security:</b> JWT Authentication</div>
          </div>
        </div>

        <div className="about-section">
          <h4 className="about-section-title">🏢 Real-World Applications</h4>
          <p className="about-text">
            Suitable for retail businesses, franchise-based organizations,
            and inventory management systems where security and role-based
            access are critical.
          </p>
        </div>

        <div className="about-section">
          <h4 className="about-section-title">🚀 Future Enhancements</h4>
          <ul className="about-list">
            <li>Advanced reporting and analytics</li>
            <li>Approval workflow for delete requests</li>
            <li>Notification system</li>
            <li>Cloud deployment</li>
          </ul>
        </div>

        <p className="about-footer">
          Developed as a full-stack project using modern web technologies.
        </p>

      </div>
    </div>
  );
};

export default About;
