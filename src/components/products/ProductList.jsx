import { useState } from "react";
import { Link } from "react-router-dom";
import useProducts from "../../hooks/useProducts";
import { ROUTES } from "../../constants/routes";
import DeleteProduct from "./DeleteProduct";
import EditProduct from "./EditProduct";

const ProductList = () => {
  const { products, loading, reload } = useProducts();
  const [editProduct, setEditProduct] = useState(null);
  const role = localStorage.getItem("role");

  if (loading) return <p>Loading...</p>;

  return (
    <div className="card">
      <div className="card-body">

        {/* Header */}
        <div className="d-flex justify-content-between mb-3">
          <h4 className="mb-0">Products</h4>

          {(role === "Admin" || role === "Manager") && (
            <Link
              to={ROUTES.ADD_PRODUCT}
              className="btn btn-primary btn-sm"
            >
              Add Product
            </Link>
          )}
        </div>

        {/* Inline Edit Form */}
        {editProduct && (
          <div className="mb-4">
            <EditProduct
              productData={editProduct}
              onSuccess={() => {
                setEditProduct(null);
                reload();
              }}
              onCancel={() => setEditProduct(null)}
            />
          </div>
        )}

        {/* Table */}
        <table className="table table-striped">
          <thead className="table-dark">
            <tr>
              <th>Id</th>
              <th>Code</th>
              <th>Name</th>
              <th>Manufacturer</th>
              <th>Price</th>
              <th style={{ width: "180px" }}>Actions</th>
            </tr>
          </thead>

          <tbody>
            {products.length === 0 && (
              <tr>
                <td colSpan="6" className="text-center">
                  No products found
                </td>
              </tr>
            )}

            {products.map((p) => (
              <tr key={p.id}>
                <td>{p.id}</td>
                <td>{p.productCode}</td>
                <td>{p.name}</td>
                <td>{p.manufacturer}</td>
                <td>₹{p.price}</td>

                <td>
                  <div className="d-flex align-items-center gap-2">
                    {(role === "Admin" || role === "Manager") && (
                      <button
                        type="button"
                        className="btn btn-sm btn-warning"
                        onClick={() =>
                          setEditProduct({
                            id: p.id,
                            productCode: p.productCode,
                            name: p.name,
                            manufacturer: p.manufacturer,
                            description: p.description,
                            imageUrl: p.imageUrl,
                            price: p.price,
                            categoryId: p.categoryId
                          })
                        }
                      >
                        Edit
                      </button>
                    )}

                    {role === "Admin" && (
                      <DeleteProduct
                        id={p.id}
                        onSuccess={reload}
                      />
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
