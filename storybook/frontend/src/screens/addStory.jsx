import React, { useEffect, useState } from "react";
import axios from "axios";
import Select from "react-select";

import { useNavigate, useLocation } from "react-router-dom";

//  Components

export default function AddStory() {
  const navigate = useNavigate();
  const { state } = useLocation();

  // States
  const [data, setData] = useState({
    title: "",
    description: "",
    image: null,
    category: [],
  });
  const [allCategories, setAllCategories] = useState([]);
  const [loadingImage, setLoadingImage] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (state) {
      const storyDetails = state.story?.attributes;
      const newData = structuredClone(data);
      newData.title = storyDetails.title;
      newData.description = storyDetails.description;
      newData.image = {
        ...storyDetails.image?.data?.attributes,
        id: storyDetails.image?.data?.id,
      };
      setData(newData);
    }
    axios({
      method: "get",
      url: `${process.env.REACT_APP_API_URL}categories`,
    }).then((response) => {
      setAllCategories(response.data.data);
    });
  }, []);

  const uploadImage = (e) => {
    setLoadingImage(true);
    const formData = new FormData();
    formData.append("files", e.target.files[0]);
    axios({
      method: "post",
      url: `${process.env.REACT_APP_API_URL}upload`,
      data: formData,
      headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` },
    }).then((response) => {
      const newData = structuredClone(data);
      const newErrors = structuredClone(errors);
      newData.image = response.data[0];
      delete newErrors.image;
      setErrors(newErrors);
      setData(newData);
      setLoadingImage(false);
    });
  };

  const onChange = (e) => {
    const newData = structuredClone(data);
    const newErrors = structuredClone(errors);
    newData[e.target.name] = e.target.value;
    delete newErrors[e.target.name];
    setData(newData);
    setErrors(newErrors);
  };

  const handleSubmit = (e) => {
    if (e) e.preventDefault();
    let newErrors = structuredClone(errors);
    if (!data.title) newErrors.title = "Title is required.";
    else if (data.title.length < 4)
      newErrors.title = "Title must be of length 3";
    if (!data.description) newErrors.description = "Description is required.";
    if (!data.image) newErrors.image = "Image is required.";
    if (data.category.length == 0) newErrors.category = "Category is required";

    if (
      !newErrors.image &&
      !newErrors.title &&
      !newErrors.description &&
      !newErrors.category
    ) {
      const payLoad = {
        data: {
          title: data.title,
          description: data.description,
          image: data.image.id,
          categories: data.category.map((cat) => cat.value),
        },
      };
      if (state) {
        axios({
          method: "put",
          url: `${process.env.REACT_APP_API_URL}stories/${state?.story?.id}`,
          headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` },
          data: payLoad,
        }).then((response) => {
          navigate("/");
        });
      } else {
        axios({
          method: "post",
          url: `${process.env.REACT_APP_API_URL}stories`,
          data: payLoad,
          headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` },
        }).then((response) => {
          navigate("/");
        });
      }
    } else {
      return setErrors(newErrors);
    }
  };
  if (!localStorage.getItem("jwt")) {
    window.location.href = "/login";
    return null;
  }
  return (
    <div className="container my-4">
      <div className="d-flex justify-content-between">
        <h2>{state ? "Edit" : "Add"} Stories</h2>
      </div>
      <div className=" mt-5">
        <div className="form-group my-3">
          <label htmlFor="">Title</label>
          <br />
          <input
            type="text"
            placeholder="Add a title here"
            name="title"
            onChange={onChange}
            className="w-100"
            value={data.title}
          />
          {errors?.title && <div className="error">{errors.title}</div>}
        </div>
        <div className="form-group my-3">
          <label htmlFor="">Description</label>
          <br />
          <textarea
            placeholder="Type your story here"
            name="description"
            onChange={onChange}
            className="w-100"
            style={{ height: 300 }}
            value={data.description}
          />
          {errors?.description && (
            <div className="error">{errors.description}</div>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="">Category</label>
          <br />
          <Select
            isMulti
            name="colors"
            options={allCategories.map((cat) => ({
              value: cat.id,
              label: cat.attributes.name,
            }))}
            className="basic-multi-select"
            classNamePrefix="select"
            onChange={(e) => {
              setData({ ...data, category: e });
              const newErrors = structuredClone(errors);
              delete newErrors.category;
              setErrors(newErrors);
            }}
          />
          {errors?.category && <div className="error">{errors.category}</div>}
        </div>
        <div className="form-group my-3">
          <label htmlFor="">Image</label>
          <br />
          <input type="file" onChange={uploadImage} />
        </div>
        {errors?.image && <div className="error">{errors.image}</div>}
        {(data.image || loadingImage) && (
          <div className="image-preview">
            {loadingImage ? (
              <p>Loading...</p>
            ) : (
              <img
                src={
                  process.env.REACT_APP_IMAGE_URL +
                  data.image?.formats?.thumbnail?.url
                }
                alt=""
              />
            )}
          </div>
        )}
      </div>
      <button
        className="btn btn-primary mt-2"
        onClick={handleSubmit}
        disabled={loadingImage}
      >
        {state ? "Edit" : "Add"} Story
      </button>
    </div>
  );
}
