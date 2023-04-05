import React, { useRef, useEffect } from "react";
import LoadingBar from "react-top-loading-bar";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";
import { loadSingleProduct } from "store/products";
import Slider from "react-slick";

//  Components
import Header from "components/header";

function ProductDetails({ getProducts, loadSingleProduct }) {
  const { id } = useParams();
  const loadingRef = useRef(null);

  const settings = {
    dots: true,
    arrows: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  useEffect(() => {
    if (getProducts.loading) {
      loadingRef.current.continuousStart();
    } else {
      loadingRef.current.complete();
    }
  }, [getProducts.loading]);
  useEffect(() => {
    const data = {
      pId: id,
    };
    loadSingleProduct(data, () => {});
  }, []);
  const product = getProducts.productDetails;
  return (
    <div className="container">
      <LoadingBar color="#f11946" height={8} ref={loadingRef} />
      <Header />
      <div className="row my-5">
        <div className="col-6">
          <Slider {...settings}>
            {product?.pImages?.map((image, index) => (
              <img
                key={index}
                src={process.env.REACT_APP_IMAGE_URL + "products/" + image}
                alt="image"
              />
            ))}
          </Slider>
        </div>
        <div className="col-6">
          <h3>{product?.pName}</h3>
          <span className="prod-cat">{product?.pCategory?.cName}</span>
          <p className="mt-2">{product?.pDescription}</p>
          <p>
            Sold : {product?.pSold}/{product?.pQuantity}
          </p>
          <h4>
            Price: ${product?.pPrice} <span>({product?.pOffer}%)</span>
          </h4>
        </div>
      </div>
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
    loadSingleProduct: (data, callback) =>
      dispatch(loadSingleProduct(data, callback)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetails);
