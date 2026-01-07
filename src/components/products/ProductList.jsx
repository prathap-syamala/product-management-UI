import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getProducts, deleteProduct } from "../../api/productApi";
import { getCategories } from "../../api/categoryApi";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  const role = localStorage.getItem("role");

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const prodData = await getProducts();
    const catData = await getCategories();
    setProducts(prodData);
    setCategories(catData);
  };

  const handleDelete = async (id) => {
    const confirm = window.confirm("Are you sure you want to delete this product?");
    if (!confirm) return;

    try {
      await deleteProduct(id);
      setProducts(prev => prev.filter(p => p.id !== id));
    } catch (err) {
      console.error(err);
      alert("Failed to delete product");
    }
  };

  const filteredProducts = selectedCategory
    ? products.filter(p => p.categoryId === Number(selectedCategory))
    : products;

  return (
    <div className="card">
      <div className="card-body">

        {/* Header */}
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h4 className="mb-0">Products</h4>
          <Link to="/products/add" className="btn btn-primary btn-sm">
            Add Product
          </Link>
        </div>

        {/* Filter */}
        <div className="row mb-3">
          <div className="col-md-4">
            <select
              className="form-select"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="">All Categories</option>
              {categories.map(c => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Table */}
        <table className="table table-striped table-hover">
          <thead className="table-dark">
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Price</th>
              <th>Category</th>
              <th style={{ width: "160px" }}>Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredProducts.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center">
                  No products found
                </td>
              </tr>
            )}

            {filteredProducts.map(p => (
              <tr key={p.id}>
                <td>{p.id}</td>
                <td>{p.name}</td>
                <td>₹{p.price}</td>
                <td>{p.categoryName}</td>
                <td>
                  <Link
                    to={`/products/edit/${p.id}`}
                    className="btn btn-sm btn-warning me-2"
                  >
                    Edit
                  </Link>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => handleDelete(p.id)}
                  >
                    Delete
                  </button>
                </td>

              </tr>
            ))}
          </tbody>
        </table>

      </div>
    </div>
  );
};

export default ProductList;
