import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createCategory } from "../../api/categoryApi";
import { ROUTES } from "../../constants/routes";

const AddCategory = () => {
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    await createCategory({ Name:name });
    navigate(ROUTES.CATEGORIES);
  };

  return (
    <div className="form-page">
      <div className="card form-card">
        <div className="card-body">
          <h4 className="text-center mb-4">Add Category</h4>

          <form onSubmit={submit}>
            <label className="form-label">Category Name</label>
            <input
              className="form-control"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter category name"
              required
            />

            <div className="d-flex justify-content-between mt-4">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => navigate(ROUTES.CATEGORIES)}
              >
                Back
              </button>

              <button type="submit" className="btn btn-primary">
                Add Category
              </button>
            </div>
          </form>

        </div>
      </div>
    </div>
  );
};

export default AddCategory;
