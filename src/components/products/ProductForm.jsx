const ProductForm = ({ form, categories, onChange, onSubmit, buttonText }) => (
  <form onSubmit={onSubmit}>
    <div>
      <label>Product Name</label><br />
      <input
        name="name"
        value={form.name}
        onChange={onChange}
        required
      />
    </div>

    <div>
      <label>Price</label><br />
      <input
        name="price"
        type="number"
        value={form.price}
        onChange={onChange}
        required
      />
    </div>

    <div>
      <label>Category</label><br />
      <select
        name="categoryId"
        value={form.categoryId}
        onChange={onChange}
        required
      >
        <option value="">-- Select Category --</option>
        {categories.map(c => (
          <option key={c.id} value={c.id}>
            {c.name}
          </option>
        ))}
      </select>
    </div>

    <br />
    <button type="submit" className="btn btn-primary">{buttonText}</button>
  </form>
);

export default ProductForm;
