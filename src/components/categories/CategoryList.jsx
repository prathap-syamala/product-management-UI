import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getCategories } from "../../api/categoryApi";
import axiosInstance from "../../api/axiosInstance";
import { ROUTES } from "../../constants/routes";
import {  toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const role = localStorage.getItem("role");


  useEffect(() => {
    const loadCategories = async () => {
      const data = await getCategories();
      setCategories(data);
    };
    loadCategories();
  }, []);

  useEffect(() => {
    const message = sessionStorage.getItem("toastMessage");

    if (message && !toast.isActive("category-add")) {
      toast.success(message, {
        toastId: "category-add",
      });

      sessionStorage.removeItem("toastMessage");
    }
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this category?"
    );

    if (!confirmDelete) return;

    try {
      await axiosInstance.delete(`/api/categories/${id}`);

      setCategories(prev =>
        prev.filter(c => c.id !== id)
      );

      toast.success("Category deleted successfully ✅");

    } catch (error) {
      toast.error(
        error?.response?.data?.error ||
        "Cannot delete category. Products may exist under this category."
      );
    }
  };


  return (
    <div className="card">
      <div className="card-body">
        <div className="d-flex justify-content-between mb-3">
          <h4>Categories</h4>

          <Link
            to={ROUTES.ADD_CATEGORY}
            className="btn btn-primary btn-sm"
          >
            Add Category
          </Link>
        </div>

        <table className="table table-striped">
          <thead className="table-dark">
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th style={{ width: "340px" }}>Actions</th>
            </tr>
          </thead>

          <tbody>
            {categories.map((c,index) => (
              <tr key={c.id}>
                <td>{index+1}</td>
                <td>{c.name}</td>

                <td>
                  <div className="d-flex align-items-center gap-2">
                    <Link
                      to={`/categories/edit/${c.id}`}
                      className="btn btn-sm btn-warning"
                    >
                      Edit
                    </Link>
                    <Link
                      to={`/categories/${c.id}/subcategories`}
                      className="btn btn-sm btn-info me-2"
                    >
                      View Sub-Cat
                    </Link>

                    {role === "Admin" && (
                      <button
                        className="btn btn-danger btn-sm"
                        disabled={c.productCount !== 0}
                        onClick={() => handleDelete(c.id)}
                      >
                        Delete
                      </button>
                    )}

                    {c.productCount > 0 && (
                      <small className="text-danger">
                        Products exist
                      </small>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>

        </table>

      </div>
    </div>
  );
};

export default CategoryList;
