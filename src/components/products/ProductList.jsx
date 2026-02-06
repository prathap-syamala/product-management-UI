import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useProducts from "../../hooks/useProducts";
import { ROUTES } from "../../constants/routes";
import DeleteProduct from "./DeleteProduct";
import { getCategories } from "../../api/categoryApi";
import { getSubCategoriesByCategory } from "../../api/SubCategoryApi";

const ProductList = () => {
  const { products, reload } = useProducts();
  const role = localStorage.getItem("role");

  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubCategory, setSelectedSubCategory] = useState("");

  useEffect(() => {
    const loadCategories = async () => {
      const data = await getCategories();
      setCategories(Array.isArray(data) ? data : []);
    };
    loadCategories();
  }, []);

  useEffect(() => {
    const loadSubCategories = async () => {
      if (!selectedCategory) {
        setSubCategories([]);
        setSelectedSubCategory("");
        return;
      }
      const data = await getSubCategoriesByCategory(selectedCategory);
      setSubCategories(Array.isArray(data) ? data : []);
      setSelectedSubCategory("");
    };
    loadSubCategories();
  }, [selectedCategory]);

  const filteredProducts = products.filter((p) => {
    if (selectedCategory && p.categoryId !== Number(selectedCategory)) {
      return false;
    }
    if (selectedSubCategory) {
      const subId = p.subCategoryId ?? p.subCategory?.id;
      if (subId !== Number(selectedSubCategory)) return false;
    }
    return true;
  });

  return (
    <div className="card">
      <div className="card-body">

        {/* HEADER */}
        <div className="d-flex justify-content-between mb-3">
          <h4>Products</h4>
          {(role === "Admin" || role === "Manager") && (
            <Link to={ROUTES.ADD_PRODUCT} className="btn btn-primary btn-sm">
              Add Product
            </Link>
          )}
        </div>

        {/* FILTERS */}
        <div className="d-flex gap-3 mb-3">
          <select
            className="form-select w-25"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="">All Categories</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>

          <select
            className="form-select w-25"
            value={selectedSubCategory}
            onChange={(e) => setSelectedSubCategory(e.target.value)}
            disabled={!selectedCategory}
          >
            <option value="">All Sub-Categories</option>
            {subCategories.map((sc) => (
              <option key={sc.id} value={sc.id}>{sc.name}</option>
            ))}
          </select>
        </div>

        {/* TABLE */}
        <table className="table table-striped">
          <thead className="table-dark">
            <tr>
              <th>#</th>
              <th>Code</th>
              <th>Name</th>
              <th>Manufacturer</th>
              <th>Price</th>
              <th style={{ width: "180px" }}>Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredProducts.length === 0 && (
              <tr>
                <td colSpan="6" className="text-center">No products found</td>
              </tr>
            )}

            {filteredProducts.map((p, index) => (
              <tr key={p.id}>
                <td>{index + 1}</td>
                <td>{p.productCode}</td>
                <td>{p.name}</td>
                <td>{p.manufacturer}</td>
                <td>₹{p.price}</td>
                <td>
                  <div className="d-flex gap-2">
                    {(role === "Admin" || role === "Manager") && (
                      <Link
                        to={`/products/edit/${p.id}`}
                        className="btn btn-sm btn-warning"
                      >
                        Edit
                      </Link>
                    )}
                    {role === "Admin" && (
                      <DeleteProduct id={p.id} onSuccess={reload} />
                    )}
                  </div>
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
