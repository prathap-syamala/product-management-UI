import axios from "axios";
import {API_BASE_URL} from "../config";

const api=axios.create({
  baseURL:API_BASE_URL,
});

export const getProducts=()=>
  api.get("/products").then(res => res.data);

export const addProduct=(product)=>
  api.post("/products", product);

export const updateProduct = (id, product) =>
  api.put(`/products/${id}`, product);

export const deleteProduct = (id) =>
  api.delete(`/products/${id}`);
