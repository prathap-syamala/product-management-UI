function ProductForm({
  product,
  categories = [],
  errors,
  onChange,
  onSubmit,
  buttonText
}) {
  const fields = [
    { name: "productCode", label: "Product Code", type: "text" },
    { name: "name", label: "Product Name", type: "text" },
    { name: "manufacturer", label: "Manufacturer", type: "text" },
    { name: "description", label: "Description", type: "textarea" },
    { name: "imageUrl", label: "Image URL", type: "text" },
    { name: "price", label: "Price", type: "number" }
  ];

  return (
    <form onSubmit={onSubmit}>
      {/* Standard Fields */}
      {fields.map(({ name, label, type }) => (
        <div className="mb-3" key={name}>
          <label className="form-label">{label}</label>

          {type === "textarea" ? (
            <textarea
              className="form-control"
              name={name}
              value={product[name] || ""}
              onChange={onChange}
            />
          ) : (
            <input
              type={type}
              className="form-control"
              name={name}
              value={product[name] || ""}
              onChange={onChange}
            />
          )}

          {errors?.[name] && (
            <div className="text-danger">{errors[name]}</div>
          )}
        </div>
      ))}

      {/* Category Dropdown */}
      <div className="mb-3">
        <label className="form-label">Category</label>

        <select
          className="form-control"
          name="categoryId"
          value={product.categoryId || ""}
          onChange={onChange}
        >
          <option value="">-- Select Category --</option>

          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>

        {errors?.categoryId && (
          <div className="text-danger">{errors.categoryId}</div>
        )}
      </div>

      <button type="submit" className="btn btn-primary">
        {buttonText}
      </button>
    </form>
  );
}

export default ProductForm;
