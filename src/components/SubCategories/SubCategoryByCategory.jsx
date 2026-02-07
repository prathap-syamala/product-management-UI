import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import {
  getSubCategoriesByCategory,
  deleteSubCategory,
} from "../../api/SubCategoryApi";
import { getCategoryById } from "../../api/categoryApi";
import { toast } from "react-toastify";

const SubCategoryByCategory = () => {
  const { categoryId } = useParams();
  const navigate = useNavigate(); // ✅ MISSING LINE (FIX)
  const [subCategories, setSubCategories] = useState([]);
  const [categoryName, setCategoryName] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        const category = await getCategoryById(categoryId);
        setCategoryName(category.name);

        const list = await getSubCategoriesByCategory(categoryId);
        setSubCategories(list);
      } catch {
        toast.error("Failed to load sub-categories");
      }
    };

    load();
  }, [categoryId]);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this sub-category?")) return;

    try {
      await deleteSubCategory(id);
      setSubCategories((prev) => prev.filter((sc) => sc.id !== id));
      toast.error("Sub-category deleted ❌");
    } catch {
      toast.error("Delete failed");
    }
  };

  return (
    <div className="card">
      <div className="card-body">
        {/* HEADER */}
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h4>
            Sub-Categories –{" "}
            <span className="text-primary">{categoryName}</span>
          </h4>

          <Link
            to={`/categories/${categoryId}/subcategories/add`}
            className="btn btn-primary btn-sm"
          >
            Add SubCategory
          </Link>
        </div>

        {/* TABLE */}
        <table className="table table-striped">
          <thead className="table-dark">
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th style={{ width: "200px" }}>Actions</th>
            </tr>
          </thead>

          <tbody>
            {subCategories.length === 0 && (
              <tr>
                <td colSpan="3" className="text-center">
                  No sub-categories found
                </td>
              </tr>
            )}

            {subCategories.map((sc, index) => (
              <tr key={sc.id}>
                <td>{index + 1}</td>
                <td>{sc.name}</td>
                <td>
                  <div className="d-flex gap-2">
                    <Link
                      to={`/categories/${categoryId}/subcategories/edit`}
                      state={{ subCategoryId: sc.id }}
                      className="btn btn-sm btn-warning"
                    >
                      Edit
                    </Link>


                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => handleDelete(sc.id)}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* BACK BUTTON */}
        <button
          className="btn btn-secondary btn-sm mt-3"
          onClick={() => navigate("/categories")}
        >
          ← Back
        </button>
      </div>
    </div>
  );
};

export default SubCategoryByCategory;
