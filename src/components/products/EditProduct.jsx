import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProductById, updateProduct } from "../../api/productApi";
import { getCategories } from "../../api/categoryApi";
import { getSubCategoriesByCategory } from "../../api/SubCategoryApi";
import { toast } from "react-toastify";

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({
    productCode: "",
    name: "",
    manufacturer: "",
    description: "",
    imageUrl: "",
    price: "",
    categoryId: "",
    subCategoryId: "",
  });

  /* 🔹 Load categories */
  useEffect(() => {
    getCategories()
      .then(setCategories)
      .catch(() => toast.error("Failed to load categories"));
  }, []);

  /* 🔹 Load product + its subcategories */
  useEffect(() => {
    const loadProduct = async () => {
      try {
        const data = await getProductById(id);

        // 1️⃣ Load subcategories for product category
        if (data.categoryId) {
          const subs = await getSubCategoriesByCategory(data.categoryId);
          setSubCategories(Array.isArray(subs) ? subs : []);
        }

        // 2️⃣ Set form AFTER subcategories exist
        setForm({
          productCode: data.productCode ?? "",
          name: data.name ?? "",
          manufacturer: data.manufacturer ?? "",
          description: data.description ?? "",
          imageUrl: data.imageUrl ?? "",
          price: data.price ?? "",
          categoryId: data.categoryId?.toString() ?? "",
          subCategoryId: data.subCategoryId?.toString() ?? "",
        });

      } catch {
        toast.error("Failed to load product ❌");
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [id]);

  /* 🔹 Handle changes (reload subcategories if category changes) */
  const handleChange = async (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === "categoryId") {
      setForm((prev) => ({
        ...prev,
        subCategoryId: "",
      }));

      if (value) {
        const subs = await getSubCategoriesByCategory(value);
        setSubCategories(Array.isArray(subs) ? subs : []);
      } else {
        setSubCategories([]);
      }
    }
  };

  /* 🔹 Submit update */
  const submit = async (e) => {
    e.preventDefault();

    try {
      await updateProduct(id, {
        ...form,
        price: Number(form.price),
        categoryId: Number(form.categoryId),
        subCategoryId: Number(form.subCategoryId),
      });

      toast.success("Product updated successfully ✅");
      navigate("/products");
    } catch (err) {
      toast.error(
        err.response?.data?.error || "Failed to update product ❌"
      );
    }
  };

  if (loading) return <div className="text-center mt-3">Loading...</div>;

  return (
    <div className="card">
      <div className="card-body">
        <h5>Edit Product</h5>

        <form onSubmit={submit}>
          <input name="productCode" className="form-control mb-2"
            value={form.productCode} onChange={handleChange} required />

          <input name="name" className="form-control mb-2"
            value={form.name} onChange={handleChange} required />

          <input name="manufacturer" className="form-control mb-2"
            value={form.manufacturer} onChange={handleChange} required />

          <textarea name="description" className="form-control mb-2"
            value={form.description} onChange={handleChange} />

          <input name="imageUrl" className="form-control mb-2"
            value={form.imageUrl} onChange={handleChange} required />

          <input type="number" name="price" className="form-control mb-2"
            value={form.price} onChange={handleChange} required />

          <select name="categoryId" className="form-select mb-2"
            value={form.categoryId} onChange={handleChange} required>
            <option value="">Select Category</option>
            {categories.map(c => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>

          <select name="subCategoryId" className="form-select mb-3"
            value={form.subCategoryId} onChange={handleChange} required>
            <option value="">Select Sub-Category</option>
            {subCategories.map(sc => (
              <option key={sc.id} value={sc.id}>{sc.name}</option>
            ))}
          </select>

          <button className="btn btn-primary btn-sm">Update</button>
          <button
            type="button"
            className="btn btn-secondary btn-sm ms-2"
            onClick={() => navigate("/products")}
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditProduct;
