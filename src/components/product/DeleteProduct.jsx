import { deleteProduct } from "../../api/productApi";

export default function DeleteProduct({ id, onSuccess }) {
  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this product?"))
      return;

    await deleteProduct(id);
    onSuccess();
  };

  return (
    <button
      className="btn btn-danger btn-sm"
      onClick={handleDelete}
    >
      Delete
    </button>
  );
}
