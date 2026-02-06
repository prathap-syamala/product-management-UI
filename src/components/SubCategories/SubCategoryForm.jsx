import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCategoryById } from "../../api/categoryApi";

const SubCategoryForm = ({
  onSubmit,
  categoryId,
  initialData,
  onBack,
  submitText = "Save",
}) => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [categoryName, setCategoryName] = useState("");

  useEffect(() => {
    const load = async () => {
      setName("");
      setCategoryName("");

      if (initialData) {
        setName(initialData.name);

        const cat = await getCategoryById(initialData.categoryId);
        setCategoryName(cat.name);
        return;
      }

      if (categoryId) {
        const cat = await getCategoryById(categoryId);
        setCategoryName(cat.name);
      }
    };

    load();
  }, [initialData, categoryId]);

  const submit = (e) => {
    e.preventDefault();
    onSubmit({
      name,
      categoryId: initialData
        ? initialData.categoryId
        : Number(categoryId),
    });
  };

  return (
    <form onSubmit={submit}>
      <input
        className="form-control mb-3"
        placeholder="Sub-category name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />

      <select className="form-select mb-3" disabled>
        <option>{categoryName || "Loading..."}</option>
      </select>

      <div className="d-flex justify-content-between mt-4">
        <button
          type="button"
          className="btn btn-secondary"
          onClick={onBack || (() => navigate(-1))}
        >
          Back
        </button>

        <button type="submit" className="btn btn-primary">
          {submitText}
        </button>
      </div>
    </form>
  );
};

export default SubCategoryForm;
