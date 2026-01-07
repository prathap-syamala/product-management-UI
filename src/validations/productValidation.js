export const validateProduct = (values) => {
  const errors = {};

  if (!values.name || values.name.trim() === "") {
    errors.name = "Product name is required";
  }

  if (!values.price || values.price <= 0) {
    errors.price = "Valid price is required";
  }

  if (!values.categoryId) {
    errors.categoryId = "Category is required";
  }

  return errors;
};
