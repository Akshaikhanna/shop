import "./App.css";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./Components/Dashboard";
import Sign from "./Components/Sign";
import Product from "./Components/Product";
import Item from "./Components/Item";
import CartPage from "./Components/CartPage";
import Ordered from "./Components/Ordered";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<Sign />} />
        <Route path="/product" element={<Product />} />
        <Route path="/item" element={<Item />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/order" element={<Ordered />} />
      </Routes>
    </div>
  );
}

export default App;
