import './App.css'
import Navbar from './components/common/Navbar'
import AppRoutes from './routes/AppRoutes'
import Footer from './components/common/Footer'

function App() {
  return (
    <>
      <Navbar/>
      <div className='container mt-4'>
        <AppRoutes/>
      </div>
      <Footer/>
    </>
  );
}

export default App;
