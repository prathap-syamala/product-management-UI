import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { deleteUser, getUsers } from "../../api/userApi";
import { ROUTES } from "../../constants/routes";
import { toast } from "react-toastify";

const UserList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const loadUsers = async () => {
      const data = await getUsers();
      setUsers(data);
    };
    loadUsers();
  }, []);

  useEffect(() => {
    const message = sessionStorage.getItem("toastMessage");

    if (message && !toast.isActive("user-add")) {
      toast.success(message, {
        toastId: "user-add",
      });

      sessionStorage.removeItem("toastMessage");
    }
  }, []);

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
              <td>Id</td>
              <th>Username</th>
              <th>Role</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u,index) => (
              <tr key={u.id}>
                <td>{index+1}</td>
                <td>{u.username}</td>
                <td>{u.role}</td>

                <td>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={async () => {
                      if (!window.confirm("Delete this user?")) return;

                      try {
                        await deleteUser(u.id);

                        // ✅ update USERS state (not franchises)
                        setUsers(prev =>
                          prev.filter(x => x.id !== u.id)
                        );

                        toast.success("User deleted successfully 🗑️", {
                          toastId: "user-delete",
                        });

                      } catch (err) {
                        toast.error(
                          err.response?.data?.error ||
                          "Failed to delete user ❌"
                        );
                      }
                    }}
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
