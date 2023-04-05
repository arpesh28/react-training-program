import React, { useEffect, useRef } from "react";
import LoadingBar from "react-top-loading-bar";
import { connect } from "react-redux";

//  Components
import Header from "components/header";
import CategoryGrid from "components/categoryGrid";
import ProductGrid from "components/productGrid";

function HomeScreen({ getProducts }) {
  const loadingRef = useRef(null);

  useEffect(() => {
    if (getProducts.loading) {
      loadingRef.current.continuousStart();
    } else {
      loadingRef.current.complete();
    }
  }, [getProducts.loading]);

  return (
    <div className="container">
      <LoadingBar color="#f11946" height={8} ref={loadingRef} />
      <Header />
      <h3>Categories</h3>
      <CategoryGrid />
      <div className="my-5">
        {!getProducts.loading && <h3>Products</h3>}
        <ProductGrid />
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    getProducts: state.products,
  };
};

export default connect(mapStateToProps, null)(HomeScreen);
