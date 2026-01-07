import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div style={{ textAlign: "center", marginTop: 100 }}>
      <h1>404</h1>
      <p>Page not found</p>
      <Link to="/">Go to Dashboard</Link>
    </div>
  );
};

export default NotFound;
