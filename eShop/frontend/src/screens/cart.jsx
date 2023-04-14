import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import { loadMyCart, deleteCartProduct } from "store/misc";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import DropIn from "braintree-web-drop-in-react";
import "braintree-web";
import { loadToken, brainTreePayment, createOrder } from "store/order";
import { Form, Button } from "react-bootstrap";

//  Components
import Header from "components/header";

function Cart({
  getMisc,
  loadMyCart,
  deleteCartProduct,
  getOrder,
  loadToken,
  brainTreePayment,
  createOrder,
}) {
  const instanceRef = useRef(null);
  const navigate = useNavigate();

  const [data, setData] = useState({
    address: "",
    phone: "",
  });

  useEffect(() => {
    loadMyCart(
      { uId: JSON.parse(localStorage.getItem("user"))._id },
      (res) => {}
    );
    loadToken();
  }, []);
  const handleDelete = (cId) => {
    deleteCartProduct({ cId }, (res) => {
      if (res.status == 200) {
        loadMyCart(
          { uId: JSON.parse(localStorage.getItem("user"))._id },
          (res) => {}
        );
      }
    });
  };

  const onChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleBuy = async () => {
    try {
      const { nonce } = await instanceRef.current?.requestPaymentMethod();
      var totalAmount = 0;
      getMisc.cart.forEach((prod) => {
        totalAmount += prod.product.pPrice * prod.pQuantity;
      });
      const payMentPayload = {
        amountTotal: totalAmount,
        paymentMethod: nonce,
      };
      brainTreePayment(payMentPayload, (res) => {
        if (res.status === 200) {
          const orderPayload = {
            allProduct: getMisc.cart.map((prod) => ({
              id: prod.product._id,
              quantitiy: prod.pQuantity,
              price: prod.product.pPrice,
            })),
            user: JSON.parse(localStorage.getItem("user"))._id,
            amount: `${totalAmount}`,
            transactionId: res.data.transaction.id,
            address: data.address,
            phone: data.phone,
          };
          createOrder(orderPayload, (res) => {
            if (res.status === 200) {
              navigate("/orders");
            }
          });
        }
      });
    } catch (err) {}
  };
  return (
    <div className="container">
      <Header />
      <h3>My Cart</h3>
      {getMisc.cart?.map((item, index) => (
        <div className="wishlist-item my-1 d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center">
            <img
              className="prod-image"
              src={
                process.env.REACT_APP_IMAGE_URL +
                "products/" +
                item?.product?.pImages[0]
              }
              alt=""
            />
            <div className="prod-content mx-5">
              <h5>{item?.product?.pName}</h5>
              <span>${item?.product?.pPrice}</span>
              <br />
              <span>{item?.pQuantity}</span>
            </div>
          </div>{" "}
          <div>
            <FontAwesomeIcon
              className="hover mx-5"
              icon={faTrash}
              onClick={(e) => {
                handleDelete(item._id);
              }}
            />{" "}
          </div>
        </div>
      ))}
      <div className="my-5">
        <h4>Payment</h4>
        <div className="row">
          <div className="col-6">
            <Form>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Address</Form.Label>
                <Form.Control
                  name="address"
                  type="text"
                  placeholder="Enter your address"
                  onChange={onChange}
                  value={data.address}
                />
              </Form.Group>{" "}
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Mobile Number</Form.Label>
                <Form.Control
                  name="phone"
                  type="text"
                  placeholder="Enter your mobile number"
                  onChange={onChange}
                  value={data.phone}
                />
              </Form.Group>
            </Form>
          </div>
          <div className="col-6">
            {getOrder?.clientToken && (
              <DropIn
                options={{ authorization: getOrder?.clientToken }}
                onInstance={(ins) => (instanceRef.current = ins)}
              />
            )}
          </div>
        </div>{" "}
        <div className="row w-100">
          <Button variant="primary" type="submit" onClick={handleBuy}>
            Submit
          </Button>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    getMisc: state.misc,
    getOrder: state.order,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    loadMyCart: (params, callback) => dispatch(loadMyCart(params, callback)),
    deleteCartProduct: (data, callback) =>
      dispatch(deleteCartProduct(data, callback)),
    loadToken: () => dispatch(loadToken()),
    brainTreePayment: (data, callback) =>
      dispatch(brainTreePayment(data, callback)),
    createOrder: (data, callback) => dispatch(createOrder(data, callback)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
