import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUser } from "../../api/userApi";
import { getRoles } from "../../api/roleApi";
import { ROUTES } from "../../constants/routes";

const AddUser = () => {
  const navigate = useNavigate();

  // ✅ 1. DEFINE roles STATE (THIS FIXES THE ERROR)
  const [roles, setRoles] = useState([]);

  // ✅ 2. FORM STATE (role MUST be "")
  const [form, setForm] = useState({
    username: "",
    password: "",
    roleId: ""
  });

  // ✅ 3. FETCH ROLES FROM BACKEND
  useEffect(() => {
    const loadRoles = async () => {
      try {
        const data = await getRoles();
        setRoles(data);
      } catch (err) {
        console.error("Failed to load roles", err);
      }
    };

    loadRoles();
  }, []);

  // ✅ 4. HANDLE INPUT CHANGE
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ✅ 5. SUBMIT FORM
  const submit = async (e) => {
  e.preventDefault();

  await createUser({
    username: form.username,
    password: form.password,
    roleId: Number(form.roleId),  // ✅ REQUIRED
    franchiseIds: []              // ✅ REQUIRED (even if empty)
  });

  navigate(ROUTES.USERS);
};

  return (
    <div className="form-page">
      <div className="card form-card">
        <div className="card-body">
          <h4 className="text-center mb-4 page-title">Add User</h4>

          <form onSubmit={submit}>
            <input
              placeholder="Username"
              className="form-control mb-3"
              name="username"
              value={form.username}
              onChange={handleChange}
              required
            />

            <input
              placeholder="Password"
              type="password"
              className="form-control mb-3"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
            />

            <select
              className={`form-select mb-3 ${form.roleId === "" ? "text-muted" : "text-dark"}`}
              name="roleId"           // ✅ MATCH BACKEND
              value={form.roleId}
              onChange={handleChange}
              required
            >
              <option value="">Select Role</option>

              {roles.map((r) => (
                <option key={r.id} value={r.id}>
                  {r.name}
                </option>
              ))}
            </select>

            <div className="d-flex justify-content-between mt-4">
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
