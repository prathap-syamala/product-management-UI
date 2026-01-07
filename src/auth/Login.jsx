import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../api/authApi";
import { ROUTES } from "../constants/routes";

const Login = () => {
  const [form, setForm] = useState({
    username: "",
    password: ""
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await login(form);

      localStorage.setItem("token", res.token);
      localStorage.setItem("role", res.role);
      localStorage.setItem("username", res.username);

      navigate(ROUTES.DASHBOARD);
    } catch {
      setError("Invalid username or password");
    }
  };

  return (
    <div className="login-page">
      <div className="login-bubbles">
        <span></span> 
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <div className="card login-card shadow">
        <div className="card-body p-4">

          <h3 className="text-center mb-2 fw-bold text-primary">
            Product Management
          </h3>
          <p className="text-center text-muted mb-4">
            Sign in to continue
          </p>

          {error && (
            <div className="alert alert-danger py-2 text-center">
              {error}
            </div>
          )}

          <form onSubmit={submit}>
            <input
              type="text"
              name="username"
              className="form-control mb-3"
              placeholder="Username"
              value={form.username}
              onChange={handleChange}
              required
            />

            <input
              type="password"
              name="password"
              className="form-control mb-4"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              required
            />

            <button type="submit" className="btn btn-primary w-100 py-2">
              Login
            </button>
          </form>

        </div>
      </div>
    </div>
  );
};

export default Login;
