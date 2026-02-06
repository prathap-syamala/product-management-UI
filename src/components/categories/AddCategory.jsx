import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createCategory } from "../../api/categoryApi";
import { createSubCategory } from "../../api/SubCategoryApi";
import { ROUTES } from "../../constants/routes";
import { toast } from "react-toastify";

const AddCategory = () => {
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [categoryName, setCategoryName] = useState("");
  const [categoryId, setCategoryId] = useState(null);

  const [subCategoryName, setSubCategoryName] = useState("");
  const [subCategories, setSubCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  // STEP 1: CREATE CATEGORY
  const createCategoryHandler = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await createCategory({
        Name: categoryName.trim()
      });

      const id = res.id ?? res.Id;

      if (!id) {
        toast.error("Category ID not returned from backend");
        return;
      }

      setCategoryId(id);
      setStep(2);

      toast.success("Category created successfully ✅");
    } catch (err) {
      const msg =
        err.response?.data?.error ||
        "Category already exists";

      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };


  // STEP 2: ADD SUBCATEGORY
  const addSubCategoryHandler = async () => {
    if (!subCategoryName.trim()) return;

    try {
      setLoading(true);

      await createSubCategory({
        Name: subCategoryName.trim(),
        CategoryId: Number(categoryId)
      });

      setSubCategories(prev => [...prev, subCategoryName]);
      setSubCategoryName("");

      toast.success("Sub-category added ✅");
    } catch (err) {
      const msg =
        err.response?.data?.error ||
        "Sub-category already exists in this category";

      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="form-page">
      <div className="card form-card">
        <div className="card-body">

          <h4 className="text-center mb-4">
            {step === 1 ? "Add Category" : "Add SubCategories"}
          </h4>

          {/* STEP 1 */}
          {step === 1 && (
            <form onSubmit={createCategoryHandler}>
              <label className="form-label">Category Name</label>

              <input
                className="form-control"
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
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

                <button className="btn btn-primary" disabled={loading}>
                  Next →
                </button>
              </div>
            </form>
          )}

          {/* STEP 2 */}
          {step === 2 && (
            <>
              <label className="form-label">SubCategory Name</label>

              <div className="d-flex gap-2">
                <input
                  className="form-control"
                  value={subCategoryName}
                  onChange={(e) => setSubCategoryName(e.target.value)}
                />

                <button
                  type="button"
                  className="btn btn-success"
                  onClick={addSubCategoryHandler}
                  disabled={loading}
                >
                  Add
                </button>
              </div>

              {subCategories.length > 0 && (
                <ul className="mt-3">
                  {subCategories.map((sc, i) => (
                    <li key={i}>{sc}</li>
                  ))}
                </ul>
              )}

              <div className="d-flex justify-content-between mt-4">
                <button
                  className="btn btn-secondary"
                  onClick={() => setStep(1)}
                >
                  ← Back
                </button>

                <button
                  className="btn btn-primary"
                  onClick={() => navigate(ROUTES.CATEGORIES)}
                >
                  Finish
                </button>
              </div>
            </>
          )}

        </div>
      </div>
    </div>
  );
};

export default AddCategory;
