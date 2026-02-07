import AppRoutes from "./routes/AppRoutes";
import { ToastContainer } from "react-toastify";

const App = () => {
  return (
    <>
      <AppRoutes />;
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        draggable
      />
    </>
  );
};

export default App;
