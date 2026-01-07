import { useState, useEffect } from "react";
import { updateProduct } from "../../api/productApi";
import { validateProduct } from "../../validations/productValidation";
import ProductForm from "./ProductForm";

export default function EditProduct({ productData, onSuccess, onCancel }) {
  const [product, setProduct] = useState(productData);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setProduct(productData);
  }, [productData]);

  const handleChange = (e) =>
    setProduct({ ...product, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errs = validateProduct(product);
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }

    await updateProduct(product.id, {
      ...product,
      Price: Number(product.Price),
      Stock: Number(product.Stock),
    });

    onSuccess();
  };

  return (
    <>
      <h4>Edit Product</h4>
      <ProductForm
        product={product}
        errors={errors}
        onChange={handleChange}
        onSubmit={handleSubmit}
        buttonText="Update Product"
      />

      <button
        className="btn btn-secondary mt-2"
        onClick={onCancel}
      >
        Cancel
      </button>
    </>
  );
}
