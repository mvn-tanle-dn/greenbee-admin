import React, { useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

// Components
import Sidebar from "./components/Sidebar/Sidebar";
import Topbar from "./components/Topbar/Topbar";

// Pages
import Home from "./pages/Home/Home";
import UserList from "./pages/UserList/UserList";
import User from "./pages/User/User";
import NewUser from "./pages/NewUser/NewUser";
import ProductList from "./pages/ProductList/ProductList";
import Product from "./pages/Product/Product";
import NewProduct from "./pages/NewProduct/NewProduct";

// Styles
import "./App.scss";
import Login from "./pages/Login";

function App() {
  const navigate = useNavigate();
  const access_token = localStorage.getItem("access_token");

  useEffect(() => {
    if (!access_token) {
      navigate("/login");
    }
  }, [access_token, navigate]);

  return (
    <>
      {access_token && <Topbar />}
      <div className="container">
        {access_token && <Sidebar />}
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/users" element={<UserList />} />
          <Route path="/user/:userId" element={<User />} />
          <Route path="/newUser" element={<NewUser />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/product/:productId" element={<Product />} />
          <Route path="/newproduct" element={<NewProduct />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
