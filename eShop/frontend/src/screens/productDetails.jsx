import React, { useRef, useEffect, useState } from "react";
import LoadingBar from "react-top-loading-bar";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";
import { loadSingleProduct } from "store/products";
import Slider from "react-slick";
import { Form, Button } from "react-bootstrap";
import { addReview, deleteReview } from "store/misc";

//  Components
import Header from "components/header";

function ProductDetails({
  getProducts,
  loadSingleProduct,
  addReview,
  deleteReview,
}) {
  const { id } = useParams();
  const loadingRef = useRef(null);

  //  States
  const [data, setData] = useState({
    rating: "",
    review: "",
  });

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
    getProductDetails();
  }, []);
  const getProductDetails = () => {
    const data = {
      pId: id,
    };
    loadSingleProduct(data, () => {});
  };
  const onChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
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
      <div className="row my-5">
        <h2>Reviews</h2>
        <div className="review-container">
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Control
                type="text"
                name="review"
                as="textarea"
                placeholder="Write a review"
                onChange={onChange}
                value={data.review}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Control
                type="number"
                name="rating"
                placeholder="Rating"
                onChange={onChange}
                value={data.rating}
              />
            </Form.Group>
            <Button
              variant="primary"
              type="submit"
              onClick={(e) => {
                e.preventDefault();
                const payLoad = {
                  rating: data.rating,
                  review: data.review,
                  uId: JSON.parse(localStorage.getItem("user"))._id,
                  pId: product?._id,
                };
                addReview(payLoad, (res) => {
                  if (res.status === 200) {
                    getProductDetails();
                    setData({ rating: "", review: "" });
                  }
                });
              }}
            >
              Submit
            </Button>
          </Form>
          {product?.pRatingsReviews?.map((item, index) => (
            <div className="review-item my-3" key={item._id}>
              <p>{item?.review}</p>
              <span>Rating: {item?.rating}</span>
              <div className="user-rating">
                <span>{item?.user?.name}</span>
              </div>
              <Button
                variant="primary"
                onClick={(e) => {
                  e.preventDefault();
                  deleteReview({ rId: item?._id, pId: product?._id }, (res) => {
                    if (res.status === 200) {
                      getProductDetails();
                    }
                  });
                }}
              >
                Delete
              </Button>
            </div>
          ))}
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
    addReview: (data, callback) => dispatch(addReview(data, callback)),
    deleteReview: (data, callback) => dispatch(deleteReview(data, callback)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetails);
