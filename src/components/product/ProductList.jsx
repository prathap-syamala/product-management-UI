import { useState } from "react";
import useProducts from "../../hooks/useProducts";
import DeleteProduct from "./DeleteProduct";
import EditProduct from "./EditProduct";

export default function ProductList() {
  const { products, loading, reload } = useProducts();
  const [editProduct, setEditProduct] = useState(null);

  if (loading) return <p>Loading...</p>;

  return (
    <>
      {editProduct && (
        <EditProduct
          productData={editProduct}
          onSuccess={() => {
            setEditProduct(null);
            reload();
          }}
          onCancel={() => setEditProduct(null)}
        />
      )}

      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Code</th>
            <th>Name</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {products.map((p) => (
            <tr key={p.id}>
              <td>{p.productCode}</td>
              <td>{p.productName}</td>
              <td>{p.price}</td>
              <td>{p.stock}</td>
              <td>
                <button
                  className="btn btn-warning btn-sm me-2"
                  onClick={() => setEditProduct({
                    id: p.id,
                    ProductCode: p.productCode,
                    ProductName: p.productName,
                    Price: p.price,
                    Stock: p.stock
                  })}
                >
                  Edit
                </button>

                <DeleteProduct
                  id={p.id}
                  onSuccess={reload}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
