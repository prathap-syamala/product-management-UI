import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createFranchise } from "../../api/franchiseApi";
import { ROUTES } from "../../constants/routes";

const AddFranchise = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    franchiseName: "",
    location: "",
    totalStaff: "",
    email: "",
    phone: ""
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submit = async (e) => {
    e.preventDefault();
    setError("");

    // Frontend validation (UX)
    if (!/^[6-9]\d{9}$/.test(form.phone)) {
      setError("Enter a valid 10-digit Indian mobile number");
      return;
    }

    try {
      await createFranchise({
        franchiseName: form.franchiseName,
        location: form.location,
        totalStaff: Number(form.totalStaff),
        email: form.email,
        phone: form.phone
      });

      sessionStorage.setItem(
        "toastMessage",
        "Franchise added successfully ✅"
      );

      navigate(ROUTES.FRANCHISES);
    } catch (err) {
      toast.error("Failed to add franchise ❌");
      // Backend validation errors
      if (err.response?.data?.error) {
        setError(err.response.data.error);
      } else {
        setError("Failed to create franchise");
      }
    }
  };

  return (
    <div className="form-page">
      <div className="card form-card">
        <div className="card-body">
          <h4 className="text-center mb-4">Add Franchise</h4>

          {error && (
            <div className="alert alert-danger py-2">
              {error}
            </div>
          )}

          <form onSubmit={submit}>
            <input
              placeholder="Franchise Name"
              className="form-control mt-3"
              name="franchiseName"
              value={form.franchiseName}
              onChange={handleChange}
              required
            />

            <input
              placeholder="Location"
              className="form-control mt-3"
              name="location"
              value={form.location}
              onChange={handleChange}
              required
            />

            <input
              placeholder="Total Staff"
              type="number"
              className="form-control mt-3"
              name="totalStaff"
              value={form.totalStaff}
              onChange={handleChange}
              required
            />

            <input
              placeholder="Email"
              type="email"
              className="form-control mt-3"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
            />

            <input
              type="tel"
              className="form-control mt-3"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="10-digit mobile number"
              required
            />

            <div className="d-flex justify-content-between mt-4">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => navigate(ROUTES.FRANCHISES)}
              >
                Back
              </button>

              <button type="submit" className="btn btn-primary">
                Add Franchise
              </button>
            </div>
          </form>

        </div>
      </div>
    </div>
  );
};

export default AddFranchise;
