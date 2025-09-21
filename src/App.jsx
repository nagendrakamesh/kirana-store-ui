import {Route, Routes} from "react-router-dom";
import NavBar from "./Components/NavBar";
import LoginPage from "./Components/LoginPage";
import RegisterPage from "./Components/RegisterPage";
import InventoryPage from "./Components/Inventory";
import SuppliersPage from "./Components/SuppliersPage";
import CustomersPage from "./Components/CustomersPage";
import Sidebar from "./Components/Sidebar";
import OrdersPage from "./Components/OrdersPage";
import ProfilePage from "./Components/ProfilePage";
import ProductStockPage from "./Components/ProductStock";
import PrivateRoute from "./Services/PrivateRoute";

function App() {

  return (
    <>
      <NavBar/>
      <div className="d-flex">
      {localStorage.getItem("token") ? <Sidebar /> : <></>}
      <div className="flex-grow-1 p-4 bg-light">
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          <Route element={<PrivateRoute />} > 
            <Route path="/inventory" element={<InventoryPage />} />
            <Route path="/suppliers" element={<SuppliersPage />} />
            <Route path="/customers" element={<CustomersPage />} />
            <Route path="/orders" element={<OrdersPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/product-stock" element={<ProductStockPage />} />
          </Route>
          
        </Routes>
      </div>
    </div>
    </>
  )
}

export default App
