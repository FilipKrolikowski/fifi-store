import React from "react";
import "./App.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Interface/Navbar";
import MainPage from "./components/views/HomePage/MainPage";
import Footer from "./components/Interface/Footer";
import ProductPage from "./components/views/ProductPage/ProductPage";
import Category from "./components/views/CategoryPage/Category";
import Login from "./components/Interface/Login";
import StoreAppContext from "./app-context";
import Cart from "./components/views/Cart/Cart";

function App() {
  return (
    <StoreAppContext>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<MainPage />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/cart" element={<Cart />}></Route>
          <Route path="/product/:id" element={<ProductPage />}></Route>
          <Route path="/category/:categoryId" element={<Category />}></Route>
        </Routes>
        <Footer />
      </BrowserRouter>
    </StoreAppContext>
  );
}

export default App;
