export const ROUTES = {
  LOGIN: "/login",

  DASHBOARD: "/Dashboard",
  ABOUT: "/",

  PRODUCTS: "/products",
  ADD_PRODUCT: "/products/add",
  EDIT_PRODUCT: "/products/edit/:id",

  CATEGORIES: "/categories",
  ADD_CATEGORY: "/categories/add",
  EDIT_CATEGORY: "/categories/edit/:id",

  SUBCATEGORY: "/subcategory",
  Add_SUBCATEGORY: "/subcategory/add",
  EDIT_SUBCATEGORY: "/subcategory/edit/:id",

  SUBCATEGORIES_BY_CATEGORY: "/categories/:categoryId/subcategories",
  ADD_SUBCATEGORY: "/categories/:categoryId/subcategories/add",
  EDIT_SUBCATEGORY:"/categories/:categoryId/subcategories/edit",      

  INVENTORY: "/inventory",

  USERS: "/users",
  ADD_USER: "/users/add",

  FRANCHISES: "/franchises",
  ADD_FRANCHISE: "/franchises/add",
  EDIT_FRANCHISES: "/franchises/edit/:id",

  REPORTS: "/reports",
  NOT_FOUND: "*",
};
