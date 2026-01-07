export const validateProduct = (p) => {
  const errors = {};

  if (!p.ProductCode?.trim())
    errors.ProductCode = "Product Code is required";

  if (!p.ProductName?.trim())
    errors.ProductName = "Product Name is required";

  if (p.Price === "" || Number(p.Price) <= 0)
    errors.Price = "Price must be greater than 0";

  if (p.Stock === "" || Number(p.Stock) < 0)
    errors.Stock = "Stock must be 0 or more";

  return errors;
};
