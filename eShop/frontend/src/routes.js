import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

//  Screens
import HomeScreen from "./screens/homescreen";
import ProductDetails from "./screens/productDetails";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<HomeScreen />} />
        <Route exact path="/product/:id" element={<ProductDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
