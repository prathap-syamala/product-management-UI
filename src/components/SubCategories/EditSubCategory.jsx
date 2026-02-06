import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  getSubCategories,
  updateSubCategory,
} from "../../api/SubCategoryApi";
import SubCategoryForm from "./SubCategoryForm";
import { toast } from "react-toastify";

const EditSubCategory = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [subCategory, setSubCategory] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      const list = await getSubCategories();
      const sc = list.find((x) => x.id === Number(id));

      if (!sc) {
        toast.error("Sub-category not found");
        navigate(-1);
        return;
      }

      setSubCategory(sc);
    };

    loadData();
  }, [id, navigate]);

  const handleSubmit = async (data) => {
    try {
      await updateSubCategory(id, {
        ...data,
        name: data.name.trim(),
      });

      toast.success("Sub-category updated ✏️");

      // ✅ go back to that category’s subcategory list
      navigate(`/categories/${subCategory.categoryId}/subcategories`);
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
              navigate(
                `/categories/${subCategory.categoryId}/subcategories`
              )
            }
          />
        </div>
      </div>
    </div>
  );
};

export default EditSubCategory;
