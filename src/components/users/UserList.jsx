import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getUsers } from "../../api/userApi";
import { ROUTES } from "../../constants/routes";

const UserList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const loadUsers = async () => {
      const data = await getUsers();
      setUsers(data);
    };
    loadUsers();
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
            </tr>
          </thead>
          <tbody>
            {users.map(u => (
              <tr key={u.id}>
                <td>{u.id}</td>
                <td>{u.username}</td>
                <td>{u.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserList;
