import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createProduct } from "../../api/productApi";
import { getCategories } from "../../api/categoryApi";

const AddProduct = () => {
  const [form, setForm] = useState({
    name: "",
    price: "",
    categoryId: ""
  });

  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const loadCategories = async () => {
      const data = await getCategories();
      setCategories(data);
    };
    loadCategories();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submit = async (e) => {
    e.preventDefault();
    await createProduct({
      ...form,
      categoryId: Number(form.categoryId)
    });
    navigate("/products");
  };

  return (
    <div className="form-page">
      <div className="card form-card">
        <div className="card-body">
          <h4 className="text-center mb-4">Add Product</h4>

          <form onSubmit={submit}>
            <input
              placeholder="Product Name"
              className="form-control mb-3 text-color"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
            />

            <input
              placeholder="Price"
              type="number"
              className="form-control mb-3 text-color"
              name="price"
              value={form.price}
              onChange={handleChange}
              required
            />

            <select
              className="form-select mb-3 text-color"
              name="categoryId"
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

            <div className="d-flex justify-content-between mt-4">
              <button
                type="button"
                className="btn btn-secondary text-color"
                onClick={() => navigate("/products")}
              >
                Back
              </button>

              <button type="submit" className="btn btn-primary text-color">
                Add Product
              </button>
            </div>
          </form>

        </div>
      </div>
    </div>
  );
};

export default AddProduct;
