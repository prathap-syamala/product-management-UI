import { useEffect, useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import {
  getSubCategories,
  updateSubCategory,
} from "../../api/SubCategoryApi";
import SubCategoryForm from "./SubCategoryForm";
import { toast } from "react-toastify";

const EditSubCategory = () => {
  const { categoryId } = useParams();              // ✅ only param in URL
  const location = useLocation();                  // ✅ get state
  const navigate = useNavigate();

  const subCategoryId = location.state?.subCategoryId; // ✅ from Edit button
  const [subCategory, setSubCategory] = useState(null);

  useEffect(() => {
    if (!subCategoryId) {
      toast.error("Invalid edit navigation");
      navigate(`/categories/${categoryId}/subcategories`, { replace: true });
      return;
    }

    const loadData = async () => {
      const list = await getSubCategories();
      const sc = list.find(
        (x) => x.id === Number(subCategoryId)
      );

      if (!sc) {
        toast.error("Sub-category not found");
        navigate(`/categories/${categoryId}/subcategories`, { replace: true });
        return;
      }

      setSubCategory(sc);
    };

    loadData();
  }, [subCategoryId, categoryId, navigate]);


  const handleSubmit = async (data) => {
    try {
      await updateSubCategory(subCategoryId, {
        ...data,
        name: data.name.trim(),
      });

      toast.success("Sub-category updated ✏️");

      navigate(`/categories/${categoryId}/subcategories`);
    } catch (err) {
      toast.error(err.response?.data?.error || "Update failed");
    }
  };

  if (!subCategory) return null;

  return (
    <div className="form-page">
      <div className="card form-card">
        <div className="card-body">
          <h4 className="text-center mb-4 page-title">
            Edit Sub-Category
          </h4>

          <SubCategoryForm
            initialData={subCategory}
            submitText="Update Sub-Category"
            onSubmit={handleSubmit}
            onBack={() =>
              navigate(`/categories/${categoryId}/subcategories`)
            }
          />
        </div>
      </div>
    </div>
  );
};

export default EditSubCategory;
