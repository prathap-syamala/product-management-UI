function ProductForm({ product, errors, onChange, onSubmit, buttonText }) {
  return (
    <form onSubmit={onSubmit}>
      {["ProductCode", "ProductName", "Price", "Stock"].map((field) => (
        <div className="mb-3" key={field}>
          <label className="form-label">{field}</label>
          <input
            type={field === "Price" || field === "Stock" ? "number" : "text"}
            className="form-control"
            name={field}
            value={product[field]}
            onChange={onChange}
          />
          {errors[field] && (
            <div className="text-danger">{errors[field]}</div>
          )}
        </div>
      ))}
      <button className="btn btn-primary">{buttonText}</button>
    </form>
  );
}

export default ProductForm;
