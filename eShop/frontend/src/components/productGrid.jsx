import React, { useEffect } from "react";

//  Components
import ProductCard from "./productCard";

//  Redux
import { loadProducts } from "store/products";
import { connect } from "react-redux";

function ProductGrid({ getProducts, loadProducts }) {
  useEffect(() => {
    loadProducts(() => {});
  }, []);
  return (
    <div className="row gx-5 gy-5">
      {getProducts.productList.map((prod, index) => (
        <div className="col-3">
          <ProductCard key={prod._ic} product={prod} />
        </div>
      ))}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    getProducts: state.products,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadProducts: (callback) => dispatch(loadProducts(callback)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductGrid);
