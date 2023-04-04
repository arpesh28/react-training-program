import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

//  Screens
import HomeScreen from "./screens/homescreen";
import ProductDetails from "./screens/productDetails";

//  User Routes
import UserDetails from "./screens/admin/user/userDetails";

//  Category Routes
import CategoryListing from "./screens/admin/categories/categories";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<HomeScreen />} />
        <Route exact path="/product/:id" element={<ProductDetails />} />

        {/* User Routes */}
        <Route exact path="/user-details" element={<UserDetails />} />

        {/* Category Routes */}
        <Route exact path="/categories" element={<CategoryListing />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
