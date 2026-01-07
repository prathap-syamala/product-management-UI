import Navbar from "../components/common/Navbar";
import CategoryList from "../components/categories/CategoryList";
import Footer from "../components/common/Footer";

const Inventory = () => {
  return (
    <>
      <div style={{ padding: 20 }}>
        <h2>Inventory</h2>
        <CategoryList />
      </div>
    </>
  );
};

export default Inventory;
