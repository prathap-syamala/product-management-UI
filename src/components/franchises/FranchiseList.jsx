import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getFranchises } from "../../api/franchiseApi";
import { ROUTES } from "../../constants/routes";

const FranchiseList = () => {
  const [franchises, setFranchises] = useState([]);

  useEffect(() => {
    const loadFranchises = async () => {
      const data = await getFranchises();
      setFranchises(data);
    };
    loadFranchises();
  }, []);

  return (
    <div className="card">
      <div className="card-body">
        <div className="d-flex justify-content-between mb-3">
          <h4>Franchises</h4>
          <Link to={ROUTES.ADD_FRANCHISE} className="btn btn-primary btn-sm">
            Add Franchise
          </Link>
        </div>

        <table className="table table-striped table-hover">
          <thead className="table-dark">
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Location</th>
              <th>Total Staff</th>
              <th>Email</th>
              <th>Phone No</th>
              <th style={{ width: "120px" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {franchises.map((f) => (
              <tr key={f.id}>
                <td>{f.id}</td>
                <td>{f.franchiseName}</td>
                <td>{f.location}</td>
                <td>{f.totalStaff}</td>
                <td>{f.email}</td>
                <td>{f.phone}</td>
                <td>
                  <Link
                    to={`/franchises/edit/${f.id}`}
                    className="btn btn-sm btn-warning"
                  >
                    Edit
                  </Link>

                  <button
                    className="btn btn-sm btn-danger"
                    disabled={f.userCount > 0}
                    onClick={async () => {
                      if (!window.confirm("Delete this franchise?")) return;
                      try {
                        await deleteFranchise(f.id);
                        setFranchises(prev => prev.filter(x => x.id !== f.id));
                      } catch (err) {
                        alert(err.response?.data?.error);
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

export default FranchiseList;
