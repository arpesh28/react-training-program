import React from "react";

//  Components
import Header from "../components/header";
import CategoryGrid from "../components/categoryGrid";
import ProductGrid from "../components/productGrid";

function HomeScreen() {
  return (
    <div className="container">
      <Header />
      <h3>Categories</h3>
      <CategoryGrid />
      <div className="my-5">
        <h3>Products</h3>
        <ProductGrid />
      </div>
    </div>
  );
}

export default HomeScreen;
