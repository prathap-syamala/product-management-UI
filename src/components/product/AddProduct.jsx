import { useState } from "react";
import { addProduct } from "../../api/productApi";
import { validateProduct } from "../../validations/productValidation";
import ProductForm from "./ProductForm";

export default function AddProduct({ onSuccess }) {
  const [product, setProduct] = useState({
    ProductCode: "",
    ProductName: "",
    Price: "",
    Stock: ""
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) =>
    setProduct({ ...product, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errs = validateProduct(product);
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }

    await addProduct({
      ...product,
      Price: Number(product.Price),
      Stock: Number(product.Stock),
    });

    onSuccess();
  };

  return (
    <ProductForm
      product={product}
      errors={errors}
      onChange={handleChange}
      onSubmit={handleSubmit}
      buttonText="Add Product"
    />
  );
}
