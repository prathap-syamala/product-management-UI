import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getFranchiseById, updateFranchise } from "../../api/franchiseApi";
import { ROUTES } from "../../constants/routes";

const EditFranchise = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    franchiseName: "",
    location: "",
    totalStaff: "",
    email: "",
    phone: ""
  });

  // ✅ LOAD DATA
  useEffect(() => {
    const load = async () => {
      const data = await getFranchiseById(id);

      setForm({
        franchiseName: data.franchiseName ?? "",
        location: data.location ?? "",
        totalStaff: String(data.totalStaff ?? ""), // ✅ STRING
        email: data.email ?? "",
        phone: data.phone ?? ""
      });
    };

    load();
  }, [id]);

  // ✅ HANDLE CHANGE
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // ✅ SUBMIT
  const submit = async (e) => {
    e.preventDefault();

    await updateFranchise(id, {
      franchiseName: form.franchiseName.trim(),
      location: form.location.trim(),
      totalStaff: Number(form.totalStaff), // convert back
      email: form.email.trim(),
      phone: form.phone.trim()
    });

    navigate(ROUTES.FRANCHISES);
  };

  return (
    <div className="form-page">
      <div className="card form-card">
        <div className="card-body">
          <h4 className="text-center mb-4">Edit Franchise</h4>

          <form onSubmit={submit}>
            <input
              name="franchiseName"
              className="form-control mt-3"
              value={form.franchiseName}
              onChange={handleChange}
              required
            />

            <input
              name="location"
              className="form-control mt-3"
              value={form.location}
              onChange={handleChange}
              required
            />

            <input
              name="totalStaff"
              type="number"
              className="form-control mt-3"
              value={form.totalStaff}
              onChange={handleChange}
              required
            />

            <input
              name="email"
              type="email"
              className="form-control mt-3"
              value={form.email}
              onChange={handleChange}
              required
            />

            <input
              name="phone"
              className="form-control mt-3"
              value={form.phone}
              onChange={handleChange}
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
                Update Franchise
              </button>
            </div>
          </form>

        </div>
      </div>
    </div>
  );
};

export default EditFranchise;
