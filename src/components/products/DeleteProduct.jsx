import { deleteProduct } from "../../api/productApi";

const DeleteProduct = ({ id, onSuccess }) => {
  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this product?"))
      return;

    await deleteProduct(id);
    onSuccess();
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
