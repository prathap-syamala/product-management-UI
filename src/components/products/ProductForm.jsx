const ProductForm = ({
  product,
  categories = [],
  subCategories = [],
  errors = {},
  onChange,
  onSubmit,
  onBack,
  submitText
}) => {
  return (
    <form onSubmit={onSubmit}>

      {/* PRODUCT CODE */}
      <input
        className="form-control mb-3"
        placeholder="Product Code"
        name="productCode"
        value={product.productCode}
        onChange={onChange}
        required
      />
      {errors.productCode && (
        <div className="text-danger mb-2">{errors.productCode}</div>
      )}

      {/* CATEGORY */}
      <select
        className={`form-select mb-3 ${
          product.categoryId === "" ? "text-muted" : "text-dark"
        }`}
        name="categoryId"
        value={product.categoryId}
        onChange={onChange}
        required
      >
        <option value="">Select Category</option>
        {categories.map(c => (
          <option key={c.id} value={c.id}>
            {c.name}
          </option>
        ))}
      </select>
      {errors.categoryId && (
        <div className="text-danger mb-2">{errors.categoryId}</div>
      )}

      {/* SUBCATEGORY */}
      <select
        className={`form-select mb-3 ${
          product.subCategoryId === "" ? "text-muted" : "text-dark"
        }`}
        name="subCategoryId"
        value={product.subCategoryId}
        onChange={onChange}
        disabled={!product.categoryId}
        required
      >
        <option value="">Select Sub-Category</option>
        {subCategories.map(sc => (
          <option key={sc.id} value={sc.id}>
            {sc.name}
          </option>
        ))}
      </select>
      {errors.subCategoryId && (
        <div className="text-danger mb-2">{errors.subCategoryId}</div>
      )}

      {/* PRODUCT NAME */}
      <input
        className="form-control mb-3"
        placeholder="Product Name"
        name="name"
        value={product.name}
        onChange={onChange}
        required
      />
      {errors.name && (
        <div className="text-danger mb-2">{errors.name}</div>
      )}

      {/* MANUFACTURER */}
      <input
        className="form-control mb-3"
        placeholder="Manufacturer"
        name="manufacturer"
        value={product.manufacturer}
        onChange={onChange}
      />

      {/* DESCRIPTION */}
      <textarea
        className="form-control mb-3"
        placeholder="Description"
        name="description"
        value={product.description}
        onChange={onChange}
      />

      {/* IMAGE URL */}
      <input
        className="form-control mb-3"
        placeholder="Image URL"
        name="imageUrl"
        value={product.imageUrl}
        onChange={onChange}
      />

      {/* PRICE */}
      <input
        type="number"
        className="form-control mb-3"
        placeholder="Price"
        name="price"
        value={product.price}
        onChange={onChange}
        required
      />
      {errors.price && (
        <div className="text-danger mb-2">{errors.price}</div>
      )}

      {/* ACTION BUTTONS */}
      <div className="d-flex justify-content-between mt-4">
        <button
          type="button"
          className="btn btn-secondary"
          onClick={onBack}
        >
          Back
        </button>

        <button type="submit" className="btn btn-primary">
          {submitText}
        </button>
      </div>

    </form>
  );
};

export default ProductForm;
