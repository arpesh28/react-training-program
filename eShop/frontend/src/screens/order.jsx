import React, { useEffect } from "react";
import { connect } from "react-redux";
import { loadAllOrders, deleteOrder, updateOrder } from "store/order";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { Dropdown } from "react-bootstrap";

import Header from "components/header";

function Order({ getOrder, loadAllOrders, deleteOrder, updateOrder }) {
  useEffect(() => {
    loadAllOrders(() => {});
  }, []);

  const handleDelete = (id) => {
    deleteOrder({ oId: id }, (res) => {
      if (res.status == 200) {
        loadAllOrders(() => {});
      }
    });
  };

  const handleUpdate = (e, status, oId) => {
    if (e) e.preventDefault();
    updateOrder({ oId, status }, (res) => {
      if (res.status == 200) {
        loadAllOrders(() => {});
      }
    });
  };

  return (
    <div className="container">
      <Header />
      <h3>All Orders</h3>
      {getOrder.allOrder?.map((item, index) => (
        <div className="wishlist-item my-1 d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center">
            <div className="prod-content mx-5">
              <h5>{item?.allProduct?.length}</h5>
              <span className="tag">{item?.status}</span>
              <br />
              <span>{item?.user?.name}</span>
              <br />
              <span>{item?.user?.email}</span>
              <br />
              <span>{item?.amount}</span>
              <br />
              <span>{item?.address}</span>
              <br />
              <span>{item?.phone}</span>
            </div>
          </div>{" "}
          <div className="d-flex align-items-center">
            <Dropdown>
              <Dropdown.Toggle
                variant="success"
                id="dropdown-basic"
              ></Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item
                  href="#"
                  onClick={(e) => {
                    handleUpdate(e, "Not processed", item?._id);
                  }}
                >
                  Not Processed
                </Dropdown.Item>
                <Dropdown.Item
                  href="#"
                  onClick={(e) => {
                    handleUpdate(e, "Processing", item?._id);
                  }}
                >
                  Processing
                </Dropdown.Item>
                <Dropdown.Item
                  href="#"
                  onClick={(e) => {
                    handleUpdate(e, "Shipped", item?._id);
                  }}
                >
                  Shipped
                </Dropdown.Item>
                <Dropdown.Item
                  href="#"
                  onClick={(e) => {
                    handleUpdate(e, "Delivered", item?._id);
                  }}
                >
                  Delivered
                </Dropdown.Item>
                <Dropdown.Item
                  href="#"
                  onClick={(e) => {
                    handleUpdate(e, "Cancelled", item?._id);
                  }}
                >
                  Cancelled
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
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
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    getOrder: state.order,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadAllOrders: (callback) => dispatch(loadAllOrders(callback)),
    deleteOrder: (data, callback) => dispatch(deleteOrder(data, callback)),
    updateOrder: (data, callback) => dispatch(updateOrder(data, callback)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Order);
