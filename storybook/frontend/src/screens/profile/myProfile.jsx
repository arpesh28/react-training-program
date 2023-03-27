import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

//  Images
import userIcon from "../../include/images/userIcon.jpg";

//  Components
import Header from "../../components/header";
import StoryCard from "../../components/storyCard";

//  Redux
import { useSelector } from "react-redux";

export default function MyProfile() {
  const navigate = useNavigate();
  const myData = useSelector((state) => state.user.userDetails);
  const userLoading = useSelector((state) => state.user.loading);
  // const [myData, setMyData] = useState(
  //   JSON.parse(localStorage.getItem("user"))
  // );
  const [myStories, setMyStories] = useState([]);

  useEffect(() => {
    if (!userLoading) {
      axios({
        method: "get",
        url: `${process.env.REACT_APP_API_URL}stories?populate=*&filters[author]=${myData?.id}`,
        headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` },
      }).then((response) => {
        setMyStories(response.data.data);
      });
    }
  }, [userLoading]);

  const deleteStoryFromState = (id) => {
    const newStories = structuredClone(myStories);
    let deleteInd = "";
    newStories.forEach((item, index) => {
      if (item.id === id) deleteInd = index;
    });
    newStories.splice(deleteInd, 1);
    setMyStories(newStories);
  };

  return (
    <div className="container py-4">
      <Header page="My Profile" />
      <div className="user-details d-flex mt-5">
        <img
          src={
            myData?.profilePicture
              ? process.env.REACT_APP_IMAGE_URL +
                myData.profilePicture?.formats?.medium?.url
              : userIcon
          }
          alt=""
          className="mx-4"
        />
        <div>
          <h4>{myData?.username}</h4>
          <h4>{myData?.email}</h4>
          <button
            className="btn btn-primary"
            onClick={() => {
              navigate("/edit-profile");
            }}
          >
            Edit Profile
          </button>
        </div>
      </div>
      <div className="user-stories mt-5">
        <h4>My Stories</h4>
        <div className="row mt-2 gy-5">
          {myStories.length > 0 ? (
            myStories.map((story, index) => (
              <StoryCard
                story={story}
                key={story.id}
                deleteStoryFromState={deleteStoryFromState}
              />
            ))
          ) : (
            <h2 className="d-flex align-items-center justify-content-center">
              No stories
            </h2>
          )}
        </div>
      </div>
    </div>
  );
}
