import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import SubCategoryForm from "./SubCategoryForm";
import { createSubCategory } from "../../api/SubCategoryApi";

const AddSubCategory = () => {
  const { categoryId } = useParams();
  const navigate = useNavigate();

  const handleSubmit = async (data) => {
    try {
      await createSubCategory({
        ...data,
        name: data.name.trim(),
        categoryId: Number(categoryId),
      });

      toast.success("Sub-category added successfully ✅");
      navigate(-1); // back to subcategory list
    } catch (err) {
      toast.error(err.response?.data?.error || "Failed to add sub-category");
    }
  };

  return (
    <div className="form-page">
      <div className="card form-card">
        <div className="card-body">
          <h4 className="text-center mb-4 page-title">
            Add Sub-Category
          </h4>

          <SubCategoryForm
            categoryId={categoryId}
            onSubmit={handleSubmit}
            onBack={() => navigate(-1)}
            submitText="Add Sub-Category"
          />
        </div>
      </div>
    </div>
  );
};

export default AddSubCategory;
