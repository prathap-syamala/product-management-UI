import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { addProduct } from "../../api/productApi";
import { getCategories } from "../../api/categoryApi";
import { validateProduct } from "../../validations/productValidation";
import ProductForm from "./ProductForm";
import { toast } from "react-toastify";
import { ROUTES } from "../../constants/routes";

export default function AddProduct({ onSuccess }) {
  const navigate = useNavigate();

  const [product, setProduct] = useState({
    productCode: "",
    name: "",
    manufacturer: "",
    description: "",
    imageUrl: "",
    price: "",
    categoryId: ""
  });

  const [categories, setCategories] = useState([]);
  const [errors, setErrors] = useState({});

  // ✅ Load categories
  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await getCategories();
        setCategories(data);
      } catch {
        toast.error("Failed to load categories");
      }
    };

    loadCategories();
  }, []);

  const handleChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateProduct(product);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      await addProduct({
        name: product.name,
        productCode: product.productCode,
        manufacturer: product.manufacturer,
        description: product.description,
        imageUrl: product.imageUrl,
        price: Number(product.price),
        categoryId: Number(product.categoryId)
      });

      toast.success("Product added successfully");
      onSuccess?.();
      navigate(ROUTES.PRODUCTS);
    } catch (error) {
      const apiErrors = error.response?.data?.errors;

      if (apiErrors) {
        const formattedErrors = {};
        Object.keys(apiErrors).forEach((key) => {
          const camelKey =
            key.charAt(0).toLowerCase() + key.slice(1);
          formattedErrors[camelKey] = apiErrors[key][0];
        });
        setErrors(formattedErrors);
      } else {
        toast.error("Failed to add product");
      }
    }
  };

  return (
    <div className="form-page">
      <div className="card form-card">
        <div className="card-body">
          <h4 className="text-center mb-4">Add Product</h4>

          <ProductForm
            product={product}
            categories={categories}   
            errors={errors}
            onChange={handleChange}
            onSubmit={handleSubmit}
            buttonText="Add Product"
          />

          <div className="d-flex justify-content-between mt-4">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => navigate(ROUTES.PRODUCTS)}
            >
              Back
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
