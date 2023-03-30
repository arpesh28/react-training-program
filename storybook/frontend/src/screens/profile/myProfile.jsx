import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

//  Images
import userIcon from "../../include/images/userIcon.jpg";

//  Components
import Header from "../../components/header";
import StoryCard from "../../components/storyCard";

//  Redux
import { useSelector, connect } from "react-redux";
import { loadStories } from "../../store/stories";

function MyProfile({ showUser, loadStories, showStories }) {
  const navigate = useNavigate();
  const { userDetails, loading } = showUser;
  const { storyList } = showStories;

  const [myStories, setMyStories] = useState([]);

  useEffect(() => {
    if (!loading) {
      const params = {
        populate: "*",
        "filters[author]": userDetails?.id,
      };
      loadStories(params, () => {});
    }
  }, [loading]);

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
            userDetails?.profilePicture
              ? process.env.REACT_APP_IMAGE_URL +
                userDetails.profilePicture?.formats?.medium?.url
              : userIcon
          }
          alt=""
          className="mx-4"
        />
        <div>
          <h4>{userDetails?.username}</h4>
          <h4>{userDetails?.email}</h4>
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
          {storyList.length > 0 ? (
            storyList.map((story, index) => (
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

const mapStateToProps = (state) => {
  return {
    showUser: state.user,
    showStories: state.stories,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadStories: (params, callback) => dispatch(loadStories(params, callback)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MyProfile);
