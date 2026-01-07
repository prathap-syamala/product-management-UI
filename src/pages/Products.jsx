import AddProduct from "../components/product/AddProduct";
import ProductList from "../components/product/ProductList";

export default function Products() {
  return (
    <>
      <h2>Products</h2>
      <AddProduct onSuccess={() => window.location.reload()} />
      <hr />
      <ProductList />
    </>
  );
}
