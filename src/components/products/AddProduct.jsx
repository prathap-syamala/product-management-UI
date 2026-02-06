import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { addProduct } from "../../api/productApi";
import { getCategories } from "../../api/categoryApi";
import { getSubCategoriesByCategory } from "../../api/SubCategoryApi";
import { validateProduct } from "../../validations/productValidation";
import ProductForm from "./ProductForm";
import { toast } from "react-toastify";
import { ROUTES } from "../../constants/routes";

const AddProduct = () => {
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [errors, setErrors] = useState({});

  const [product, setProduct] = useState({
    productCode: "",
    name: "",
    manufacturer: "",
    description: "",
    imageUrl: "",
    price: "",
    categoryId: "",
    subCategoryId: "", // ✅ CORRECT
  });

  useEffect(() => {
    getCategories()
      .then(setCategories)
      .catch(() => toast.error("Failed to load categories"));
  }, []);

  const handleChange = async (e) => {
    const { name, value } = e.target;

    setProduct((prev) => ({
      ...prev,
      [name]: value,
    }));

    // 🔹 When category changes → reload subcategories
    if (name === "categoryId") {
      setProduct((prev) => ({
        ...prev,
        subCategoryId: "",
      }));

      if (value) {
        const data = await getSubCategoriesByCategory(value);
        setSubCategories(data);
      } else {
        setSubCategories([]);
      }
    }
  };

  const submit = async (e) => {
    e.preventDefault();

    const validationErrors = validateProduct(product);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      await addProduct({
        ...product,
        name: product.name.trim(),
        price: Number(product.price),
        categoryId: Number(product.categoryId),
        subCategoryId: Number(product.subCategoryId), // ✅ SENT TO BACKEND
      });

      toast.success("Product added successfully ✅");
      navigate(ROUTES.PRODUCTS);
    } catch (err) {
      toast.error(
        err.response?.data?.error || "Failed to add product"
      );
    }
  };

  return (
    <div className="form-page">
      <div className="card form-card">
        <div className="card-body">
          <h4 className="text-center mb-4 page-title">
            Add Product
          </h4>

          <ProductForm
            product={product}
            categories={categories}
            subCategories={subCategories}
            errors={errors}
            onChange={handleChange}
            onSubmit={submit}
            onBack={() => navigate(ROUTES.PRODUCTS)}
            submitText="Add Product"
          />
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
