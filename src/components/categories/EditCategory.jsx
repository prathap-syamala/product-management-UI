import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../../api/axiosInstance";
import { ROUTES } from "../../constants/routes";
import { toast } from "react-toastify";

const EditCategory = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState("");

  useEffect(() => {
    const loadCategory = async () => {
      const res = await axiosInstance.get(`/api/categories/${id}`);
      setName(res.data.name);
    };

    loadCategory();
  }, [id]);

  const submit = async (e) => {
    e.preventDefault();
    try{
      await axiosInstance.put(`/api/categories/${id}`, {
      name
    });
    toast.success("successfully Updated Category ✅");

    setTimeout(()=>{
       navigate(ROUTES.CATEGORIES);
    },500);
    }
    catch(ex){
      console.error(ex);
      toast.error("Failed to update category ❌");
    }
  };

  return (
    <div className="form-page">
      <div className="card form-card">
        <div className="card-body">
          <h4 className="text-center mb-4">Edit Category</h4>

          <form onSubmit={submit}>
            <label className="form-label">Category Name</label>
            <input
              className="form-control"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />

            <div className="d-flex justify-content-between mt-4">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => navigate(ROUTES.CATEGORIES)}
              >
                Back
              </button>

              <button type="submit" className="btn btn-primary">
                Update Category
              </button>
            </div>
          </form>

        </div>
      </div>
    </div>
  );
};

export default EditCategory;
