import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Alert from "./alert";
import axios from "axios";

import { Dropdown } from "react-bootstrap";

//  Images
import dummyImg from "../include/images/dummy.jpg";

export default function StoryCard({ story, deleteStoryFromState }) {
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
    }).then((response) => {
      console.log("response:", response);
      // setStories(response.data.data);
      setLoadingDelete(false);
      setAlert(false);
      if (response.status === 200) {
        deleteStoryFromState(story.id);
      }
    });
  };

  return (
    <>
      <div className="col-3 story-card-wrapper position-relative">
        <img
          className="w-100 story-card-img"
          src={`${process.env.REACT_APP_IMAGE_URL}${image}`}
          alt=""
        />
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
        <div
          className="story-card hover"
          onClick={(e) => {
            navigate(`/story/${story?.id}`);
          }}
        >
          <h4>{story.attributes?.title}</h4>
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
