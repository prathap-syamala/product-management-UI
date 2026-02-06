import { Routes, Route } from "react-router-dom";
import Login from "../auth/Login";
import ProtectedRoute from "../auth/ProtectedRoute";
import RoleGuard from "../auth/RoleGuard";

import Dashboard from "../pages/Dashboard";
import Products from "../pages/Products";
import Inventory from "../pages/Inventory";
import NotFound from "../pages/NotFound";

import EditProduct from "../components/products/EditProduct";
import AddProduct from "../components/products/AddProduct";
import CategoryList from "../components/categories/CategoryList";
import EditCategory from "../components/categories/EditCategory";
import AddCategory from "../components/categories/AddCategory";
import UserList from "../components/users/UserList";
import FranchiseList from "../components/franchises/FranchiseList";
import AddUser from "../components/users/AddUser";
import AddFranchise from "../components/franchises/AddFranchise";
import AddSubCategory from "../components/SubCategories/AddSubCategory";
import SubCategoryByCategory from "../components/SubCategories/SubCategoryByCategory";

import { ROUTES } from "../constants/routes";
import { ROLES } from "../constants/roles";
import MainLayout from "../Layouts/MainLayouts";
import About from "../pages/AboutPage";
import EditFranchise from "../components/franchises/EditFranchise";
import EditSubCategory from "../components/SubCategories/EditSubCategory";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public */}
      <Route path={ROUTES.LOGIN} element={<Login />} />

      <Route
        element={
          <ProtectedRoute>
            <MainLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/products/edit/:id" element={<EditProduct />} />

        <Route
          path={ROUTES.SUBCATEGORIES_BY_CATEGORY}element={<SubCategoryByCategory />}
        />

        <Route
          path={ROUTES.ADD_SUBCATEGORY} element={<AddSubCategory />}
        />
        <Route
          path={ROUTES.EDIT_SUBCATEGORY}element={<EditSubCategory />}
        />

        <Route path={ROUTES.EDIT_CATEGORY} element={<EditCategory />} />
        <Route path={ROUTES.CATEGORIES} element={<CategoryList />} />

        <Route path={ROUTES.DASHBOARD} element={<Dashboard />} />

        <Route path={ROUTES.PRODUCTS} element={<Products />} />

        <Route path={ROUTES.USERS} element={<UserList />} />

        <Route path={ROUTES.INVENTORY} element={<Inventory />} />
        <Route path={ROUTES.ABOUT} element={<About />} />

        <Route path={ROUTES.EDIT_FRANCHISES} element={<EditFranchise />} />
        <Route path={ROUTES.FRANCHISES} element={<FranchiseList />} />

        <Route
          path={ROUTES.ADD_PRODUCT}
          element={
            <RoleGuard allowedRoles={[ROLES.ADMIN, ROLES.MANAGER]}>
              <AddProduct />
            </RoleGuard>
          }
        />

        <Route
          path={ROUTES.EDIT_PRODUCT}
          element={
            <RoleGuard allowedRoles={[ROLES.ADMIN, ROLES.MANAGER]}>
              <EditProduct />
            </RoleGuard>
          }
        />

        <Route
          path={ROUTES.ADD_CATEGORY}
          element={
            <RoleGuard allowedRoles={[ROLES.ADMIN, ROLES.MANAGER]}>
              <AddCategory />
            </RoleGuard>
          }
        />

        <Route
          path={ROUTES.ADD_USER}
          element={
            <RoleGuard allowedRoles={[ROLES.ADMIN]}>
              <AddUser />
            </RoleGuard>
          }
        />

        <Route
          path={ROUTES.ADD_FRANCHISE}
          element={
            <RoleGuard allowedRoles={[ROLES.ADMIN]}>
              <AddFranchise />
            </RoleGuard>
          }
        />
      </Route>

      

      {/* Fallback */}
      <Route path={ROUTES.NOT_FOUND} element={<NotFound />} />
    </Routes >
  );
};

export default AppRoutes;
