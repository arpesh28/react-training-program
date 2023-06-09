import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Alert from "./alert";
import axios from "axios";
import { toast } from "react-toastify";

import { Dropdown } from "react-bootstrap";

//  Redux
import { useSelector } from "react-redux";

//  Images
import dummyImg from "../include/images/dummy.jpg";

export default function StoryCard({ story, deleteStoryFromState }) {
  const userDetails = useSelector((state) => state.user.userDetails);
  //states
  const [showAlert, setAlert] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);

  const navigate = useNavigate();
  const image = story.attributes?.image?.data?.attributes?.formats?.small?.url;

  const handleDelete = (e) => {
    setLoadingDelete(true);
    axios({
      method: "delete",
      url: `${process.env.REACT_APP_API_URL}stories/${story?.id}`,
      headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` },
    })
      .then((response) => {
        setLoadingDelete(false);
        setAlert(false);
        if (response.status === 200) {
          deleteStoryFromState(story.id);
        }
      })
      .catch((err) => {
        toast.error(err.response?.data?.error?.message);
        setAlert(false);
        setLoadingDelete(false);
      });
  };
  const author = story?.attributes?.author?.data;
  return (
    <>
      <div className="col-3 story-card-wrapper position-relative">
        <img
          className="w-100 story-card-img"
          src={`${process.env.REACT_APP_IMAGE_URL}${image}`}
          alt=""
        />
        {localStorage.getItem("jwt") && author?.id == userDetails?.id && (
          <Dropdown className="position-absolute custom-dropdown">
            <Dropdown.Toggle
              variant="primary"
              id="dropdown-basic"
            ></Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item
                href="#/action-1"
                onClick={(e) => {
                  e.preventDefault();
                  navigate("/add-story", { state: { story } });
                }}
              >
                Edit
              </Dropdown.Item>{" "}
              <Dropdown.Item
                href="#/action-1"
                style={{ color: "red" }}
                onClick={(e) => {
                  e.preventDefault();
                  setAlert(true);
                }}
              >
                Delete
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        )}
        <div
          className="story-card hover"
          onClick={(e) => {
            navigate(`/story/${story?.id}`);
          }}
        >
          <div className="author">
            <span>By {author?.attributes?.username}</span>
          </div>
          <h4>{story.attributes?.title}</h4>
          <div className="categories mb-3">
            {story.attributes?.categories?.data?.map((cat) => (
              <span>{cat.attributes?.name}</span>
            ))}
          </div>
          <p className="ellipsis-7">{story.attributes?.description}</p>
        </div>
      </div>
      <Alert
        showModal={showAlert}
        toggleModal={() => setAlert(!showAlert)}
        handleDelete={handleDelete}
        loading={loadingDelete}
      />
    </>
  );
}
