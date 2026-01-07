import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getProducts, updateProduct } from "../../api/productApi";
import { getCategories } from "../../api/categoryApi";
import { ROUTES } from "../../constants/routes";

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState({
    name: "",
    price: "",
    categoryId: ""
  });

  useEffect(() => {
    const loadData = async () => {
      const categoriesData = await getCategories();
      setCategories(categoriesData);

      const products = await getProducts();
      const product = products.find(p => p.id === Number(id));

      if (!product) {
        alert("Product not found");
        navigate(ROUTES.PRODUCTS);
        return;
      }

      setForm({
        name: product.name,
        price: product.price,
        categoryId: String(product.categoryId)
      });
    };

    loadData();
  }, [id, navigate]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submit = async (e) => {
    e.preventDefault();

    await updateProduct(id, {
      ...form,
      categoryId: Number(form.categoryId)
    });

    alert("Product updated successfully");
    navigate(ROUTES.PRODUCTS);
  };

  return (
    <div className="form-page">
      <div className="card form-card">
        <div className="card-body">
          <h4 className="text-center mb-4">Edit Product</h4>

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
                onClick={() => navigate(ROUTES.PRODUCTS)}
              >
                Back
              </button>

              <button type="submit" className="btn btn-primary text-color">
                Update Product
              </button>
            </div>
          </form>

        </div>
      </div>
    </div>
  );
};

export default EditProduct;
