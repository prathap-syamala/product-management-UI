import { useEffect, useState } from "react";
import { updateProduct } from "../../api/productApi";
import { getCategories } from "../../api/categoryApi";

const EditProduct = ({ productData, onSuccess, onCancel }) => {
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState({
    productCode: "",
    name: "",
    manufacturer: "",
    description: "",
    imageUrl: "",
    price: "",
    categoryId: ""
  });

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await getCategories();
        setCategories(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Failed to load categories", err);
        setCategories([]);
      }
    };

    loadCategories();
  }, []);

  useEffect(() => {
    if (!productData) return;

    setForm({
      productCode: productData.productCode ?? "",
      name: productData.name ?? "",
      manufacturer: productData.manufacturer ?? "",
      description: productData.description ?? "",
      imageUrl: productData.imageUrl ?? "",
      price: productData.price ?? "",
      categoryId: productData.categoryId
        ? String(productData.categoryId)
        : ""
    });
  }, [productData]);


  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();

    await updateProduct(productData.id, {
      productCode: form.productCode.trim(),
      name: form.name.trim(),
      manufacturer: form.manufacturer.trim(),
      description: form.description.trim(),
      imageUrl: form.imageUrl.trim(),
      price: Number(form.price),
      categoryId: Number(form.categoryId)
    });

    onSuccess();
  };

  return (
    <div className="card mb-3">
      <div className="card-body">
        <h5 className="mb-3">Edit Product</h5>

        <form onSubmit={submit}>

          {/* Product Code */}
          <input
            name="productCode"
            className="form-control mb-2"
            placeholder="Product Code"
            value={form.productCode}
            onChange={handleChange}
            required
          />

          {/* Product Name */}
          <input
            name="name"
            className="form-control mb-2"
            placeholder="Product Name"
            value={form.name}
            onChange={handleChange}
            required
          />

          {/* Manufacturer */}
          <input
            name="manufacturer"
            className="form-control mb-2"
            placeholder="Manufacturer"
            value={form.manufacturer}
            onChange={handleChange}
            required
          />

          {/* Description */}
          <textarea
            name="description"
            className="form-control mb-2"
            placeholder="Description"
            rows="3"
            value={form.description}
            onChange={handleChange}
          />

          {/* Image URL */}
          <input
            name="imageUrl"
            className="form-control mb-2"
            placeholder="Image URL"
            value={form.imageUrl}
            onChange={handleChange}
          />

          {/* Price */}
          <input
            name="price"
            type="number"
            className="form-control mb-2"
            placeholder="Price"
            value={form.price}
            onChange={handleChange}
            required
          />

          {/* Category */}
          <select
            name="categoryId"
            className="form-select mb-3"
            value={form.categoryId}
            onChange={handleChange}
            required
          >
            <option value="">Select Category</option>
            {categories.map(c => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>

          {/* Actions */}
          <div className="d-flex gap-2">
            <button type="submit" className="btn btn-primary btn-sm">
              Update
            </button>

            <button
              type="button"
              className="btn btn-secondary btn-sm"
              onClick={onCancel}
            >
              Cancel
            </button>
          </div>

        </form>
      </div>
    </div>
  );

};

export default EditProduct;
