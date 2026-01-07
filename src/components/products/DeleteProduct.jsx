import productApi from "../../api/productApi";

function DeleteProduct({ id, onSuccess, onCancel }) {
  const handleDelete = () => {
    productApi.remove(id).then(() => onSuccess());
  };

  return (
    <div className="alert alert-danger">
      <p>Are you sure you want to delete this product?</p>
      <button className="btn btn-danger me-2" onClick={handleDelete}>
        Yes
      </button>
      <button className="btn btn-secondary" onClick={onCancel}>
        No
      </button>
    </div>
  );
}

export default DeleteProduct;
