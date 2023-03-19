import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useParams } from "react-router-dom";

//  Images
import dummyImage from "../include/images/dummy.jpg";

//  Components
import StoryCard from "../components/storyCard";

export default function StoryDetails() {
  const { id } = useParams();
  // States
  const [storyDetails, setDetails] = useState(null);

  // UseEffect
  useEffect(() => {
    axios({
      method: "get",
      url: `${process.env.REACT_APP_API_URL}stories/${id}?populate=*`,
    }).then((response) => {
      setDetails(response.data.data);
    });
  }, []);
  const image =
    storyDetails?.attributes?.image?.data?.attributes?.formats?.small?.url;

  return (
    <div className="container my-4">
      <div className="d-flex justify-content-between">
        <h2>{storyDetails?.attributes?.title} </h2>
      </div>
      <img src={`${process.env.REACT_APP_IMAGE_URL}${image}`} alt="" />
      <p>{storyDetails?.attributes?.description}</p>
    </div>
  );
}
