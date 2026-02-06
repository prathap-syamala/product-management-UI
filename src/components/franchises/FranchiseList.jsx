import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { deleteFranchise, getFranchises } from "../../api/franchiseApi";
import { ROUTES } from "../../constants/routes";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const FranchiseList = () => {
  const [franchises, setFranchises] = useState([]);

  useEffect(() => {
    const loadFranchises = async () => {
      const data = await getFranchises();
      setFranchises(data);
    };
    loadFranchises();
  }, []);
  useEffect(() => {
    const message = sessionStorage.getItem("toastMessage");

    if (message && !toast.isActive("franchise-add")) {
      toast.success(message, {
        toastId: "franchise-add",
      });

      sessionStorage.removeItem("toastMessage");
    }
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
            {franchises.map((f,index) => (
              <tr key={f.id}>
                <td>{index+1}</td>
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

                        setFranchises(prev =>
                          prev.filter(x => x.id !== f.id)
                        );

                        // ✅ success toast
                        toast.success("Franchise deleted successfully 🗑️", {
                          toastId: "franchise-delete",
                        });

                      } catch (err) {
                        // ❌ error toast
                        toast.error(
                          err.response?.data?.error || "Failed to delete franchise ❌"
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

export default FranchiseList;
