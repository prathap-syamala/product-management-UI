import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { deleteUser, getUsers } from "../../api/userApi";
import { ROUTES } from "../../constants/routes";
import { toast } from "react-toastify";

const UserList = () => {
  const [users, setUsers] = useState([]);

  // 🔹 Load users
  useEffect(() => {
    const loadUsers = async () => {
      try {
        const data = await getUsers();
        setUsers(data);
      } catch {
        toast.error("Failed to load users ❌");
      }
    };
    loadUsers();
  }, []);

  // 🔹 Show toast after navigation (Add User)
  useEffect(() => {
    const message = sessionStorage.getItem("toastMessage");

    if (message) {
      toast.success(message);
      sessionStorage.removeItem("toastMessage");
    }
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this user?")) return;

    try {
      await deleteUser(id);

      setUsers(prev => prev.filter(u => u.id !== id));

      toast.success("User deleted successfully 🗑️");
    } catch (err) {
      toast.error(
        err.response?.data?.error || "Failed to delete user ❌"
      );
    }
  };

  return (
    <div className="card">
      <div className="card-body">

        <div className="d-flex justify-content-between mb-3">
          <h4>Users</h4>
          <Link to={ROUTES.ADD_USER} className="btn btn-primary btn-sm">
            Add User
          </Link>
        </div>

        <table className="table table-striped table-hover">
          <thead className="table-dark">
            <tr>
              <th>#</th>
              <th>Username</th>
              <th>Role</th>
              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {users.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center text-muted">
                  No users found
                </td>
              </tr>
            )}

            {users.map((u, index) => (
              <tr key={u.id}>
                <td>{index + 1}</td>
                <td>{u.username}</td>
                <td>{u.role}</td>
                <td>{u.email}</td>
                <td>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => handleDelete(u.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>
    </div>
  );
};

export default UserList;
