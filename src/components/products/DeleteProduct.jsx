import { deleteProduct } from "../../api/productApi";
import { toast } from "react-toastify";
const DeleteProduct = ({ id, onSuccess }) => {
  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmDelete) return;

    try {
      await deleteProduct(id);

      // if parent list needs refresh / removal
      onSuccess();

      // ✅ success toast
      toast.success("Product deleted successfully 🗑️", {
        toastId: "product-delete",
      });

    } catch (error) {
      // ❌ error toast
      toast.error(
        error?.response?.data?.error ||
        "Failed to delete product ❌"
      );
    }
  };

  return (
    <button
      type="button"
      className="btn btn-sm btn-danger"
      onClick={handleDelete}
    >
      Delete
    </button>
  );
};

export default DeleteProduct;
