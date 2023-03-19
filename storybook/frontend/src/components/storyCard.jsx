import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Alert from "./alert";

//  Images
import dummyImg from "../include/images/dummy.jpg";

export default function StoryCard({ story }) {
  //states
  const [showAlert, setAlert] = useState(false);

  const navigate = useNavigate();
  const image = story.attributes?.image?.data?.attributes?.formats?.small?.url;
  return (
    <>
      <div className="col-3">
        <img
          className="w-100"
          src={`${process.env.REACT_APP_IMAGE_URL}${image}`}
          alt=""
        />
        <div
          className="story-card hover"
          onClick={(e) => {
            navigate(`/story/${story?.id}`);
          }}
        >
          <h4>{story.attributes?.title}</h4>
          <p>{story.attributes?.description}</p>
          <button
            className="btn btn-danger"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setAlert(true);
            }}
          >
            Delete
          </button>
        </div>
      </div>
      <Alert showModal={showAlert} toggleModal={() => setAlert(!showAlert)} />
    </>
  );
}
