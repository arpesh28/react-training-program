import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import LoadingBar from "react-top-loading-bar";

//  Components
import StoryCard from "../../components/storyCard";
import Header from "../../components/header";

//  Redux
import { useDispatch, useSelector } from "react-redux";
import { getStories, deleteStory } from "../../store/stories";

export default function StoryLists() {
  const dispatch = useDispatch();
  const ref = useRef(null);
  // States
  // const [stories, setStories] = useState([]);
  const stories = useSelector((state) => state.stories.storyList) ?? [];
  const [loading, setLoading] = useState(true);
  const [allCategories, setAllCategories] = useState([]);
  const [allAuthors, setAllAuthors] = useState([]);
  const [filters, setFilters] = useState(null);

  // UseEffect
  useEffect(() => {
    setLoading(true);
    getAllStories();
    axios({
      method: "get",
      url: `${process.env.REACT_APP_API_URL}categories`,
    }).then((response) => {
      setAllCategories(response.data.data);
    });
    axios({
      method: "get",
      url: `${process.env.REACT_APP_API_URL}users?populate=*`,
    }).then((response) => {
      setAllAuthors(response.data);
    });
  }, []);

  const getAllStories = () => {
    ref.current.continuousStart();
    const params = {
      populate: "*",
    };
    if (filters?.category)
      params["filters[categories]"] = filters.category.value;
    if (filters?.author) params["filters[author]"] = filters.author.value;
    axios({
      method: "get",
      url: `${process.env.REACT_APP_API_URL}stories?`,
      params,
    })
      .then((response) => {
        dispatch(getStories(response.data.data));
        // setStories(response.data.data);
        setLoading(false);
        ref.current.complete();
      })
      .catch((err) => {
        setLoading(false);
        ref.current.complete();
      });
  };

  const deleteStoryFromState = (id) => {
    dispatch(deleteStory(id));
  };
  return (
    <div className="container my-4">
      <LoadingBar height={5} color="#f11946" ref={ref} />
      <Header page="Stories" />
      <div className="row mt-5 gy-5">
        <div className="filter-container">
          <h4>Filters</h4>
          <div className="form-group">
            <label htmlFor="">Category</label>
            <br />
            <Select
              name="category"
              options={allCategories.map((cat) => ({
                value: cat.id,
                label: cat.attributes.name,
              }))}
              className="basic-multi-select"
              classNamePrefix="select"
              onChange={(e) => {
                setFilters({ ...filters, category: e });
              }}
              value={filters?.category}
            />
          </div>{" "}
          <div className="form-group mt-3">
            <label htmlFor="">Authors</label>
            <br />
            <Select
              name="author"
              options={allAuthors.map((singleAuthor, index) => ({
                value: singleAuthor.id,
                label: singleAuthor.username,
              }))}
              className="basic-multi-select"
              classNamePrefix="select"
              onChange={(e) => {
                setFilters({ ...filters, author: e });
              }}
              value={filters?.author}
            />
          </div>
          <div>
            <button className="btn btn-primary mt-2" onClick={getAllStories}>
              Search
            </button>{" "}
            <button
              className="btn btn-link mt-2"
              onClick={() => {
                setFilters(null);
                setTimeout(() => {
                  getAllStories();
                }, 1000);
              }}
            >
              Reset
            </button>
          </div>
        </div>
        {stories?.length === 0 ? (
          <div className="empty-data">
            {loading ? "Loading..." : "No results found"}
          </div>
        ) : (
          stories.map((story, index) => (
            <StoryCard
              story={story}
              key={story.id}
              deleteStoryFromState={deleteStoryFromState}
            />
          ))
        )}
      </div>
    </div>
  );
}
