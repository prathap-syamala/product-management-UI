import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUser } from "../../api/userApi";
import { getRoles } from "../../api/roleApi";
import { ROUTES } from "../../constants/routes";
import { toast } from "react-toastify";

const AddUser = () => {
  const navigate = useNavigate();
  const [roles, setRoles] = useState([]);

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    roleId: ""
  });

  useEffect(() => {
    const loadRoles = async () => {
      try {
        const data = await getRoles();
        setRoles(data);
      } catch {
        toast.error("Failed to load roles ❌");
      }
    };
    loadRoles();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submit = async (e) => {
    e.preventDefault();

    try {
      await createUser({
        username: form.username,
        email: form.email,
        password: form.password,
        roleId: Number(form.roleId),
        franchiseIds: []
      });

      // ✅ Store toast message for next page
      sessionStorage.setItem("toastMessage", "User created successfully 🎉");

      navigate(ROUTES.USERS);
    } catch (err) {
      toast.error(
        err.response?.data?.error || "Failed to create user ❌"
      );
    }
  };

  return (
    <div className="form-page">
      <div className="card form-card">
        <div className="card-body">

          <h4 className="text-center mb-4">Add User</h4>

          <form onSubmit={submit}>
            <input
              className="form-control mb-3"
              name="username"
              placeholder="Username"
              value={form.username}
              onChange={handleChange}
              required
            />

            <input
              className="form-control mb-3"
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              required
            />

            <input
              className="form-control mb-3"
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              required
            />

            <select
              className="form-select mb-3"
              name="roleId"
              value={form.roleId}
              onChange={handleChange}
              required
            >
              <option value="">Select Role</option>
              {roles.map(r => (
                <option key={r.id} value={r.id}>
                  {r.name}
                </option>
              ))}
            </select>

            <div className="d-flex justify-content-between">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => navigate(ROUTES.USERS)}
              >
                Back
              </button>

              <button type="submit" className="btn btn-primary">
                Add User
              </button>
            </div>
          </form>

        </div>
      </div>
    </div>
  );
};

export default AddUser;
